"use client";

import { EMP_BADGE } from "@/lib/data";
import { useHcm } from "@/store/HcmStore";
import { FloatingModal } from "./ui/FloatingModal";
import { Badge } from "./ui/Badge";

function initials(nombre: string) {
  return nombre.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border-light)",
        paddingTop: 12,
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13.5,
      }}
    >
      <span style={{ color: "var(--text-muted)" }}>{label}</span>
      <span className={mono ? "mono" : undefined} style={{ fontWeight: 500 }}>
        {value}
      </span>
    </div>
  );
}

export function EmployeeDetailDrawer() {
  const { state, dispatch } = useHcm();
  const employee = state.employees.find((e) => e.id === state.selectedEmployeeId);

  return (
    <FloatingModal
      open={state.drawerOpen && !!employee}
      onClose={() => dispatch({ type: "CLOSE_DRAWER" })}
      maxWidth={460}
    >
      {employee && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "var(--accent-soft)",
                color: "var(--accent-soft-text)",
                fontSize: 20,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {initials(employee.nombre)}
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{employee.nombre}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{employee.cargo}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Row label="Planta" value={employee.planta} />
            <Row label="Turno" value={employee.turno} />
            <Row label="Antigüedad" value={employee.antiguedad} mono />
            <Row label="Salario base" value={employee.salario} mono />
            <Row label="Correo" value={employee.email || "No registrado"} />
            <div
              style={{
                borderTop: "1px solid var(--border-light)",
                paddingTop: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 13.5,
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>Estado</span>
              <Badge
                label={employee.estado}
                bg={EMP_BADGE[employee.estado].bg}
                color={EMP_BADGE[employee.estado].color}
              />
            </div>
          </div>
        </>
      )}
    </FloatingModal>
  );
}
