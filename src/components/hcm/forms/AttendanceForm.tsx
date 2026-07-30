"use client";

import { useState } from "react";
import { ESTADOS_ASISTENCIA, TURNOS_ASISTENCIA } from "@/lib/data";
import type { EstadoAsistencia } from "@/lib/types";

export interface AttendanceDraft {
  nombre: string;
  turno: string;
  entrada: string;
  salida: string;
  estado: EstadoAsistencia;
}

const EMPTY: AttendanceDraft = { nombre: "", turno: TURNOS_ASISTENCIA[0], entrada: "", salida: "", estado: "A tiempo" };

interface AttendanceFormProps {
  initial?: AttendanceDraft;
  onSubmit: (draft: AttendanceDraft) => void;
  onCancel: () => void;
}

export function AttendanceForm({ initial, onSubmit, onCancel }: AttendanceFormProps) {
  const [draft, setDraft] = useState<AttendanceDraft>(initial ?? EMPTY);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof AttendanceDraft>(key: K, value: AttendanceDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function handleSubmit() {
    if (!draft.nombre.trim()) {
      setError("El nombre del colaborador es obligatorio.");
      return;
    }
    onSubmit({ ...draft, entrada: draft.entrada.trim() || "—", salida: draft.salida.trim() || "—" });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div className="field">
        <label>
          Colaborador
          <input className={error ? "has-error" : undefined} value={draft.nombre} onChange={(e) => set("nombre", e.target.value)} />
        </label>
        {error && <div className="field-error">{error}</div>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Turno
            <select value={draft.turno} onChange={(e) => set("turno", e.target.value)}>
              {TURNOS_ASISTENCIA.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Estado
            <select value={draft.estado} onChange={(e) => set("estado", e.target.value as EstadoAsistencia)}>
              {ESTADOS_ASISTENCIA.map((es) => (
                <option key={es}>{es}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Hora de entrada
            <input value={draft.entrada} placeholder="06:00" onChange={(e) => set("entrada", e.target.value)} />
          </label>
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Hora de salida
            <input value={draft.salida} placeholder="14:00" onChange={(e) => set("salida", e.target.value)} />
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
