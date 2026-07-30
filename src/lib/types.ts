export type EstadoEmpleado = "Activo" | "Vacaciones" | "Incapacidad";

export interface Employee {
  id: string;
  nombre: string;
  cargo: string;
  planta: string;
  turno: string;
  antiguedad: string;
  salario: string;
  email: string;
  estado: EstadoEmpleado;
}

export type TipoConcepto = "Devengado" | "Deducción";

export interface PayrollConcept {
  id: string;
  concepto: string;
  tipo: TipoConcepto;
  monto: string;
}

export interface Candidate {
  id: string;
  nombre: string;
  fecha: string;
}

export interface CandidateStage {
  label: string;
  candidates: Candidate[];
}

export type EstadoAsistencia =
  | "A tiempo"
  | "Tarde"
  | "Ausente"
  | "En turno"
  | "Incapacidad";

export interface AttendanceRecord {
  id: string;
  nombre: string;
  turno: string;
  entrada: string;
  salida: string;
  estado: EstadoAsistencia;
}

export interface Competencia {
  nombre: string;
  valor: number;
}

export interface Evaluation {
  id: string;
  nombre: string;
  cargo: string;
  puntaje: string;
  competencias: Competencia[];
}

export type ModuleId =
  | "dashboard"
  | "empleados"
  | "nomina"
  | "reclutamiento"
  | "marcacion"
  | "desempeno";

export interface NavItem {
  id: ModuleId;
  label: string;
  glyph: string;
  color: string;
}

export type PayrollStatus = "pendiente" | "procesado";
