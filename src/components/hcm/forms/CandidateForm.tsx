"use client";

import { useState } from "react";
import { ETAPAS_RECLUTAMIENTO } from "@/lib/data";

export interface CandidateDraft {
  nombre: string;
  etapa: string;
  fecha: string;
}

interface CandidateFormProps {
  defaultEtapa: string;
  onSubmit: (draft: CandidateDraft) => void;
  onCancel: () => void;
}

export function CandidateForm({ defaultEtapa, onSubmit, onCancel }: CandidateFormProps) {
  const [draft, setDraft] = useState<CandidateDraft>({ nombre: "", etapa: defaultEtapa, fecha: "" });
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    if (!draft.nombre.trim()) {
      setError("El nombre del candidato es obligatorio.");
      return;
    }
    onSubmit({ ...draft, fecha: draft.fecha.trim() || "Hoy" });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div className="field">
        <label>
          Nombre del candidato
          <input className={error ? "has-error" : undefined} value={draft.nombre} onChange={(e) => setDraft((d) => ({ ...d, nombre: e.target.value }))} />
        </label>
        {error && <div className="field-error">{error}</div>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Etapa del proceso
            <select value={draft.etapa} onChange={(e) => setDraft((d) => ({ ...d, etapa: e.target.value }))}>
              {ETAPAS_RECLUTAMIENTO.map((et) => (
                <option key={et}>{et}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Fecha
            <input value={draft.fecha} placeholder="29 jul" onChange={(e) => setDraft((d) => ({ ...d, fecha: e.target.value }))} />
          </label>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onCancel}>
          Cancelar
        </button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>
          Guardar
        </button>
      </div>
    </div>
  );
}
