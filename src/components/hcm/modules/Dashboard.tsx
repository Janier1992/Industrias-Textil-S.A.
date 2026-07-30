"use client";

import { useMemo } from "react";
import { ESTADO_COLORS } from "@/lib/data";
import { buildDonut, countBy, formatMonto, parseMonto } from "@/lib/format";
import { useHcm } from "@/store/HcmStore";

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="card" style={{ padding: "20px 22px", ...style }}>
      {children}
    </div>
  );
}

export function Dashboard() {
  const { state } = useHcm();
  const { employees, payrollConcepts } = state;

  const execKpis = useMemo(() => {
    const payrollTotal = formatMonto(payrollConcepts.reduce((sum, c) => sum + parseMonto(c.monto), 0));
    return [
      { label: "Headcount total", value: String(employees.length), trend: "en vivo", trendColor: "var(--success)" },
      { label: "Rotación anual", value: "8.4%", trend: "-1.2pp vs. 2025", trendColor: "var(--success)" },
      { label: "Ausentismo mensual", value: "3.1%", trend: "+0.4pp vs. mes anterior", trendColor: "var(--secondary)" },
      { label: "Costo de nómina mensual", value: payrollTotal, trend: "en vivo", trendColor: "var(--success)" },
    ];
  }, [employees.length, payrollConcepts]);

  const plantBars = useMemo(() => {
    const groups = countBy(employees, (e) => e.planta);
    const max = Math.max(...Object.values(groups), 1);
    return Object.entries(groups).map(([label, value]) => ({ label, value, pct: Math.round((value / max) * 100) }));
  }, [employees]);

  const estadoDonut = useMemo(() => buildDonut(countBy(employees, (e) => e.estado), ESTADO_COLORS), [employees]);

  const turnoBars = useMemo(() => {
    const counts = countBy(employees, (e) => e.turno);
    const max = Math.max(...Object.values(counts), 1);
    return Object.entries(counts).map(([label, count]) => ({ label, count, pct: Math.round((count / max) * 100) }));
  }, [employees]);

  const payrollCompare = useMemo(() => {
    const devengado = payrollConcepts
      .filter((c) => c.tipo === "Devengado")
      .reduce((s, c) => s + parseMonto(c.monto), 0);
    const deduccion = Math.abs(
      payrollConcepts.filter((c) => c.tipo === "Deducción").reduce((s, c) => s + parseMonto(c.monto), 0),
    );
    const max = Math.max(devengado, deduccion, 1);
    return {
      devengado: formatMonto(devengado),
      deducciones: formatMonto(-deduccion),
      devengadoPct: Math.round((devengado / max) * 100),
      deduccionesPct: Math.round((deduccion / max) * 100),
    };
  }, [payrollConcepts]);

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 20px" }}>Dashboard Ejecutivo</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 18 }}>
        {execKpis.map((k) => (
          <Card key={k.label} style={{ padding: "16px 18px" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>{k.label}</div>
            <div className="mono" style={{ fontSize: 24, fontWeight: 600 }}>
              {k.value}
            </div>
            <div style={{ fontSize: 11.5, color: k.trendColor, marginTop: 4 }}>{k.trend}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 14 }}>
        <Card>
          <h2 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px" }}>Headcount por planta (en vivo)</h2>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20, height: 160 }}>
            {plantBars.map((p) => (
              <div
                key={p.label}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 8, flex: 1, height: "100%" }}
              >
                <div className="mono" style={{ fontSize: 12, fontWeight: 600 }}>
                  {p.value}
                </div>
                <div style={{ width: "100%", height: `${p.pct}%`, background: "var(--accent)", borderRadius: "6px 6px 0 0" }} />
                <div style={{ fontSize: 11.5, color: "var(--text-muted)", textAlign: "center" }}>{p.label}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px", alignSelf: "flex-start" }}>Rotación de personal</h2>
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: "conic-gradient(oklch(0.62 0.13 40) 0% 8.4%, oklch(0.93 0.006 85) 8.4% 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: "50%",
                background: "var(--surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div className="mono" style={{ fontSize: 20, fontWeight: 700 }}>
                8.4%
              </div>
              <div style={{ fontSize: 10.5, color: "var(--text-muted)" }}>anual</div>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 14 }}>
        <Card style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px", alignSelf: "flex-start" }}>Estado del personal</h2>
          <div style={{ width: 130, height: 130, borderRadius: "50%", background: estadoDonut.gradient, marginBottom: 14 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
            {estadoDonut.legend.map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: l.color, flexShrink: 0 }} />
                <span style={{ flex: 1, color: "var(--text-muted-2)" }}>{l.label}</span>
                <span className="mono" style={{ fontWeight: 600 }}>
                  {l.count}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px" }}>Distribución por turno</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {turnoBars.map((t) => (
              <div key={t.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 5 }}>
                  <span>{t.label}</span>
                  <span className="mono" style={{ fontWeight: 600 }}>
                    {t.count}
                  </span>
                </div>
                <div style={{ height: 10, background: "var(--border-light)", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${t.pct}%`, background: "var(--accent)", borderRadius: 6 }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px" }}>Devengado vs. Deducciones (ciclo actual)</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 5 }}>
              <span>Devengado</span>
              <span className="mono" style={{ fontWeight: 600 }}>
                {payrollCompare.devengado}
              </span>
            </div>
            <div style={{ height: 12, background: "var(--border-light)", borderRadius: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${payrollCompare.devengadoPct}%`, background: "var(--success)", borderRadius: 6 }} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 5 }}>
              <span>Deducciones</span>
              <span className="mono" style={{ fontWeight: 600 }}>
                {payrollCompare.deducciones}
              </span>
            </div>
            <div style={{ height: 12, background: "var(--border-light)", borderRadius: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${payrollCompare.deduccionesPct}%`, background: "var(--secondary)", borderRadius: 6 }} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
