"use client";

import { useMemo, useState } from "react";
import { AUXILIO_TRANSPORTE } from "@/lib/data";
import { formatMonto, nextId, parseMonto } from "@/lib/format";
import type { PayrollConcept } from "@/lib/types";
import { useHcm } from "@/store/HcmStore";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { FloatingModal } from "../ui/FloatingModal";
import { PayrollForm, type PayrollDraft } from "../forms/PayrollForm";

const COLUMNS = "2fr 1fr 1fr 1fr";

export function Nomina() {
  const { state, dispatch } = useHcm();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<PayrollConcept | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [reciboEmployeeId, setReciboEmployeeId] = useState<string>("");

  const isProcesado = state.payrollStatus === "procesado";
  const payrollTotal = formatMonto(state.payrollConcepts.reduce((sum, c) => sum + parseMonto(c.monto), 0));

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(c: PayrollConcept) {
    setEditing(c);
    setFormOpen(true);
  }
  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  function handleSubmit(draft: PayrollDraft) {
    if (editing) {
      dispatch({ type: "UPDATE_PAYROLL", concept: { ...editing, ...draft } });
    } else {
      dispatch({ type: "ADD_PAYROLL", concept: { id: nextId("pay"), ...draft } });
    }
    closeForm();
  }

  const pendingConcept = state.payrollConcepts.find((c) => c.id === pendingDeleteId);

  const recibo = useMemo(() => {
    const emp = state.employees.find((e) => e.id === reciboEmployeeId);
    if (!emp) return null;
    const base = parseMonto(emp.salario);
    const salud = Math.round(base * 0.04);
    const pension = Math.round(base * 0.04);
    const neto = base + AUXILIO_TRANSPORTE - salud - pension;
    return {
      nombre: emp.nombre,
      cargo: emp.cargo,
      planta: emp.planta,
      base: formatMonto(base),
      aux: formatMonto(AUXILIO_TRANSPORTE),
      salud: formatMonto(-salud),
      pension: formatMonto(-pension),
      neto: formatMonto(neto),
    };
  }, [reciboEmployeeId, state.employees]);

  return (
    <div style={{ maxWidth: 900 }}>
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Nómina · Julio 2026</h1>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn btn-secondary" onClick={openCreate}>
            + Nuevo concepto
          </button>
          <button className="btn btn-primary" onClick={() => dispatch({ type: "TOGGLE_PAYROLL_STATUS" })}>
            {isProcesado ? "Reabrir ciclo" : "Procesar nómina"}
          </button>
        </div>
      </div>

      <div
        className="card no-print"
        style={{ padding: "18px 22px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}
      >
        <div style={{ fontSize: 13.5 }}>Estado del ciclo de nómina</div>
        <span
          className="badge"
          style={{
            background: isProcesado ? "var(--success-bg)" : "var(--warning-bg)",
            color: isProcesado ? "var(--success-text)" : "var(--warning-text)",
          }}
        >
          {isProcesado ? "Procesado" : "Pendiente de aprobación"}
        </span>
      </div>

      <div className="card no-print table-responsive" style={{ marginBottom: 24 }}>
        <div style={{ minWidth: 520 }}>
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
            <div>Concepto</div>
            <div>Tipo</div>
            <div style={{ textAlign: "right" }}>Monto total</div>
            <div style={{ textAlign: "right" }}>Acciones</div>
          </div>
          {state.payrollConcepts.map((c) => (
            <div
              key={c.id}
              style={{
                display: "grid",
                gridTemplateColumns: COLUMNS,
                padding: "12px 20px",
                fontSize: 13.5,
                borderBottom: "1px solid var(--border-lighter)",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: 500 }}>{c.concepto}</div>
              <div style={{ color: "var(--text-muted)" }}>{c.tipo}</div>
              <div className="mono" style={{ textAlign: "right" }}>
                {c.monto}
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button className="link-btn link-edit" onClick={() => openEdit(c)}>
                  Editar
                </button>
                <button className="link-btn link-delete" onClick={() => setPendingDeleteId(c.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: COLUMNS, padding: "14px 20px", fontSize: 14, fontWeight: 700, background: "var(--bg)" }}>
            <div>Total nómina</div>
            <div />
            <div className="mono" style={{ textAlign: "right" }}>
              {payrollTotal}
            </div>
            <div />
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: "22px 24px" }}>
        <h2 className="no-print" style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>
          Recibo de pago por empleado
        </h2>
        <p className="no-print" style={{ fontSize: 12.5, color: "var(--text-muted)", margin: "0 0 16px" }}>
          Filtra por colaborador para ver y descargar su recibo del ciclo actual.
        </p>
        <select
          className="no-print"
          value={reciboEmployeeId}
          onChange={(e) => setReciboEmployeeId(e.target.value)}
          style={{
            width: "100%",
            maxWidth: 340,
            padding: "10px 12px",
            border: "1px solid oklch(0.85 0.01 85)",
            borderRadius: 8,
            fontSize: 13.5,
            marginBottom: 18,
          }}
        >
          <option value="">Selecciona un colaborador…</option>
          {state.employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>

        {recibo && (
          <div className="print-area" style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "20px 22px", maxWidth: 420, width: "100%" }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{recibo.nombre}</div>
            <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginBottom: 16 }}>
              {recibo.cargo} · {recibo.planta}
            </div>
            <PayslipRow label="Salario básico" value={recibo.base} />
            <PayslipRow label="Auxilio de transporte" value={recibo.aux} />
            <PayslipRow label="Salud (empleado)" value={recibo.salud} />
            <PayslipRow label="Pensión (empleado)" value={recibo.pension} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5, fontWeight: 700, padding: "10px 0 0", borderTop: "1px solid var(--border)", marginTop: 6 }}>
              <span>Neto a pagar</span>
              <span className="mono">{recibo.neto}</span>
            </div>
            <button className="btn btn-primary no-print" style={{ display: "block", width: "100%", marginTop: 18 }} onClick={() => window.print()}>
              Imprimir recibo
            </button>
          </div>
        )}
      </div>

      <FloatingModal
        open={formOpen}
        onClose={closeForm}
        title={editing ? "Editar concepto salarial" : "Nuevo concepto salarial"}
        subtitle="Agrega un concepto devengado o de deducción al ciclo actual."
        maxWidth={460}
      >
        <PayrollForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={closeForm} />
      </FloatingModal>

      <ConfirmDialog
        open={!!pendingDeleteId}
        title="Eliminar concepto"
        message={pendingConcept ? `¿Eliminar el concepto "${pendingConcept.concepto}" del ciclo actual?` : ""}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) dispatch({ type: "DELETE_PAYROLL", id: pendingDeleteId });
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
}

function PayslipRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderTop: "1px solid var(--border-light)" }}>
      <span style={{ color: "var(--text-muted)" }}>{label}</span>
      <span className="mono">{value}</span>
    </div>
  );
}
