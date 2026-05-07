"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimateIn } from "@/components/ui/animate-in";

const planes = [
  {
    name: "Básico",
    price: "$XX",
    showMes: true,
    desc: "Para agentes que están empezando a automatizar.",
    features: ["Hasta 100 leads/mes", "Respuesta automática 24/7", "Calificación básica", "Soporte por email"],
    cta: "Empezar",
    highlight: false,
  },
  {
    name: "Profesional",
    price: "$XX",
    showMes: true,
    desc: "El plan preferido por agentes activos.",
    features: ["Leads ilimitados", "Calificación avanzada con IA", "Agendamiento automático", "Integración Google Calendar", "Soporte prioritario"],
    cta: "Empezar",
    highlight: true,
    badge: "Más elegido",
  },
  {
    name: "Enterprise",
    price: "A consultar",
    showMes: false,
    desc: "Para inmobiliarias con equipo de agentes.",
    features: ["Todo lo de Profesional", "Múltiples agentes", "Dashboard de equipo", "Onboarding personalizado", "SLA garantizado"],
    cta: "Contactar",
    highlight: false,
  },
];

function scrollToContact(e: React.MouseEvent) {
  e.preventDefault();
  document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function Precios() {
  const [hovered, setHovered] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Pre-scroll para que Profesional (index 1) aparezca centrado al cargar
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    // Centra la 2ª card: (card 280 + gap 16) × 1 = 296
    // Le restamos el offset de peeking (px-8 = 32px) para que quede centrada
    el.scrollLeft = 260 + 16;
  }, []);

  return (
    // Sin px en mobile — el carrusel toma el full width
    // min-h solo en desktop para no empujar el carrusel hacia abajo en mobile
    <section id="precios" className="py-10 md:py-32 md:px-20 md:min-h-[80vh] flex flex-col justify-center">

      {/* Título — propio padding en mobile */}
      <div className="px-6 md:px-0">
        <div className="max-w-6xl md:mx-auto">
          <AnimateIn className="text-center mb-8 md:mb-16">
            <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">Planes</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
              Simple y transparente
            </h2>
            <p className="text-zinc-400 text-lg max-w-md mx-auto">
              Sin sorpresas. Cancelá cuando quieras.
            </p>
          </AnimateIn>
        </div>
      </div>

      {/* ── MOBILE: carrusel ── */}
      {/*
        overflow-x-auto + overflow-y-visible: el badge posicionado en -top-3.5
        necesita que el eje Y no esté recortado. No se puede mezclar overflow-x
        con overflow-y visible en el mismo elemento (CSS lo fuerza a hidden), así
        que usamos un wrapper externo que da el pt-6 y un inner que hace el scroll.
      */}
      <div className="md:hidden w-full pt-6">
        <div
          ref={carouselRef}
          className="w-full overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-4 w-max px-8">
            {planes.map((p, i) => (
              <motion.div
                key={i}
                  className="w-[70vw] max-w-[260px] flex-shrink-0 snap-center relative flex flex-col rounded-2xl p-5 pt-7 mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: p.highlight ? "rgba(99,102,241,0.09)" : "#111111",
                  border: `1px solid ${p.highlight ? "rgba(99,102,241,0.55)" : "rgba(255,255,255,0.07)"}`,
                  boxShadow: p.highlight
                    ? "0 0 28px rgba(120,119,219,0.30), 0 0 0 1px rgba(99,102,241,0.4)"
                    : "none",
                }}
              >
                {/* Badge */}
                {p.badge && (
                  <span
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wide whitespace-nowrap"
                    style={{
                      background: "linear-gradient(90deg, #5A67D8, #818CF8)",
                      boxShadow: "0 0 14px rgba(90,103,216,0.55)",
                    }}
                  >
                    {p.badge}
                  </span>
                )}

                <h3 className="text-base font-bold text-white mb-1">{p.name}</h3>
                <p className="text-zinc-500 text-xs mb-3 leading-snug">{p.desc}</p>

                <div className="flex items-end gap-1.5 mb-4">
                  <span className="text-2xl font-extrabold text-white leading-none">{p.price}</span>
                  {p.showMes && <span className="text-zinc-500 text-xs mb-0.5">/mes</span>}
                </div>

                <ul className="space-y-2 flex-grow mb-5">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-[13px] text-[#d1d5db]">
                      <svg
                        className="text-indigo-400 mt-0.5 flex-shrink-0"
                        width="12" height="12" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  onClick={scrollToContact}
                  className="w-full text-center py-3 rounded-xl font-semibold text-sm"
                  style={p.highlight
                    ? {
                        background: "linear-gradient(90deg, #5A67D8, #818CF8)",
                        color: "white",
                        boxShadow: "0 0 16px rgba(99,102,241,0.4)",
                      }
                    : {
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "white",
                        background: "transparent",
                      }
                  }
                >
                  {p.cta}
                </a>
              </motion.div>
            ))}
            {/* Spacer final */}
            <div className="w-4 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* ── DESKTOP: grid de 3 columnas ── */}
      <div
        className="hidden md:block max-w-6xl mx-auto"
        onMouseLeave={() => setHovered(null)}
      >
        <div className="grid grid-cols-3 gap-5 items-stretch">
          {planes.map((p, i) => {
            const isHovered = hovered === i;

            const boxShadow = isHovered
              ? p.highlight
                ? "0 0 0 2px rgba(99,102,241,0.85), 0 20px 56px rgba(99,102,241,0.28)"
                : "0 0 0 1px rgba(200,200,220,0.28), 0 14px 40px rgba(150,150,180,0.14)"
              : p.highlight
                ? "0 0 0 1px rgba(99,102,241,0.5)"
                : "none";

            return (
              <AnimateIn key={i} delay={i * 0.1} className="h-full">
                <motion.div
                  className="relative flex flex-col h-full rounded-2xl p-8"
                  onMouseEnter={() => setHovered(i)}
                  animate={{
                    y: isHovered ? (p.highlight ? -6 : -4) : 0,
                    scale: isHovered ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  style={{
                    background: p.highlight ? "rgba(99,102,241,0.09)" : "#111111",
                    border: "1px solid transparent",
                    boxShadow,
                    borderRadius: "1rem",
                    transition: "box-shadow 280ms ease-out, background 280ms ease-out",
                  }}
                >
                  {p.badge && (
                    <span
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wide whitespace-nowrap"
                      style={{
                        background: "linear-gradient(90deg, #5A67D8, #818CF8)",
                        boxShadow: "0 0 14px rgba(90,103,216,0.55)",
                      }}
                    >
                      {p.badge}
                    </span>
                  )}

                  <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-zinc-500 text-sm min-h-[2.5rem] mb-5 leading-snug">{p.desc}</p>

                  <div className="flex items-end gap-1.5 mb-6">
                    <span className="text-4xl font-extrabold text-white leading-none">{p.price}</span>
                    {p.showMes && <span className="text-zinc-500 text-sm mb-0.5">/mes</span>}
                  </div>

                  <ul className="space-y-3 flex-grow mb-8">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[15px] text-[#d1d5db]">
                        <svg
                          className="text-indigo-400 mt-0.5 flex-shrink-0"
                          width="15" height="15" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2.5"
                          strokeLinecap="round" strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contacto"
                    onClick={scrollToContact}
                    className="w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                    style={p.highlight
                      ? {
                          background: "linear-gradient(90deg, #5A67D8, #818CF8)",
                          color: "white",
                          boxShadow: isHovered ? "0 0 20px rgba(99,102,241,0.5)" : "none",
                          transition: "box-shadow 280ms ease-out",
                        }
                      : {
                          border: `1px solid ${isHovered ? "rgba(200,200,220,0.3)" : "rgba(255,255,255,0.1)"}`,
                          color: "white",
                          background: isHovered ? "rgba(255,255,255,0.04)" : "transparent",
                          transition: "border-color 280ms ease-out, background 280ms ease-out",
                        }
                    }
                  >
                    {p.cta}
                  </a>
                </motion.div>
              </AnimateIn>
            );
          })}
        </div>
      </div>

    </section>
  );
}
