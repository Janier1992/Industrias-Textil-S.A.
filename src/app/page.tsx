"use client";

import { useEffect, useState } from "react";
import { HcmApp } from "@/components/hcm/HcmApp";
import { LoginScreen } from "@/components/auth/LoginScreen";
import { HcmProvider } from "@/store/HcmStore";

const AUTH_KEY = "hcm_auth";

export default function Home() {
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(sessionStorage.getItem(AUTH_KEY) === "1");
    setChecked(true);
  }, []);

  function handleLoginSuccess() {
    sessionStorage.setItem(AUTH_KEY, "1");
    setAuthenticated(true);
  }

  if (!checked) return null;

  if (!authenticated) {
    return <LoginScreen onSuccess={handleLoginSuccess} />;
  }

  return (
    <HcmProvider>
      <HcmApp onLogout={() => {
        sessionStorage.removeItem(AUTH_KEY);
        setAuthenticated(false);
      }} />
    </HcmProvider>
  );
}
