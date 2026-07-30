"use client";

import { useState } from "react";
import { useHcm } from "@/store/HcmStore";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { BottomNav } from "./BottomNav";
import { EmployeeDetailDrawer } from "./EmployeeDetailDrawer";
import { Dashboard } from "./modules/Dashboard";
import { Empleados } from "./modules/Empleados";
import { Nomina } from "./modules/Nomina";
import { Reclutamiento } from "./modules/Reclutamiento";
import { Marcacion } from "./modules/Marcacion";
import { Desempeno } from "./modules/Desempeno";

interface HcmAppProps {
  onLogout?: () => void;
}

export function HcmApp({ onLogout }: HcmAppProps) {
  const { state } = useHcm();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        background: "var(--bg)",
        color: "var(--text)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Sidebar collapsed={sidebarCollapsed} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100%" }}>
        <Topbar
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
          onLogout={onLogout}
        />
        <main
          className="main-content-area"
          style={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {state.activeModule === "dashboard" && <Dashboard />}
          {state.activeModule === "empleados" && <Empleados />}
          {state.activeModule === "nomina" && <Nomina />}
          {state.activeModule === "reclutamiento" && <Reclutamiento />}
          {state.activeModule === "marcacion" && <Marcacion />}
          {state.activeModule === "desempeno" && <Desempeno />}
        </main>
      </div>

      <BottomNav />
      <EmployeeDetailDrawer />
    </div>
  );
}
