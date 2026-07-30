"use client";

import { NAV } from "@/lib/data";
import { useHcm } from "@/store/HcmStore";

export function BottomNav() {
  const { state, dispatch } = useHcm();

  return (
    <div
      className="md:hidden no-print"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        background: "var(--sidebar-bg)",
        borderTop: "1px solid var(--sidebar-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 4px",
        zIndex: 40,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
      }}
    >
      {NAV.map((item) => {
        const active = state.activeModule === item.id;
        return (
          <button
            key={item.id}
            onClick={() => dispatch({ type: "SELECT_MODULE", module: item.id })}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              flex: 1,
              height: "100%",
              padding: "4px 0",
              color: active ? "white" : "var(--sidebar-muted)",
              transition: "all 0.15s ease",
            }}
          >
            <span
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                background: active ? item.color : "transparent",
                color: "white",
                fontSize: 12,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.15s ease",
                transform: active ? "scale(1.1)" : "scale(1)",
              }}
            >
              {item.glyph}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                letterSpacing: "-0.01em",
                opacity: active ? 1 : 0.75,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 60,
              }}
            >
              {item.label.split(" ")[0]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
