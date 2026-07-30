"use client";

import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
import {
  SEED_ATTENDANCE,
  SEED_CANDIDATE_STAGES,
  SEED_EMPLOYEES,
  SEED_EVALUATIONS,
  SEED_PAYROLL,
} from "@/lib/data";
import type {
  AttendanceRecord,
  CandidateStage,
  Employee,
  Evaluation,
  ModuleId,
  PayrollConcept,
  PayrollStatus,
} from "@/lib/types";

export interface HcmState {
  activeModule: ModuleId;
  employees: Employee[];
  payrollConcepts: PayrollConcept[];
  candidateStages: CandidateStage[];
  attendance: AttendanceRecord[];
  evaluations: Evaluation[];
  payrollStatus: PayrollStatus;
  selectedEmployeeId: string | null;
  drawerOpen: boolean;
  reciboEmployeeId: string | null;
}

const initialState: HcmState = {
  activeModule: "dashboard",
  employees: SEED_EMPLOYEES,
  payrollConcepts: SEED_PAYROLL,
  candidateStages: SEED_CANDIDATE_STAGES,
  attendance: SEED_ATTENDANCE,
  evaluations: SEED_EVALUATIONS,
  payrollStatus: "pendiente",
  selectedEmployeeId: null,
  drawerOpen: false,
  reciboEmployeeId: null,
};

export type HcmAction =
  | { type: "SELECT_MODULE"; module: ModuleId }
  | { type: "OPEN_EMPLOYEE"; id: string }
  | { type: "CLOSE_DRAWER" }
  | { type: "TOGGLE_PAYROLL_STATUS" }
  | { type: "SET_RECIBO_EMPLOYEE"; id: string | null }
  | { type: "ADD_EMPLOYEE"; employee: Employee }
  | { type: "UPDATE_EMPLOYEE"; employee: Employee }
  | { type: "DELETE_EMPLOYEE"; id: string }
  | { type: "ADD_PAYROLL"; concept: PayrollConcept }
  | { type: "UPDATE_PAYROLL"; concept: PayrollConcept }
  | { type: "DELETE_PAYROLL"; id: string }
  | { type: "ADD_CANDIDATE"; stageLabel: string; nombre: string; fecha: string; id: string }
  | { type: "DELETE_CANDIDATE"; stageLabel: string; id: string }
  | { type: "ADD_ATTENDANCE"; record: AttendanceRecord }
  | { type: "UPDATE_ATTENDANCE"; record: AttendanceRecord }
  | { type: "DELETE_ATTENDANCE"; id: string }
  | { type: "ADD_EVALUATION"; evaluation: Evaluation }
  | { type: "UPDATE_EVALUATION"; evaluation: Evaluation }
  | { type: "DELETE_EVALUATION"; id: string };

function hcmReducer(state: HcmState, action: HcmAction): HcmState {
  switch (action.type) {
    case "SELECT_MODULE":
      return { ...state, activeModule: action.module };
    case "OPEN_EMPLOYEE":
      return { ...state, selectedEmployeeId: action.id, drawerOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, drawerOpen: false };
    case "TOGGLE_PAYROLL_STATUS":
      return {
        ...state,
        payrollStatus: state.payrollStatus === "pendiente" ? "procesado" : "pendiente",
      };
    case "SET_RECIBO_EMPLOYEE":
      return { ...state, reciboEmployeeId: action.id };

    case "ADD_EMPLOYEE":
      return { ...state, employees: [...state.employees, action.employee] };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((e) => (e.id === action.employee.id ? action.employee : e)),
      };
    case "DELETE_EMPLOYEE":
      return { ...state, employees: state.employees.filter((e) => e.id !== action.id) };

    case "ADD_PAYROLL":
      return { ...state, payrollConcepts: [...state.payrollConcepts, action.concept] };
    case "UPDATE_PAYROLL":
      return {
        ...state,
        payrollConcepts: state.payrollConcepts.map((c) =>
          c.id === action.concept.id ? action.concept : c,
        ),
      };
    case "DELETE_PAYROLL":
      return { ...state, payrollConcepts: state.payrollConcepts.filter((c) => c.id !== action.id) };

    case "ADD_CANDIDATE":
      return {
        ...state,
        candidateStages: state.candidateStages.map((stage) =>
          stage.label === action.stageLabel
            ? {
                ...stage,
                candidates: [...stage.candidates, { id: action.id, nombre: action.nombre, fecha: action.fecha }],
              }
            : stage,
        ),
      };
    case "DELETE_CANDIDATE":
      return {
        ...state,
        candidateStages: state.candidateStages.map((stage) =>
          stage.label === action.stageLabel
            ? { ...stage, candidates: stage.candidates.filter((c) => c.id !== action.id) }
            : stage,
        ),
      };

    case "ADD_ATTENDANCE":
      return { ...state, attendance: [...state.attendance, action.record] };
    case "UPDATE_ATTENDANCE":
      return {
        ...state,
        attendance: state.attendance.map((a) => (a.id === action.record.id ? action.record : a)),
      };
    case "DELETE_ATTENDANCE":
      return { ...state, attendance: state.attendance.filter((a) => a.id !== action.id) };

    case "ADD_EVALUATION":
      return { ...state, evaluations: [...state.evaluations, action.evaluation] };
    case "UPDATE_EVALUATION":
      return {
        ...state,
        evaluations: state.evaluations.map((ev) =>
          ev.id === action.evaluation.id ? action.evaluation : ev,
        ),
      };
    case "DELETE_EVALUATION":
      return { ...state, evaluations: state.evaluations.filter((ev) => ev.id !== action.id) };

    default:
      return state;
  }
}

const HcmContext = createContext<{ state: HcmState; dispatch: Dispatch<HcmAction> } | null>(null);

export function HcmProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(hcmReducer, initialState);
  return <HcmContext.Provider value={{ state, dispatch }}>{children}</HcmContext.Provider>;
}

export function useHcm() {
  const ctx = useContext(HcmContext);
  if (!ctx) throw new Error("useHcm debe usarse dentro de <HcmProvider>");
  return ctx;
}
