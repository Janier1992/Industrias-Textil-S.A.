"use client";

import { useState } from "react";
import { nextId } from "@/lib/format";
import { useHcm } from "@/store/HcmStore";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { FloatingModal } from "../ui/FloatingModal";
import { CandidateForm, type CandidateDraft } from "../forms/CandidateForm";

export function Reclutamiento() {
  const { state, dispatch } = useHcm();
  const [formOpen, setFormOpen] = useState(false);
  const [pending, setPending] = useState<{ stageLabel: string; id: string; nombre: string } | null>(null);

  function handleSubmit(draft: CandidateDraft) {
    dispatch({ type: "ADD_CANDIDATE", stageLabel: draft.etapa, nombre: draft.nombre.trim(), fecha: draft.fecha, id: nextId("cand") });
    setFormOpen(false);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Reclutamiento y Onboarding</h1>
        <button className="btn btn-primary" onClick={() => setFormOpen(true)}>
          + Nuevo candidato
        </button>
      </div>
      <p style={{ fontSize: 13.5, color: "var(--text-muted)", margin: "0 0 20px" }}>
        Vacante activa: Operario(a) de Costura Industrial — Planta Confección Bogotá
      </p>

      <div className="table-responsive" style={{ paddingBottom: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(210px, 1fr))", gap: 12, minWidth: 1050 }}>
          {state.candidateStages.map((stage) => (
            <div key={stage.label}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--text-muted)", marginBottom: 10 }}>
                {stage.label} · {stage.candidates.length}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {stage.candidates.map((cand) => (
                  <div
                    key={cand.id}
                    className="card"
                    style={{ position: "relative", padding: 12 }}
                  >
                    <button
                      onClick={() => setPending({ stageLabel: stage.label, id: cand.id, nombre: cand.nombre })}
                      style={{
                        all: "unset",
                        cursor: "pointer",
                        position: "absolute",
                        top: 8,
                        right: 10,
                        fontSize: 14,
                        color: "var(--text-muted)",
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                    <div style={{ fontSize: 13, fontWeight: 600, paddingRight: 14 }}>{cand.nombre}</div>
                    <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 3 }}>{cand.fecha}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <FloatingModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title="Nuevo candidato"
        subtitle="Añade un candidato a la etapa correspondiente del proceso."
        maxWidth={460}
      >
        <CandidateForm defaultEtapa={state.candidateStages[0].label} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </FloatingModal>

      <ConfirmDialog
        open={!!pending}
        title="Eliminar candidato"
        message={pending ? `¿Eliminar a ${pending.nombre} del proceso de selección?` : ""}
        onCancel={() => setPending(null)}
        onConfirm={() => {
          if (pending) dispatch({ type: "DELETE_CANDIDATE", stageLabel: pending.stageLabel, id: pending.id });
          setPending(null);
        }}
      />
    </div>
  );
}
