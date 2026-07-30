"use client";

import { useState } from "react";
import { ATT_BADGE } from "@/lib/data";
import { nextId } from "@/lib/format";
import type { AttendanceRecord } from "@/lib/types";
import { useHcm } from "@/store/HcmStore";
import { Badge } from "../ui/Badge";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { FloatingModal } from "../ui/FloatingModal";
import { AttendanceForm, type AttendanceDraft } from "../forms/AttendanceForm";

const COLUMNS = "2fr 1.2fr 1fr 1fr 1fr 1fr";

export function Marcacion() {
  const { state, dispatch } = useHcm();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AttendanceRecord | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(a: AttendanceRecord) {
    setEditing(a);
    setFormOpen(true);
  }
  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  function handleSubmit(draft: AttendanceDraft) {
    if (editing) {
      dispatch({ type: "UPDATE_ATTENDANCE", record: { ...editing, ...draft } });
    } else {
      dispatch({ type: "ADD_ATTENDANCE", record: { id: nextId("att"), ...draft } });
    }
    closeForm();
  }

  const pendingRecord = state.attendance.find((a) => a.id === pendingDeleteId);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Marcación y Asistencia — Hoy</h1>
        <button className="btn btn-primary" onClick={openCreate}>
          + Registrar marcación
        </button>
      </div>

      <div className="card table-responsive">
        <div style={{ minWidth: 620 }}>
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
            <div>Colaborador</div>
            <div>Turno</div>
            <div>Entrada</div>
            <div>Salida</div>
            <div>Estado</div>
            <div>Acciones</div>
          </div>
          {state.attendance.map((a) => (
            <div
              key={a.id}
              style={{
                display: "grid",
                gridTemplateColumns: COLUMNS,
                padding: "13px 20px",
                fontSize: 13.5,
                borderBottom: "1px solid var(--border-lighter)",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: 500 }}>{a.nombre}</div>
              <div style={{ color: "var(--text-muted)" }}>{a.turno}</div>
              <div className="mono">{a.entrada}</div>
              <div className="mono">{a.salida}</div>
              <div>
                <Badge label={a.estado} bg={ATT_BADGE[a.estado].bg} color={ATT_BADGE[a.estado].color} />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="link-btn link-edit" onClick={() => openEdit(a)}>
                  Editar
                </button>
                <button className="link-btn link-delete" onClick={() => setPendingDeleteId(a.id)}>
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
        title={editing ? "Editar marcación" : "Registrar marcación"}
        subtitle="Registra o corrige la marcación de un colaborador."
        maxWidth={460}
      >
        <AttendanceForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={closeForm} />
      </FloatingModal>

      <ConfirmDialog
        open={!!pendingDeleteId}
        title="Eliminar marcación"
        message={pendingRecord ? `¿Eliminar el registro de marcación de ${pendingRecord.nombre}?` : ""}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) dispatch({ type: "DELETE_ATTENDANCE", id: pendingDeleteId });
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
