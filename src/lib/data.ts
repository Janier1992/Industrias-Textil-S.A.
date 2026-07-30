import type {
  AttendanceRecord,
  CandidateStage,
  Employee,
  Evaluation,
  NavItem,
  PayrollConcept,
} from "./types";

export const NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard Ejecutivo", glyph: "D", color: "oklch(0.47 0.09 200)" },
  { id: "empleados", label: "Empleados", glyph: "E", color: "oklch(0.5 0.1 220)" },
  { id: "nomina", label: "Nómina", glyph: "$", color: "oklch(0.55 0.12 40)" },
  { id: "reclutamiento", label: "Reclutamiento", glyph: "R", color: "oklch(0.5 0.1 260)" },
  { id: "marcacion", label: "Marcación y Asistencia", glyph: "M", color: "oklch(0.5 0.1 300)" },
  { id: "desempeno", label: "Desempeño", glyph: "P", color: "oklch(0.5 0.1 160)" },
];

export const MODULE_LABELS: Record<string, string> = {
  dashboard: "Dashboard Ejecutivo",
  empleados: "Empleados",
  nomina: "Nómina",
  reclutamiento: "Reclutamiento",
  marcacion: "Marcación y Asistencia",
  desempeno: "Desempeño",
};

export const PLANTAS = [
  "Confección Bogotá",
  "Corte Medellín",
  "Administrativa Bogotá",
  "Administrativa Medellín",
];

export const TURNOS = ["Mañana", "Tarde", "Noche", "Oficina"];
export const TURNOS_ASISTENCIA = ["Mañana", "Tarde", "Noche"];
export const ESTADOS_EMPLEADO = ["Activo", "Vacaciones", "Incapacidad"] as const;
export const ESTADOS_ASISTENCIA = ["A tiempo", "Tarde", "Ausente", "En turno", "Incapacidad"] as const;
export const ETAPAS_RECLUTAMIENTO = ["Postulados", "Entrevista", "Prueba técnica", "Oferta", "Contratado"];

export const EMP_BADGE: Record<string, { bg: string; color: string }> = {
  Activo: { bg: "oklch(0.93 0.06 150)", color: "oklch(0.4 0.1 150)" },
  Vacaciones: { bg: "oklch(0.94 0.06 80)", color: "oklch(0.5 0.1 80)" },
  Incapacidad: { bg: "oklch(0.93 0.06 25)", color: "oklch(0.5 0.12 25)" },
};

export const ATT_BADGE: Record<string, { bg: string; color: string }> = {
  "A tiempo": { bg: "oklch(0.93 0.06 150)", color: "oklch(0.4 0.1 150)" },
  Tarde: { bg: "oklch(0.94 0.06 80)", color: "oklch(0.5 0.1 80)" },
  Ausente: { bg: "oklch(0.93 0.06 25)", color: "oklch(0.5 0.12 25)" },
  "En turno": { bg: "oklch(0.94 0.03 200)", color: "oklch(0.4 0.08 200)" },
  Incapacidad: { bg: "oklch(0.93 0.06 25)", color: "oklch(0.5 0.12 25)" },
};

export const ESTADO_COLORS: Record<string, string> = {
  Activo: "oklch(0.6 0.12 150)",
  Vacaciones: "oklch(0.75 0.13 80)",
  Incapacidad: "oklch(0.6 0.14 25)",
};

export const SEED_EMPLOYEES: Employee[] = [
  { id: "emp-1", nombre: "Luz Marina Peña", cargo: "Operario de Costura", planta: "Confección Bogotá", turno: "Mañana", antiguedad: "3 años", salario: "$1.423.500", email: "luz.pena@industriastextil.co", estado: "Activo" },
  { id: "emp-2", nombre: "Carlos Andrés Ruiz", cargo: "Supervisor de Producción", planta: "Corte Medellín", turno: "Mañana", antiguedad: "6 años", salario: "$2.850.000", email: "carlos.ruiz@industriastextil.co", estado: "Activo" },
  { id: "emp-3", nombre: "María Fernanda Ortiz", cargo: "Auxiliar Contable", planta: "Administrativa Bogotá", turno: "Oficina", antiguedad: "2 años", salario: "$2.100.000", email: "maria.ortiz@industriastextil.co", estado: "Activo" },
  { id: "emp-4", nombre: "Jorge Iván Salcedo", cargo: "Operario de Tejeduría", planta: "Corte Medellín", turno: "Noche", antiguedad: "1 año", salario: "$1.423.500", email: "jorge.salcedo@industriastextil.co", estado: "Vacaciones" },
  { id: "emp-5", nombre: "Diana Patricia Gómez", cargo: "Analista de Calidad", planta: "Confección Bogotá", turno: "Tarde", antiguedad: "4 años", salario: "$2.300.000", email: "diana.gomez@industriastextil.co", estado: "Activo" },
  { id: "emp-6", nombre: "Andrés Felipe Torres", cargo: "Operario de Corte", planta: "Corte Medellín", turno: "Mañana", antiguedad: "8 meses", salario: "$1.423.500", email: "andres.torres@industriastextil.co", estado: "Activo" },
  { id: "emp-7", nombre: "Sandra Milena Herrera", cargo: "Coordinadora de Talento Humano", planta: "Administrativa Bogotá", turno: "Oficina", antiguedad: "5 años", salario: "$3.600.000", email: "sandra.herrera@industriastextil.co", estado: "Activo" },
  { id: "emp-8", nombre: "Pedro Antonio Vargas", cargo: "Operario de Costura", planta: "Confección Bogotá", turno: "Tarde", antiguedad: "11 meses", salario: "$1.423.500", email: "pedro.vargas@industriastextil.co", estado: "Incapacidad" },
];

export const SEED_PAYROLL: PayrollConcept[] = [
  { id: "pay-1", concepto: "Salario básico", tipo: "Devengado", monto: "$18.240.000" },
  { id: "pay-2", concepto: "Horas extras", tipo: "Devengado", monto: "$1.120.000" },
  { id: "pay-3", concepto: "Auxilio de transporte", tipo: "Devengado", monto: "$980.000" },
  { id: "pay-4", concepto: "Salud (aporte empleado)", tipo: "Deducción", monto: "-$730.000" },
  { id: "pay-5", concepto: "Pensión (aporte empleado)", tipo: "Deducción", monto: "-$730.000" },
  { id: "pay-6", concepto: "Retención en la fuente", tipo: "Deducción", monto: "-$210.000" },
];

export const SEED_CANDIDATE_STAGES: CandidateStage[] = [
  { label: "Postulados", candidates: [{ id: "cand-1", nombre: "Yuliana Cárdenas", fecha: "12 jul" }, { id: "cand-2", nombre: "Esteban Rico", fecha: "14 jul" }] },
  { label: "Entrevista", candidates: [{ id: "cand-3", nombre: "Camilo Pardo", fecha: "18 jul" }] },
  { label: "Prueba técnica", candidates: [{ id: "cand-4", nombre: "Natalia Cifuentes", fecha: "21 jul" }] },
  { label: "Oferta", candidates: [] },
  { label: "Contratado", candidates: [{ id: "cand-5", nombre: "Wilson Bautista", fecha: "5 jul" }] },
];

export const SEED_ATTENDANCE: AttendanceRecord[] = [
  { id: "att-1", nombre: "Luz Marina Peña", turno: "Mañana", entrada: "06:01", salida: "14:02", estado: "A tiempo" },
  { id: "att-2", nombre: "Andrés Felipe Torres", turno: "Mañana", entrada: "06:14", salida: "14:05", estado: "Tarde" },
  { id: "att-3", nombre: "Diana Patricia Gómez", turno: "Tarde", entrada: "14:00", salida: "—", estado: "En turno" },
  { id: "att-4", nombre: "Jorge Iván Salcedo", turno: "Noche", entrada: "—", salida: "—", estado: "Ausente" },
  { id: "att-5", nombre: "Pedro Antonio Vargas", turno: "Tarde", entrada: "—", salida: "—", estado: "Incapacidad" },
  { id: "att-6", nombre: "Carlos Andrés Ruiz", turno: "Mañana", entrada: "05:58", salida: "14:00", estado: "A tiempo" },
];

export const SEED_EVALUATIONS: Evaluation[] = [
  { id: "ev-1", nombre: "Luz Marina Peña", cargo: "Operario de Costura", puntaje: "4.6", competencias: [{ nombre: "Calidad de trabajo", valor: 92 }, { nombre: "Puntualidad", valor: 88 }, { nombre: "Trabajo en equipo", valor: 95 }] },
  { id: "ev-2", nombre: "Carlos Andrés Ruiz", cargo: "Supervisor de Producción", puntaje: "4.8", competencias: [{ nombre: "Liderazgo", valor: 96 }, { nombre: "Gestión de conflictos", valor: 90 }, { nombre: "Cumplimiento de metas", valor: 94 }] },
  { id: "ev-3", nombre: "Diana Patricia Gómez", cargo: "Analista de Calidad", puntaje: "4.3", competencias: [{ nombre: "Precisión técnica", valor: 91 }, { nombre: "Comunicación", valor: 80 }, { nombre: "Iniciativa", valor: 85 }] },
  { id: "ev-4", nombre: "Sandra Milena Herrera", cargo: "Coord. Talento Humano", puntaje: "4.7", competencias: [{ nombre: "Gestión de personas", valor: 93 }, { nombre: "Planeación", valor: 89 }, { nombre: "Confidencialidad", valor: 97 }] },
];

export const AUXILIO_TRANSPORTE = 140606; // SUPUESTO: valor 2026 no confirmado por el cliente; ajustar con legislación vigente.
