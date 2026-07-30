"use client";

import { NAV } from "@/lib/data";
import { useHcm } from "@/store/HcmStore";

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const { state, dispatch } = useHcm();

  return (
    <aside
      className="sidebar-desktop no-print"
      style={{
        width: collapsed ? 72 : 248,
        flexShrink: 0,
        background: "var(--sidebar-bg)",
        color: "var(--sidebar-text)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "width 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
        overflow: "hidden",
        position: "relative",
        zIndex: 20,
        borderRight: "1px solid var(--sidebar-border)",
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: collapsed ? "20px 0" : "22px 20px 18px",
          borderBottom: "1px solid var(--sidebar-border)",
          display: "flex",
          flexDirection: "column",
          alignItems: collapsed ? "center" : "flex-start",
          justifyContent: "center",
          transition: "padding 0.2s ease",
        }}
      >
        {!collapsed ? (
          <>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "oklch(0.65 0.04 200)", fontWeight: 600 }}>
              INDUSTRIAS TEXTIL
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, marginTop: 2, letterSpacing: "-0.01em" }}>Sistema RR.HH</div>
          </>
        ) : (
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: "var(--accent)",
              color: "white",
              fontSize: 13,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Industrias Textil · Sistema RR.HH"
          >
            IT
          </div>
        )}
      </div>

      {/* Section Label */}
      {!collapsed && (
        <div style={{ padding: "16px 16px 6px", fontSize: 10, letterSpacing: "0.1em", color: "var(--sidebar-muted)", fontWeight: 700 }}>
          MÓDULOS
        </div>
      )}

      {/* Nav List */}
      <nav style={{ padding: collapsed ? "12px 8px" : "10px 10px", flex: 1, overflowY: "auto" }}>
        {NAV.map((item) => {
          const active = state.activeModule === item.id;
          return (
            <button
              key={item.id}
              className="nav-item"
              title={collapsed ? item.label : undefined}
              style={{
                background: active ? "var(--sidebar-active)" : "transparent",
                justifyContent: collapsed ? "center" : "flex-start",
                padding: collapsed ? "10px 0" : "9px 12px",
                borderRadius: 10,
                position: "relative",
              }}
              onClick={() => dispatch({ type: "SELECT_MODULE", module: item.id })}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 7,
                  background: item.color,
                  color: "white",
                  fontSize: 11,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: active ? "0 2px 8px rgba(0,0,0,0.25)" : "none",
                }}
              >
                {item.glyph}
              </span>

              {!collapsed && (
                <span
                  style={{
                    opacity: active ? 1 : 0.85,
                    fontWeight: active ? 600 : 400,
                    fontSize: 13.5,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.label}
                </span>
              )}

              {active && collapsed && (
                <span
                  style={{
                    position: "absolute",
                    left: 2,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 4,
                    height: 18,
                    borderRadius: 2,
                    background: "var(--accent)",
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div
        style={{
          padding: collapsed ? "14px 0" : "14px 16px",
          borderTop: "1px solid var(--sidebar-border)",
          fontSize: 11,
          color: "var(--sidebar-muted-2)",
          textAlign: collapsed ? "center" : "left",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {!collapsed ? "Planta Bogotá · Multisede activa" : "BOG"}
      </div>
    </aside>
  );
}
