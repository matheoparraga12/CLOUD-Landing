"use client";

import { useEffect } from "react";

export function ScrollReset() {
  useEffect(() => {
    // Deshabilita la restauración automática de scroll del navegador
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Si hay un hash en la URL al cargar, lo limpia y fuerza scroll al inicio
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
