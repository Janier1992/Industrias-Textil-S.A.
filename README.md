# Handoff: ERP HCM — Industrias Textil (Prototipo interactivo)

## Overview
Prototipo interactivo de un ERP de Recursos, empresa de manufactura. Cubre 5 módulos operativos: Dashboard Ejecutivo, Empleados, Nómina, Reclutamiento y Onboarding, Marcación y Asistencia, y Desempeño.

## About the Design Files
The file in this bundle (`ERP HCM.dc.html`) is a **design reference built in HTML/React** — a working prototype showing intended layout, data, and interactions, not production code to copy directly. It uses a proprietary lightweight component runtime (template holes, `sc-for`/`sc-if` control-flow tags, a `DCLogic` class) that only runs inside the design tool it was built in — **it will not run standalone in a normal browser/dev environment**. Treat it as a functional spec: recreate the same screens, data model, and interactions in the target codebase's actual stack (React/Vue/Angular, or the framework you choose if starting fresh), using that stack's real state management, forms, and component patterns.

## Fidelity
**High-fidelity for layout, data model, and interaction logic. Placeholder for visual polish.** Colors, typography, spacing, and component structure are intentional and should be recreated closely. However this is still an early-stage functional prototype — feel free to apply the target app's real design system for exact shadows/elevation if one exists.

## Screens / Modules

### 1. Dashboard Ejecutivo (default view on load)
- 4 KPI cards (grid, 4 columns, 14px gap): Headcount total, Rotación anual, Ausentismo mensual, Costo de nómina mensual (computed live from employee/payroll data).
- "Headcount por planta" — vertical bar chart (CSS only), bars sized by `count/max`.
- "Rotación de personal" — donut (CSS conic-gradient), static 8.4%.
- "Estado del personal" — donut computed from live employee status counts (Activo/Vacaciones/Incapacidad) + color-coded legend.
- "Distribución por turno" — horizontal bar list, computed from live employee turno counts.
- "Devengado vs. Deducciones" — two horizontal comparison bars from payroll concept totals.

### 2. Empleados (expediente digital)
- Table: Nombre (+ initials avatar), Cargo, Planta, Turno, Antigüedad, Estado (badge), Acciones (Editar / Eliminar).
- Row click (outside Acciones) opens a right-side detail drawer (planta, turno, antigüedad, salario, correo, estado).
- "+ Nuevo empleado" opens a right-side form drawer (create). "Editar" opens the same form pre-filled (update-in-place). "Eliminar" removes the row immediately (no confirm dialog in the prototype — add one in production).

### 3. Nómina (Julio 2026)
- Payroll status banner (Pendiente de aprobación / Procesado) toggled by "Procesar nómina" button.
- Concept table (Devengado/Deducción rows) with Acciones (Editar/Eliminar) + running total row.
- "+ Nuevo concepto" form (create/edit).
- **Recibo de pago por empleado**: a `<select>` of all employees; selecting one computes and displays a payslip card (salario básico, auxilio de transporte fixed at $140.606 — SUPUESTO, salud 4%, pensión 4%, neto a pagar). "Imprimir recibo" calls `window.print()` on the whole page in the prototype — in production, scope print styles to just the payslip card (e.g. an isolated print stylesheet or a dedicated print route/modal).

### 4. Reclutamiento y Onboarding
- 5-column kanban (Postulados, Entrevista, Prueba técnica, Oferta, Contratado), one static vacancy header.
- Candidate cards have a "×" delete button (no edit in the prototype — add if needed).
- "+ Nuevo candidato" form assigns a candidate to a selected stage.

### 5. Marcación y Asistencia (hoy)
- Attendance table (Colaborador, Turno, Entrada, Salida, Estado badge, Acciones).
- "+ Registrar marcación" create/edit form.

### 6. Desempeño (Ciclo 2026-S1)
- 2-column grid of evaluation cards: name, cargo, overall score, 3 competency bars (0-100%), Editar/Eliminar links top-right.
- "+ Nueva evaluación" create/edit form.

## Interactions & Behavior
- All navigation and CRUD is client-side, in-memory React state (no backend/persistence — refresh loses all edits).
- Every "+ Nuevo" / "Editar" opens the SAME right-side slide-over form per module; the component tracks an `editIndex` to distinguish create vs. update, and resets it to `null` on close/submit.
- Forms have no field validation beyond fallback defaults (empty text becomes a placeholder value like "Nuevo colaborador").
- No loading or error states are modeled (all data is static/in-memory).
- Not responsive — built for desktop/laptop widths (fixed 248px sidebar, fluid content area).

## State Management (conceptual — for reimplementation)
Recommend modeling each module's records as its own collection (employees, payrollConcepts, candidatesByStage, attendance, evaluations) with standard CRUD actions, plus:
- `activeModule` (string) — current nav selection.
- `selectedEmployee` / `drawerOpen` — employee detail drawer.
- `formModule`, `formData`, `editIndex` — shared create/edit form drawer state.
- `payrollStatus` — 'pendiente' | 'procesado'.
- `reciboEmployeeIdx` — selected employee for payslip view.
In a real app, back all of this with API calls (fetch/create/update/delete) instead of in-memory arrays, and add optimistic UI + error handling.

## Design Tokens
- **Font**: IBM Plex Sans (UI text), IBM Plex Mono (numbers/currency/times) — Google Fonts.
- **Background**: `oklch(0.98 0.004 85)` (warm off-white).
- **Surface/card**: white, `border: 1px solid oklch(0.9 0.006 85)`, `border-radius: 14px`, `box-shadow: 0 1px 3px oklch(0.2 0.01 85 / 0.05)`.
- **Sidebar**: `oklch(0.16 0.015 230)` background, near-white text.
- **Primary accent (teal)**: `oklch(0.47 0.09 200)` — buttons, active nav icon, links, chart bars.
- **Secondary accent (terracotta)**: `oklch(0.62 0.13 40)` — rotación donut, warning-leaning trend text.
- **Status colors**: success/green `oklch(0.6 0.12 150)` (Activo), warning/amber `oklch(0.75 0.13 80)` (Vacaciones/Tarde), danger/red `oklch(0.6 0.14 25)` (Incapacidad/Ausente/Eliminar).
- **Text**: primary `oklch(0.22 0.01 85)`, muted `oklch(0.5 0.01 85)`.
- **Radius scale**: 6-8px (buttons/inputs/small chips), 10-14px (cards/table containers), pill (9999px, badges).
- **Spacing**: content padding 28px/32px; card padding 18-24px; form field gap 12-14px.

## Assets
No image assets — all icons are 22×22px colored squares with 1-letter glyphs (nav) or CSS shapes (avatars, donuts). No external images used.

## Files
- `ERP HCM.dc.html` — the complete prototype (template + component logic in one file). Open the "Screens / Modules" section above for a map of what each part of the file implements.
