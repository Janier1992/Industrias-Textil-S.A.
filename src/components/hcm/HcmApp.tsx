"use client";

import { useHcm } from "@/store/HcmStore";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { EmployeeDetailDrawer } from "./EmployeeDetailDrawer";
import { Dashboard } from "./modules/Dashboard";
import { Empleados } from "./modules/Empleados";
import { Nomina } from "./modules/Nomina";
import { Reclutamiento } from "./modules/Reclutamiento";
import { Marcacion } from "./modules/Marcacion";
import { Desempeno } from "./modules/Desempeno";

export function HcmApp() {
  const { state } = useHcm();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        background: "var(--bg)",
        color: "var(--text)",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar />
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px 60px" }}>
          {state.activeModule === "dashboard" && <Dashboard />}
          {state.activeModule === "empleados" && <Empleados />}
          {state.activeModule === "nomina" && <Nomina />}
          {state.activeModule === "reclutamiento" && <Reclutamiento />}
          {state.activeModule === "marcacion" && <Marcacion />}
          {state.activeModule === "desempeno" && <Desempeno />}
        </div>
      </div>

      <EmployeeDetailDrawer />
    </div>
  );
}
