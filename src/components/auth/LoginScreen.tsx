"use client";

import { useState, type FormEvent } from "react";

const VALID_USER = "administrador1";
const VALID_PASS = "123456";

interface LoginScreenProps {
  onSuccess: () => void;
}

export function LoginScreen({ onSuccess }: LoginScreenProps) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    window.setTimeout(() => {
      if (usuario.trim() === VALID_USER && clave === VALID_PASS) {
        onSuccess();
      } else {
        setError("Usuario o contraseña incorrectos.");
        setLoading(false);
      }
    }, 300);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 20% 20%, oklch(0.22 0.03 230) 0%, oklch(0.14 0.015 230) 55%, oklch(0.1 0.01 230) 100%)",
        padding: 16,
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: 380,
          padding: "32px 30px",
          background: "var(--surface)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 26 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "linear-gradient(135deg, var(--accent) 0%, oklch(0.4 0.12 210) 100%)",
              color: "white",
              fontSize: 18,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px oklch(0.47 0.09 200 / 0.35)",
              marginBottom: 14,
            }}
          >
            IT
          </div>
          <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--text-muted)", fontWeight: 600 }}>
            INDUSTRIAS TEXTIL
          </div>
          <div style={{ fontSize: 19, fontWeight: 700, marginTop: 2, color: "var(--text)" }}>
            Sistema RR.HH
          </div>
          <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 6 }}>
            Inicia sesión para continuar
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="login-usuario">Usuario</label>
            <input
              id="login-usuario"
              type="text"
              autoComplete="username"
              autoFocus
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingresa tu usuario"
              disabled={loading}
            />
          </div>

          <div className="field" style={{ marginTop: 4 }}>
            <label htmlFor="login-clave">Contraseña</label>
            <input
              id="login-clave"
              type="password"
              autoComplete="current-password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="Ingresa tu contraseña"
              disabled={loading}
            />
          </div>

          {error && (
            <div
              style={{
                marginTop: 4,
                marginBottom: 4,
                padding: "8px 12px",
                borderRadius: 8,
                background: "var(--danger-bg)",
                color: "var(--danger-text)",
                fontSize: 12.5,
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: "100%", marginTop: 18, padding: "11px 16px", fontSize: 14 }}
          >
            {loading ? "Verificando…" : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
