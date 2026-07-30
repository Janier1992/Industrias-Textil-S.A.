"use client";

import { useState } from "react";
import { PLANTAS, TURNOS } from "@/lib/data";
import type { EstadoEmpleado } from "@/lib/types";

export interface EmployeeDraft {
  nombre: string;
  cargo: string;
  planta: string;
  turno: string;
  salario: string;
  email: string;
  estado: EstadoEmpleado;
}

const EMPTY: EmployeeDraft = {
  nombre: "",
  cargo: "",
  planta: PLANTAS[0],
  turno: TURNOS[0],
  salario: "",
  email: "",
  estado: "Activo",
};

interface EmployeeFormProps {
  initial?: EmployeeDraft;
  onSubmit: (draft: EmployeeDraft) => void;
  onCancel: () => void;
}

export function EmployeeForm({ initial, onSubmit, onCancel }: EmployeeFormProps) {
  const [draft, setDraft] = useState<EmployeeDraft>(initial ?? EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeDraft, string>>>({});

  function set<K extends keyof EmployeeDraft>(key: K, value: EmployeeDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof EmployeeDraft, string>> = {};
    if (!draft.nombre.trim()) next.nombre = "El nombre es obligatorio.";
    if (!draft.cargo.trim()) next.cargo = "El cargo es obligatorio.";
    if (!draft.salario.trim()) next.salario = "El salario base es obligatorio.";
    else if (!/^\$?[\d.,]+$/.test(draft.salario.trim())) next.salario = "Usa un formato numérico, p. ej. $1.423.500.";
    if (draft.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email))
      next.email = "Correo electrónico no válido.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSubmit(draft);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div className="section-label">DATOS PERSONALES</div>
      <div className="field">
        <label>
          Nombre completo
          <input
            className={errors.nombre ? "has-error" : undefined}
            value={draft.nombre}
            onChange={(e) => set("nombre", e.target.value)}
          />
        </label>
        {errors.nombre && <div className="field-error">{errors.nombre}</div>}
      </div>
      <div className="field">
        <label>
          Correo electrónico
          <input
            className={errors.email ? "has-error" : undefined}
            value={draft.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </label>
        {errors.email && <div className="field-error">{errors.email}</div>}
      </div>

      <div className="section-label">DATOS LABORALES</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Cargo
            <input
              className={errors.cargo ? "has-error" : undefined}
              value={draft.cargo}
              onChange={(e) => set("cargo", e.target.value)}
            />
          </label>
          {errors.cargo && <div className="field-error">{errors.cargo}</div>}
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Planta
            <select value={draft.planta} onChange={(e) => set("planta", e.target.value)}>
              {PLANTAS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Turno
            <select value={draft.turno} onChange={(e) => set("turno", e.target.value)}>
              {TURNOS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label>
            Estado
            <select value={draft.estado} onChange={(e) => set("estado", e.target.value as EstadoEmpleado)}>
              <option>Activo</option>
              <option>Vacaciones</option>
              <option>Incapacidad</option>
            </select>
          </label>
        </div>
      </div>

      <div className="section-label">COMPENSACIÓN</div>
      <div className="field">
        <label>
          Salario base
          <input
            className={errors.salario ? "has-error" : undefined}
            value={draft.salario}
            placeholder="$1.423.500"
            onChange={(e) => set("salario", e.target.value)}
          />
        </label>
        {errors.salario && <div className="field-error">{errors.salario}</div>}
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
