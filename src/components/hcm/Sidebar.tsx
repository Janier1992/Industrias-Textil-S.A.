"use client";

import { NAV } from "@/lib/data";
import { useHcm } from "@/store/HcmStore";

export function Sidebar() {
  const { state, dispatch } = useHcm();

  return (
    <div
      style={{
        width: 248,
        flexShrink: 0,
        background: "var(--sidebar-bg)",
        color: "var(--sidebar-text)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid var(--sidebar-border)" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "oklch(0.6 0.03 200)", fontWeight: 600 }}>
          INDUSTRIAS TEXTIL
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, marginTop: 2 }}>ERP · HCM</div>
      </div>

      <div style={{ padding: "16px 12px 4px", fontSize: 10, letterSpacing: "0.1em", color: "var(--sidebar-muted)", fontWeight: 600 }}>
        MÓDULOS
      </div>

      <nav style={{ padding: "0 10px", flex: 1, overflowY: "auto" }}>
        {NAV.map((item) => {
          const active = state.activeModule === item.id;
          return (
            <button
              key={item.id}
              className="nav-item"
              style={{ background: active ? "var(--sidebar-active)" : "transparent" }}
              onClick={() => dispatch({ type: "SELECT_MODULE", module: item.id })}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: item.color,
                  color: "white",
                  fontSize: 11,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {item.glyph}
              </span>
              <span style={{ opacity: active ? 1 : 0.85 }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "14px 16px", borderTop: "1px solid var(--sidebar-border)", fontSize: 11.5, color: "var(--sidebar-muted-2)" }}>
        Planta Bogotá · Multisede activa
      </div>
    </div>
  );
}
