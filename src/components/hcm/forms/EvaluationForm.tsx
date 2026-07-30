"use client";

import { useState } from "react";
import type { Competencia } from "@/lib/types";

export interface EvaluationDraft {
  nombre: string;
  cargo: string;
  puntaje: string;
  competencias: [Competencia, Competencia, Competencia];
}

const EMPTY: EvaluationDraft = {
  nombre: "",
  cargo: "",
  puntaje: "4.0",
  competencias: [
    { nombre: "Calidad de trabajo", valor: 85 },
    { nombre: "Puntualidad", valor: 85 },
    { nombre: "Trabajo en equipo", valor: 85 },
  ],
};

interface EvaluationFormProps {
  initial?: EvaluationDraft;
  onSubmit: (draft: EvaluationDraft) => void;
  onCancel: () => void;
}

export function EvaluationForm({ initial, onSubmit, onCancel }: EvaluationFormProps) {
  const [draft, setDraft] = useState<EvaluationDraft>(initial ?? EMPTY);
  const [errors, setErrors] = useState<{ nombre?: string; cargo?: string; puntaje?: string }>({});

  function set<K extends keyof EvaluationDraft>(key: K, value: EvaluationDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function setCompetencia(idx: 0 | 1 | 2, field: keyof Competencia, value: string) {
    setDraft((d) => {
      const competencias = [...d.competencias] as EvaluationDraft["competencias"];
      competencias[idx] = { ...competencias[idx], [field]: field === "valor" ? Number(value) || 0 : value };
      return { ...d, competencias };
    });
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (!draft.nombre.trim()) next.nombre = "El nombre es obligatorio.";
    if (!draft.cargo.trim()) next.cargo = "El cargo es obligatorio.";
    const score = Number(draft.puntaje);
    if (!draft.puntaje.trim() || Number.isNaN(score) || score < 0 || score > 5)
      next.puntaje = "Ingresa un puntaje entre 0 y 5.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSubmit(draft);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Colaborador
            <input className={errors.nombre ? "has-error" : undefined} value={draft.nombre} onChange={(e) => set("nombre", e.target.value)} />
          </label>
          {errors.nombre && <div className="field-error">{errors.nombre}</div>}
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Cargo
            <input className={errors.cargo ? "has-error" : undefined} value={draft.cargo} onChange={(e) => set("cargo", e.target.value)} />
          </label>
          {errors.cargo && <div className="field-error">{errors.cargo}</div>}
        </div>
      </div>
      <div className="field">
        <label>
          Puntaje global (0-5)
          <input className={errors.puntaje ? "has-error" : undefined} value={draft.puntaje} placeholder="4.5" onChange={(e) => set("puntaje", e.target.value)} />
        </label>
        {errors.puntaje && <div className="field-error">{errors.puntaje}</div>}
      </div>

      <div className="section-label">COMPETENCIAS</div>
      {draft.competencias.map((comp, idx) => (
        <div key={idx} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 12, marginBottom: 10 }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label style={{ fontSize: 11.5 }}>
              Nombre de la competencia
              <input value={comp.nombre} onChange={(e) => setCompetencia(idx as 0 | 1 | 2, "nombre", e.target.value)} />
            </label>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label style={{ fontSize: 11.5 }}>
              Valor (%)
              <input value={String(comp.valor)} placeholder="90" onChange={(e) => setCompetencia(idx as 0 | 1 | 2, "valor", e.target.value)} />
            </label>
          </div>
        </div>
      ))}

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
