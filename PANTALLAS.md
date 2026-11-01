# Mapa de pantallas del prototipo (código)

Cada historia y épica de ItsAPlan (proyecto A360) cita una pantalla por su **código** y su **ruta de navegación**. El prototipo es código: [`prototipo/Main.dc.html`](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html) (un solo archivo con todas las pantallas; cada pantalla es un bloque `<sc-if value="{{ isXxx }}">`) más `prototipo/support.js`.

Para verlo corriendo: abrí `prototipo/Main.dc.html` en el navegador (junto a `support.js`) e ingresá con cualquier correo y contraseña.

| Código | Ruta en el prototipo | Bloque en el código | Líneas |
|---|---|---|---|
| `01-hoy` | Hoy | `isHoy` (Hoy) | [L140-L305](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L140-L305) |
| `02-mi-asistente-agenda` | Mi asistente › Agenda | `isMiasis` (Mi asistente) | [L3689-L3874](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L3689-L3874) |
| `02-mi-asistente-tareas` | Mi asistente › Tareas | `isMiasis` (Mi asistente) | [L3689-L3874](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L3689-L3874) |
| `02-mi-asistente-recordatorios` | Mi asistente › Recordatorios | `isMiasis` (Mi asistente) | [L3689-L3874](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L3689-L3874) |
| `02-mi-asistente-mensajes-automaticos` | Mi asistente › Mensajes automáticos | `isMiasis` (Mi asistente) | [L3689-L3874](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L3689-L3874) |
| `02-mi-asistente-ajustes` | Mi asistente › Ajustes | `isMiasis` (Mi asistente) | [L3689-L3874](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L3689-L3874) |
| `03-personas-todas` | Personas › Todas | `isClientes` (Personas (listas y mapa)) · `isCliente` (Ficha 360) | [L306-L709](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L306-L709) · [L1240-L1583](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L1240-L1583) |
| `03-personas-mi-red` | Personas › Mi red | `isClientes` (Personas (listas y mapa)) · `isCliente` (Ficha 360) | [L306-L709](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L306-L709) · [L1240-L1583](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L1240-L1583) |
| `03-personas-prospectos` | Personas › Prospectos | `isClientes` (Personas (listas y mapa)) · `isCliente` (Ficha 360) | [L306-L709](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L306-L709) · [L1240-L1583](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L1240-L1583) |
| `03-personas-clientes` | Personas › Clientes | `isClientes` (Personas (listas y mapa)) · `isCliente` (Ficha 360) | [L306-L709](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L306-L709) · [L1240-L1583](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L1240-L1583) |
| `03-personas-mapa-red` | Personas › Mapa de la red | `isClientes` (Personas (listas y mapa)) · `isCliente` (Ficha 360) | [L306-L709](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L306-L709) · [L1240-L1583](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L1240-L1583) |
| `04-diagnosticos` | Diagnósticos | `isDiag` (Diagnósticos) | [L3476-L3688](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L3476-L3688) |
| `05-propuestas` | Propuestas | `cliPropuestas` (Lista de propuestas) · `isPropEd` (Editor de propuesta) | [L447-L558](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L447-L558) · [L1584-L1911](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L1584-L1911) |
| `06-reuniones` | Reuniones › Reuniones | `isReuniones` (Reuniones) | [L710-L899](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L710-L899) |
| `06-reuniones-insights` | Reuniones › Insights generales | `isReuniones` (Reuniones) | [L710-L899](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L710-L899) |
| `07-mensajes` | Mensajes | `isMensajes` (Mensajes) | [L3388-L3475](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L3388-L3475) |
| `08-trabajo` | Trabajo | `isProyectos` (Trabajo) · `isTrDetalle` (Detalle de trabajo) | [L900-L1076](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L900-L1076) · [L1077-L1239](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L1077-L1239) |
| `09-finanzas-cobros-facturas` | Finanzas › Cobros y facturas | `isFinanzas` (Finanzas) | [L1912-L2199](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L1912-L2199) |
| `09-finanzas-costos` | Finanzas › Costos y punto de equilibrio | `isFinanzas` (Finanzas) | [L1912-L2199](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L1912-L2199) |
| `09-finanzas-impuestos` | Finanzas › Impuestos | `isFinanzas` (Finanzas) | [L1912-L2199](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L1912-L2199) |
| `09-finanzas-flujo-caja` | Finanzas › Flujo de caja | `isFinanzas` (Finanzas) | [L1912-L2199](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L1912-L2199) |
| `09-finanzas-precios-abonos` | Finanzas › Precios y abonos | `isFinanzas` (Finanzas) | [L1912-L2199](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L1912-L2199) |
| `09-finanzas-a-pagar` | Finanzas › A pagar | `isFinanzas` (Finanzas) | [L1912-L2199](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L1912-L2199) |
| `10-informes-insights` | Informes › Insights del negocio | `isInformes` (Informes) | [L3046-L3387](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L3046-L3387) |
| `10-informes-ingresos` | Informes › Ingresos | `isInformes` (Informes) | [L3046-L3387](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L3046-L3387) |
| `10-informes-canales` | Informes › Canales | `isInformes` (Informes) | [L3046-L3387](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L3046-L3387) |
| `10-informes-cobranza` | Informes › Cobranza | `isInformes` (Informes) | [L3046-L3387](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L3046-L3387) |
| `10-informes-entrega` | Informes › Entrega | `isInformes` (Informes) | [L3046-L3387](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L3046-L3387) |
| `11-aprobaciones` | Aprobaciones | `isEjecuciones` (Aprobaciones) | [L3875-L3915](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L3875-L3915) |
| `12-configuracion-resumen` | Configuración › Resumen | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-mi-perfil` | Configuración › Mi perfil | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-notificaciones` | Configuración › Notificaciones | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-privacidad-y-seguridad` | Configuración › Privacidad y seguridad | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-datos-del-negocio-y-marca` | Configuración › Datos del negocio y marca | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-tipos-de-reunion` | Configuración › Tipos de reunión | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-formulario-y-reservas` | Configuración › Formulario y reservas | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-canales` | Configuración › Canales | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-equipo-y-permisos` | Configuración › Equipo y permisos | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-plan-y-facturacion` | Configuración › Plan y facturación | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-modulos-activos` | Configuración › Módulos activos | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-automatizaciones` | Configuración › Automatizaciones | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-ia-y-agentes` | Configuración › IA y agentes | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-conexiones` | Configuración › Conexiones | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-respaldos-y-exportacion` | Configuración › Respaldos y exportación | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-auditoria` | Configuración › Auditoría | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-estado-y-consumo` | Configuración › Estado y consumo | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-organizaciones` | Configuración › Organizaciones | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-modulos-por-organizacion` | Configuración › Módulos por organización | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-ia-de-la-plataforma` | Configuración › IA de la plataforma | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-catalogo-de-integraciones` | Configuración › Catálogo de integraciones | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-reportes-de-superset` | Configuración › Reportes de Superset | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-operacion-e-infraestructura` | Configuración › Operación e infraestructura | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |
| `12-configuracion-auditoria-de-plataforma` | Configuración › Auditoría de plataforma | `isConfig` (Configuración) | [L2379-L3045](https://github.com/nicolasjones/a360/blob/main/prototipo/Main.dc.html#L2379-L3045) |

Otros bloques: Portal del cliente (`isPortal`, L2200-L2378), Asistente flotante de IA (L4091-L4140), Modales (L4141-L5532), Acceso y onboarding (`inAuth`, L5533-L5786), Agentes y conocimiento (`isAsistente`, L3916-L4090). La lógica y los datos de ejemplo están en el `<script type="text/x-dc">` al final del archivo.

Nota: en Configuración las 29 pestañas comparten el bloque `isConfig`; la historia indica la pestaña. Los números de línea corresponden a la versión del prototipo en `main` y se regeneran si el archivo cambia.
