# CasaFácil Frontend

Aplicación Angular para una inmobiliaria: catálogo de propiedades (casas, departamentos, oficinas, terrenos), cotización, compra y renta, con panel de administración basado en roles.

## Roles

- **Admin**: gestiona propiedades, usuarios y solicitudes.
- **Agente**: gestiona propiedades y solicitudes.
- **Cliente**: explora propiedades y envía cotizaciones/solicitudes de compra o renta.

## Cuentas de demostración

| Rol     | Correo                 | Contraseña  |
|---------|-------------------------|-------------|
| Admin   | admin@casafacil.com     | admin123    |
| Agente  | agente@casafacil.com    | agente123   |
| Cliente | cliente@casafacil.com   | cliente123  |

Los datos son simulados en memoria (servicios con Angular Signals) — no hay backend real; ideal como base para conectar una API en el futuro.

## Instalación

```bash
npm install
npm start
```

La app corre en `http://localhost:4200`.

## Build de producción

```bash
npm run build
```

## Stack

- Angular 18 (standalone components, signals, control flow `@if/@for`)
- Tailwind CSS 3
- Reactive Forms
- Angular Router con guards de autenticación y rol (`authGuard`, `roleGuard`)

## Estructura

```
src/app/
  core/        -> modelos, servicios (mock data) y guards
  shared/      -> componentes reutilizables (navbar, footer, property-card, stat-card)
  features/
    auth/      -> login, registro
    public/    -> home, listado y detalle de propiedades
    client/    -> panel del cliente (mi actividad)
    admin/     -> dashboard, propiedades, usuarios, solicitudes
```