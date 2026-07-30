"use client";

import type { ReactNode } from "react";

interface SlideOverProps {
  open: boolean;
  onClose: () => void;
  width?: number;
  children: ReactNode;
  zIndex?: number;
}

export function SlideOver({ open, onClose, width = 400, children, zIndex = 20 }: SlideOverProps) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--overlay)",
        display: "flex",
        justifyContent: "flex-end",
        zIndex,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          height: "100%",
          background: "var(--surface)",
          boxShadow: "var(--drawer-shadow)",
          padding: "28px 26px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
}
