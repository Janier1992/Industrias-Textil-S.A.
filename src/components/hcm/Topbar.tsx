"use client";

import { MODULE_LABELS } from "@/lib/data";
import { useHcm } from "@/store/HcmStore";

export function Topbar() {
  const { state } = useHcm();

  return (
    <div
      className="no-print"
      style={{
        height: 56,
        flexShrink: 0,
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
        Industrias Textil <span style={{ margin: "0 6px" }}>/</span>{" "}
        <span style={{ color: "var(--text)", fontWeight: 600 }}>{MODULE_LABELS[state.activeModule]}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          className="mono"
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            background: "var(--bg)",
            padding: "5px 10px",
            borderRadius: 6,
          }}
        >
          Empresa: Industrias Textil S.A. · Sede: Bogotá
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--accent)",
            color: "white",
            fontSize: 12,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          RH
        </div>
      </div>
    </div>
  );
}
