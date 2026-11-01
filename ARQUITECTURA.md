# Arquitectura A360 (v1)

Decisión del dueño (31/10/2026). Este documento manda sobre cómo se construye; las historias de ItsAPlan mandan sobre el comportamiento; el prototipo ([PANTALLAS.md](PANTALLAS.md)) manda sobre lo visual.

## 1. Stack
| Pieza | Rol | Decisión |
|---|---|---|
| Supabase (nube) | Postgres + RLS, Auth, Storage, Edge Functions (Deno/TS), Realtime | Núcleo. Toda la lógica de negocio vive en Postgres (tablas, vistas, RPC) y Edge Functions. |
| pg_cron + pgmq | Tareas programadas, colas y ejecuciones diferidas | Reemplazan a Kestra en la v1. Kestra solo si aparecen flujos largos de varios pasos. |
| React + Refine | Front (listas, formularios, filtros con el proveedor de datos de Supabase) | Pantallas especiales (estudio de propuestas, kanban, diagnósticos, asistente) como componentes propios. |
| Nango (nube) | OAuth y sincronización de Google y Microsoft (mail, calendario) | Solo eso. WhatsApp Cloud API se integra directo. |
| Capa de IA propia | Llamadas a modelos, costo, tope, aprobación | Multi-proveedor; modelo configurable por agente y tarea (ver §6). |
| Transcripción | API externa con buen español rioplatense | Sin infraestructura propia. |
| Superset | Analítica avanzada | Solo v2. En la v1, vistas SQL y gráficos en la app. |

Lenguaje único: TypeScript (front, Edge Functions, núcleos puros) + SQL. Sin servidores propios que operar en la v1.

## 2. Multiorganización
- Esquema compartido; **toda tabla de dominio** lleva `org_id uuid not null` + índice compuesto que empieza por `org_id`.
- Membresía: `org_miembro(org_id, user_id, rol)` con roles v1: dueño/administrador, colaborador, solo lectura, cliente (portal, v2).
- RLS en todas las tablas: `using (org_id in (select org_id from org_miembro where user_id = auth.uid()))`, más políticas por rol para escritura. Funciones `security definer` solo en RPC revisadas.
- Organización activa en el JWT (claim `org_id`) para no consultar la membresía en cada fila; selector de organización visible solo con más de una.
- Pruebas de RLS por tabla obligatorias (F-NFR-04): una organización nunca ve ni escribe datos de otra.

## 3. Módulos y límites
Cada módulo en `modules/<módulo>/` con: `core/` (funciones puras con tests, sin base ni UI), `db/` (migraciones, vistas, RPC), `api/` (Edge Functions), `ui/`. Un módulo no importa a otro: lo cruzado pasa por eventos (§5) o por un único `conexiones.ts` (patrón obligatorio en Diagnósticos, recomendado en todos).

Módulos: plataforma, personas (empresas, personas, Mi red, prospectos, clientes), diagnosticos (`diag_*`), propuestas, reuniones, mensajes, trabajo, finanzas, asistente, ia, suscripcion, legal.

## 4. Modelo de datos (núcleo)
- **Plataforma**: `org`, `org_miembro`, `org_config` (moneda, marca, parámetros con vigencia), `campo_def` (campos personalizados, valores en `jsonb` de cada entidad), `vista` + `vista_filtro` (F-PLA-32), `actividad` (historial común con diff jsonb, actor usuario/agente/regla; F-PLA-33), `auditoria`.
- **Personas**: `empresa`, `persona`, `persona_canal` (persona + canal + `source_id`; F-MSJ-14), `consentimiento` (F-CTA-13), `relacion` (Mi red / prospecto / cliente con historial), `pipeline`, `etapa`, `oportunidad`; teléfonos en E.164 (F-CTA-14).
- **Vínculos múltiples**: `tarea`, `nota` + tablas puente `*_vinculo(entidad_tipo, entidad_id)`.
- **Mensajes**: `conversacion`, `mensaje` (estado `pendiente_aprobacion → enviado → entregado → leído | fallido`, `source_id` único por org y canal), `plantilla_wa` (caché), `respuesta_guardada`; mail: `mail_hilo`, `mail_mensaje`, `mail_participante` (F-INT-13).
- **Propuestas**: `propuesta`, `propuesta_version`, `plantilla_propuesta`, `contrato`.
- **Diagnósticos**: `diag_tipo`, `diag_pregunta`, `diag`, `diag_sesion`, `diag_respuesta`, `diag_hallazgo` con referencias genéricas (tipo + id).
- **Reuniones**: `reunion`, `transcripcion`, `resumen`, `compromiso`.
- **Trabajo y finanzas**: `trabajo`, `hora`, `abono`, `factura` (ARCA/CAE), `cobro`, `costo`, `cuenta_pagar`, `parametro_fiscal` (con vigencia).
- **Asistente**: `recordatorio`, `mensaje_automatico`, `pedido_asistente`.
- **IA**: `regla` (motor único JSON; F-IA-16), `regla_pendiente`, `agente`, `ejecucion`, `ejecucion_item`, `ia_consumo` (tokens y costo por paso; F-IA-18), `conocimiento` (pgvector).
- **Suscripción y legal**: `plan`, `suscripcion`, `pago_suscripcion`, `aceptacion_terminos`, `pedido_titular`, `retencion_politica`.

Convenciones: `id uuid`, `created_at/updated_at`, borrado lógico `deleted_at` con papelera de 30 días, montos en `numeric(14,2)` + `moneda`, fechas en UTC y zona de la org para mostrar.

## 5. Eventos, colas y tareas
- Disparadores de Postgres publican eventos en `pgmq` (`evento(org_id, tipo, entidad, id, payload)`), consumidos por Edge Functions.
- Reglas (F-IA-16) evalúan eventos; las acciones diferidas van a `regla_pendiente` y las ejecuta pg_cron.
- Webhooks entrantes (WhatsApp, pagos) idempotentes por `source_id` (F-MSJ-15); salientes firmados con HMAC (F-PLA-34, v2).
- Trabajos programados: sincronizar plantillas de WhatsApp, recordatorios, resúmenes diarios, vencimientos fiscales, agentes programados.

## 6. IA gobernada
- Toda llamada pasa por la capa `ia` (Edge Function): elige modelo por agente y tarea, estima costo, verifica el tope de la org (aviso 80 %, bloqueo de IA a pedido al 100 %; las reglas siguen), registra `ia_consumo`.
- Niveles de modelo: chico (clasificar, extraer, rutear), medio (borradores, resúmenes, asistente), punta (propuestas, generar diagnósticos, informes; siempre a pedido). Tarifas en tabla, no en código. Evaluación con casos reales en español antes de fijar proveedor.
- 7 agentes; herramientas a pedido con permisos por rol de agente (F-IA-19). Ninguna acción con efecto externo se ejecuta sin aprobación: el agente propone y la ejecución queda en `esperando_aprobacion` (F-IA-17). Contenido externo se trata como no confiable (F-IA-10).
- Proveedores con no entrenamiento sobre datos de clientes; listados como subprocesadores (F-LEG-02).

## 7. Integraciones
- WhatsApp Cloud API directo: ventana por proveedor, plantillas, consentimiento obligatorio, estados de entrega.
- Google/Microsoft vía Nango (OAuth + fetch); calendario y mail.
- ARCA (factura electrónica) desde Edge Function con certificado de la org guardado cifrado (Vault de Supabase).
- Cobro de la suscripción: proveedor a definir (F-SUS-03).

## 8. Seguridad
- Secretos en Supabase Vault; nunca en el front ni en exportaciones.
- Storage con políticas por `org_id` en la ruta; enlaces firmados con vencimiento.
- Auditoría de acciones sensibles; límites de uso por org e IP (F-NFR-03).
- Código de terceros solo MIT con aviso y guardia de licencias en CI (F-PLA-35).

## 9. Calidad y operación
- Requisitos no funcionales: F-NFR-01 (rendimiento y disponibilidad), F-NFR-02 (RPO ≤ 1 h, RTO ≤ 4 h), F-NFR-03 (observabilidad), F-NFR-04 (pruebas).
- Entornos: local (Supabase CLI), staging y producción; migraciones versionadas; CI: lint, tipos, unit, RLS, E2E de flujos v1.
- Desarrollo: spec-driven (Spec Kit) por historia, una rama/worktree por historia; el PR cita historia y pantalla.

## 10. Abierto
- Proveedor de cobro de la suscripción (Mercado Pago / Stripe).
- Proveedor de transcripción y modelos por nivel (tras la evaluación).
- Momento de sumar Kestra y Superset.
