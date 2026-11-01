import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';
const S = [
  ['01-hoy', 'Hoy', null],
  ['02-mi-asistente-agenda', 'Mi asistente', 'Agenda'],
  ['02-mi-asistente-tareas', 'Mi asistente', 'Tareas'],
  ['02-mi-asistente-recordatorios', 'Mi asistente', 'Recordatorios'],
  ['02-mi-asistente-mensajes-automaticos', 'Mi asistente', 'Mensajes automáticos'],
  ['02-mi-asistente-ajustes', 'Mi asistente', 'Ajustes'],
  ['03-personas-todas', 'Personas', 'Todas'],
  ['03-personas-mi-red', 'Personas', 'Mi red'],
  ['03-personas-prospectos', 'Personas', 'Prospectos'],
  ['03-personas-clientes', 'Personas', 'Clientes'],
  ['03-personas-mapa-red', 'Personas', 'Mapa de la red'],
  ['04-diagnosticos', 'Diagnósticos', null],
  ['05-propuestas', 'Propuestas', null],
  ['06-reuniones', 'Reuniones', 'Reuniones'],
  ['06-reuniones-insights', 'Reuniones', 'Insights generales'],
  ['07-mensajes', 'Mensajes', null],
  ['08-trabajo', 'Trabajo', null],
  ['09-finanzas-cobros-facturas', 'Finanzas', 'Cobros y facturas'],
  ['09-finanzas-costos', 'Finanzas', 'Costos y punto de equilibrio'],
  ['09-finanzas-impuestos', 'Finanzas', 'Impuestos'],
  ['09-finanzas-flujo-caja', 'Finanzas', 'Flujo de caja'],
  ['09-finanzas-precios-abonos', 'Finanzas', 'Precios y abonos'],
  ['09-finanzas-a-pagar', 'Finanzas', 'A pagar'],
  ['10-informes-insights', 'Informes', 'Insights del negocio'],
  ['10-informes-ingresos', 'Informes', 'Ingresos'],
  ['10-informes-canales', 'Informes', 'Canales'],
  ['10-informes-cobranza', 'Informes', 'Cobranza'],
  ['10-informes-entrega', 'Informes', 'Entrega'],
  ['11-aprobaciones', 'Aprobaciones', null],
  ['12-configuracion-resumen', 'Configuración', 'Resumen'],
  ['12-configuracion-mi-perfil', 'Configuración', 'Mi perfil'],
  ['12-configuracion-notificaciones', 'Configuración', 'Notificaciones'],
  ['12-configuracion-privacidad-y-seguridad', 'Configuración', 'Privacidad y seguridad'],
  ['12-configuracion-datos-del-negocio-y-marca', 'Configuración', 'Datos del negocio y marca'],
  ['12-configuracion-tipos-de-reunion', 'Configuración', 'Tipos de reunión'],
  ['12-configuracion-formulario-y-reservas', 'Configuración', 'Formulario y reservas'],
  ['12-configuracion-canales', 'Configuración', 'Canales'],
  ['12-configuracion-equipo-y-permisos', 'Configuración', 'Equipo y permisos'],
  ['12-configuracion-plan-y-facturacion', 'Configuración', 'Plan y facturación'],
  ['12-configuracion-modulos-activos', 'Configuración', 'Módulos activos'],
  ['12-configuracion-automatizaciones', 'Configuración', 'Automatizaciones'],
  ['12-configuracion-ia-y-agentes', 'Configuración', 'IA y agentes'],
  ['12-configuracion-conexiones', 'Configuración', 'Conexiones'],
  ['12-configuracion-respaldos-y-exportacion', 'Configuración', 'Respaldos y exportación'],
  ['12-configuracion-auditoria', 'Configuración', 'Auditoría'],
  ['12-configuracion-estado-y-consumo', 'Configuración', 'Estado y consumo'],
  ['12-configuracion-organizaciones', 'Configuración', 'Organizaciones'],
  ['12-configuracion-modulos-por-organizacion', 'Configuración', 'Módulos por organización'],
  ['12-configuracion-ia-de-la-plataforma', 'Configuración', 'IA de la plataforma'],
  ['12-configuracion-catalogo-de-integraciones', 'Configuración', 'Catálogo de integraciones'],
  ['12-configuracion-reportes-de-superset', 'Configuración', 'Reportes de Superset'],
  ['12-configuracion-operacion-e-infraestructura', 'Configuración', 'Operación e infraestructura'],
  ['12-configuracion-auditoria-de-plataforma', 'Configuración', 'Auditoría de plataforma']
];
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
mkdirSync('prototipo/pantallas', { recursive: true });
const b = await chromium.launch();
const pg = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await pg.goto(pathToFileURL(path.resolve('prototipo/Main.dc.html')).href);
await pg.waitForTimeout(2500);
await pg.getByLabel('Email').fill('demo@a360.app');
await pg.getByPlaceholder('Tu contraseña').fill('demo');
await pg.getByRole('button', { name: 'Ingresar', exact: true }).click();
await pg.waitForTimeout(1200);
for (const s of ['CONVERSACIONES', 'OPERACIÓN', 'INTELIGENCIA', 'SISTEMA']) {
  await pg.locator('aside button', { hasText: s }).first().click();
  await pg.waitForTimeout(200);
}
let n = 0;
for (const [slug, nav, tab] of S) {
  await pg.locator('aside button', { hasText: nav }).first().click();
  await pg.waitForTimeout(400);
  if (tab) {
    const loc = pg.locator('main button', { hasText: new RegExp('^' + esc(tab)) });
    if ((await loc.count()) === 0) { console.log('Sin pestaña', slug); continue; }
    await loc.first().click();
    await pg.waitForTimeout(400);
  }
  await pg.screenshot({ path: `prototipo/pantallas/${slug}.png`, fullPage: true });
  n++;
}
console.log('Capturas', n);
await b.close();
