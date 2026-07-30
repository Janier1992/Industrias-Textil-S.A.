"use client";

import { MODULE_LABELS } from "@/lib/data";
import { useHcm } from "@/store/HcmStore";

interface TopbarProps {
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export function Topbar({ sidebarCollapsed = false, onToggleSidebar }: TopbarProps) {
  const { state } = useHcm();

  return (
    <header
      className="no-print"
      style={{
        height: 56,
        flexShrink: 0,
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* Toggle Sidebar Button (Desktop/Tablet) */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="hidden md:flex"
            style={{
              all: "unset",
              cursor: "pointer",
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "var(--bg)",
              border: "1px solid var(--border-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              transition: "all 0.15s ease",
            }}
            title={sidebarCollapsed ? "Expandir menú lateral" : "Contraer menú lateral"}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: sidebarCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
              <path d="m14 9 3 3-3 3" />
            </svg>
          </button>
        )}

        <div style={{ fontSize: 13.5, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          <span className="hide-on-mobile">Industrias Textil <span style={{ margin: "0 6px" }}>/</span> </span>
          <span style={{ color: "var(--text)", fontWeight: 700 }}>{MODULE_LABELS[state.activeModule]}</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          className="mono hide-on-mobile"
          style={{
            fontSize: 11.5,
            color: "var(--text-muted)",
            background: "var(--bg)",
            border: "1px solid var(--border-light)",
            padding: "5px 12px",
            borderRadius: 8,
          }}
        >
          Empresa: Industrias Textil S.A. · Sede: Bogotá
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent) 0%, oklch(0.4 0.12 210) 100%)",
            color: "white",
            fontSize: 12,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 6px oklch(0.47 0.09 200 / 0.3)",
          }}
        >
          RH
        </div>
      </div>
    </header>
  );
}
