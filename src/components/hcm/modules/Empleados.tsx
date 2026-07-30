"use client";

import { useState } from "react";
import { EMP_BADGE } from "@/lib/data";
import { nextId } from "@/lib/format";
import type { Employee } from "@/lib/types";
import { useHcm } from "@/store/HcmStore";
import { Badge } from "../ui/Badge";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { FloatingModal } from "../ui/FloatingModal";
import { EmployeeForm, type EmployeeDraft } from "../forms/EmployeeForm";

function initials(nombre: string) {
  return nombre.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

const COLUMNS = "2fr 1.6fr 1.2fr 1fr 1fr 0.9fr 1fr";

export function Empleados() {
  const { state, dispatch } = useHcm();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(e: Employee) {
    setEditing(e);
    setFormOpen(true);
  }
  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  function handleSubmit(draft: EmployeeDraft) {
    if (editing) {
      dispatch({ type: "UPDATE_EMPLOYEE", employee: { ...editing, ...draft } });
    } else {
      dispatch({
        type: "ADD_EMPLOYEE",
        employee: { id: nextId("emp"), antiguedad: "0 meses", ...draft },
      });
    }
    closeForm();
  }

  const pendingEmployee = state.employees.find((e) => e.id === pendingDeleteId);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Empleados · Expediente Digital</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{state.employees.length} colaboradores</div>
          <button className="btn btn-primary" onClick={openCreate}>
            + Nuevo empleado
          </button>
        </div>
      </div>

      <div className="card table-responsive">
        <div style={{ minWidth: 760 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: COLUMNS,
              padding: "11px 20px",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--text-muted)",
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            <div>Nombre</div>
            <div>Cargo</div>
            <div>Planta</div>
            <div>Turno</div>
            <div>Antigüedad</div>
            <div>Estado</div>
            <div>Acciones</div>
          </div>

          {state.employees.map((e) => (
            <div
              key={e.id}
              className="table-row-hover"
              onClick={() => dispatch({ type: "OPEN_EMPLOYEE", id: e.id })}
              style={{
                display: "grid",
                gridTemplateColumns: COLUMNS,
                padding: "13px 20px",
                fontSize: 13.5,
                borderBottom: "1px solid var(--border-lighter)",
                cursor: "pointer",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600 }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "var(--accent-soft)",
                    color: "var(--accent-soft-text)",
                    fontSize: 11,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {initials(e.nombre)}
                </span>
                {e.nombre}
              </div>
              <div style={{ color: "var(--text-muted-2)" }}>{e.cargo}</div>
              <div style={{ color: "var(--text-muted-2)" }}>{e.planta}</div>
              <div style={{ color: "var(--text-muted-2)" }}>{e.turno}</div>
              <div className="mono" style={{ color: "var(--text-muted-2)" }}>
                {e.antiguedad}
              </div>
              <div>
                <Badge label={e.estado} bg={EMP_BADGE[e.estado].bg} color={EMP_BADGE[e.estado].color} />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  className="link-btn link-edit"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    openEdit(e);
                  }}
                >
                  Editar
                </button>
                <button
                  className="link-btn link-delete"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setPendingDeleteId(e.id);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FloatingModal
        open={formOpen}
        onClose={closeForm}
        title={editing ? "Editar empleado" : "Nuevo empleado"}
        subtitle="Registra o actualiza la información del expediente digital."
        maxWidth={480}
      >
        <EmployeeForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={closeForm} />
      </FloatingModal>

      <ConfirmDialog
        open={!!pendingDeleteId}
        title="Eliminar empleado"
        message={pendingEmployee ? `¿Seguro que deseas eliminar a ${pendingEmployee.nombre} del expediente digital? Esta acción no se puede deshacer.` : ""}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) dispatch({ type: "DELETE_EMPLOYEE", id: pendingDeleteId });
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
