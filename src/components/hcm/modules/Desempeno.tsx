"use client";

import { useState } from "react";
import { nextId } from "@/lib/format";
import type { Evaluation } from "@/lib/types";
import { useHcm } from "@/store/HcmStore";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { FloatingModal } from "../ui/FloatingModal";
import { EvaluationForm, type EvaluationDraft } from "../forms/EvaluationForm";

export function Desempeno() {
  const { state, dispatch } = useHcm();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Evaluation | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(ev: Evaluation) {
    setEditing(ev);
    setFormOpen(true);
  }
  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  function handleSubmit(draft: EvaluationDraft) {
    if (editing) {
      dispatch({ type: "UPDATE_EVALUATION", evaluation: { ...editing, ...draft } });
    } else {
      dispatch({ type: "ADD_EVALUATION", evaluation: { id: nextId("ev"), ...draft } });
    }
    closeForm();
  }

  const pendingEvaluation = state.evaluations.find((ev) => ev.id === pendingDeleteId);
  const editingDraft: EvaluationDraft | undefined = editing
    ? {
        nombre: editing.nombre,
        cargo: editing.cargo,
        puntaje: editing.puntaje,
        competencias: [
          editing.competencias[0] ?? { nombre: "Calidad de trabajo", valor: 80 },
          editing.competencias[1] ?? { nombre: "Puntualidad", valor: 80 },
          editing.competencias[2] ?? { nombre: "Trabajo en equipo", valor: 80 },
        ],
      }
    : undefined;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Desempeño · Ciclo 2026-S1</h1>
        <button className="btn btn-primary" onClick={openCreate}>
          + Nueva evaluación
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        {state.evaluations.map((ev) => (
          <div key={ev.id} className="card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{ev.nombre}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{ev.cargo}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: "var(--accent)" }}>
                  {ev.puntaje}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                  <button className="link-btn link-edit" style={{ fontSize: 11.5 }} onClick={() => openEdit(ev)}>
                    Editar
                  </button>
                  <button className="link-btn link-delete" style={{ fontSize: 11.5 }} onClick={() => setPendingDeleteId(ev.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
            {ev.competencias.map((comp) => (
              <div key={comp.nombre} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted-3)", marginBottom: 3 }}>
                  <span>{comp.nombre}</span>
                  <span className="mono">{comp.valor}%</span>
                </div>
                <div style={{ height: 6, background: "var(--border-light)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${comp.valor}%`, background: "var(--accent)" }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <FloatingModal
        open={formOpen}
        onClose={closeForm}
        title={editing ? "Editar evaluación" : "Nueva evaluación"}
        subtitle="Registra la evaluación de desempeño de un colaborador."
        maxWidth={480}
      >
        <EvaluationForm initial={editingDraft} onSubmit={handleSubmit} onCancel={closeForm} />
      </FloatingModal>

      <ConfirmDialog
        open={!!pendingDeleteId}
        title="Eliminar evaluación"
        message={pendingEvaluation ? `¿Eliminar la evaluación de ${pendingEvaluation.nombre}?` : ""}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) dispatch({ type: "DELETE_EVALUATION", id: pendingDeleteId });
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}
