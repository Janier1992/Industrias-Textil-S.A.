"use client";

import type { ReactNode } from "react";

interface FloatingModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: number;
  zIndex?: number;
}

export function FloatingModal({
  open,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 520,
  zIndex = 50,
}: FloatingModalProps) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--overlay-blur, rgba(15, 23, 42, 0.45))",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        zIndex,
        animation: "modalFadeIn 0.2s ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: `min(${maxWidth}px, calc(100vw - 32px))`,
          maxHeight: "calc(100vh - 48px)",
          background: "var(--surface)",
          border: "1px solid var(--border-light)",
          borderRadius: 20,
          boxShadow: "0 25px 60px -15px oklch(0.15 0.02 230 / 0.35)",
          padding: "26px 28px",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          animation: "modalPopIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {(title || subtitle) && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              {title && <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{title}</div>}
              {subtitle && <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 }}>{subtitle}</div>}
            </div>
            <button
              onClick={onClose}
              style={{
                all: "unset",
                cursor: "pointer",
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "var(--bg)",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                lineHeight: 1,
                transition: "all 0.15s ease",
              }}
              title="Cerrar"
            >
              ×
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
