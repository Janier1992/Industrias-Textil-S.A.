"use client";

import { useState } from "react";
import type { TipoConcepto } from "@/lib/types";

export interface PayrollDraft {
  concepto: string;
  tipo: TipoConcepto;
  monto: string;
}

const EMPTY: PayrollDraft = { concepto: "", tipo: "Devengado", monto: "" };

interface PayrollFormProps {
  initial?: PayrollDraft;
  onSubmit: (draft: PayrollDraft) => void;
  onCancel: () => void;
}

export function PayrollForm({ initial, onSubmit, onCancel }: PayrollFormProps) {
  const [draft, setDraft] = useState<PayrollDraft>(initial ?? EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof PayrollDraft, string>>>({});

  function set<K extends keyof PayrollDraft>(key: K, value: PayrollDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof PayrollDraft, string>> = {};
    if (!draft.concepto.trim()) next.concepto = "El concepto es obligatorio.";
    if (!draft.monto.trim()) next.monto = "El monto es obligatorio.";
    else if (!/^-?\$?[\d.,]+$/.test(draft.monto.trim())) next.monto = "Usa un formato numérico, p. ej. $500.000.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    const monto = draft.monto.trim();
    const signed = draft.tipo === "Deducción" && !monto.startsWith("-") ? `-${monto}` : monto;
    onSubmit({ ...draft, monto: signed });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div className="field">
        <label>
          Concepto
          <input
            className={errors.concepto ? "has-error" : undefined}
            value={draft.concepto}
            onChange={(e) => set("concepto", e.target.value)}
          />
        </label>
        {errors.concepto && <div className="field-error">{errors.concepto}</div>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Tipo
            <select value={draft.tipo} onChange={(e) => set("tipo", e.target.value as TipoConcepto)}>
              <option>Devengado</option>
              <option>Deducción</option>
            </select>
          </label>
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Monto total
            <input
              className={errors.monto ? "has-error" : undefined}
              value={draft.monto}
              placeholder="$500.000"
              onChange={(e) => set("monto", e.target.value)}
            />
          </label>
          {errors.monto && <div className="field-error">{errors.monto}</div>}
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
