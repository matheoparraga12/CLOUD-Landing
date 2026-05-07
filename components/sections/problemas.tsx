"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const problemas = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    tag: "Problema 01",
    title: "Respuesta lenta",
    desc: "Un cliente pierde interés si no recibe respuesta en minutos. Cada demora es una venta directa para tu competencia.",
    solution: "REAS responde en segundos, siempre.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="23" y1="11" x2="17" y2="11" /><line x1="20" y1="8" x2="20" y2="14" />
      </svg>
    ),
    tag: "Problema 02",
    title: "Leads sin atender",
    desc: "Los prospectos no respetan los horarios de tu agenda. Mientras mostrás una propiedad o descansás, perdés ventas.",
    solution: "REAS califica leads mientras vos no estás.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    tag: "Problema 03",
    title: "Caos en WhatsApp",
    desc: "Mensajes perdidos, datos dispersos y foco manual. Escalar tu volumen de contactos así es insostenible.",
    solution: "REAS filtra, organiza y agenda tus leads.",
  },
];

export function Problemas() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    // La sección NO tiene px en mobile — el carrusel toma el ancho completo
    <section id="problemas" className="pt-10 pb-24 md:pt-14 md:pb-32 md:px-6">

      {/* Título — sí tiene padding propio */}
      <div className="px-6 md:px-0">
        <div className="max-w-6xl md:mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              ¿Por qué se pierden los{" "}
              <span className="text-indigo-400">leads</span>?
            </h2>
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE: carrusel full-width ── */}
      <div className="md:hidden w-full overflow-x-auto snap-x snap-mandatory pb-4" style={{ scrollbarWidth: "none" }}>
        <div className="flex gap-4 w-max px-6">
          {problemas.map((p, i) => (
            <motion.div
              key={i}
              className="w-[280px] flex-shrink-0 snap-center relative flex flex-col rounded-2xl p-5 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-indigo-400 mb-4 flex-shrink-0"
                style={{
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.18)",
                }}
              >
                {p.icon}
              </div>

              <span className="text-[11px] font-semibold tracking-widest text-zinc-600 uppercase mb-2 block">
                {p.tag}
              </span>

              <h3 className="text-base font-bold text-white mb-3">{p.title}</h3>

              <p className="text-[#c0c0c0] text-sm leading-relaxed mb-5 flex-1">
                {p.desc}
              </p>

              {/* Solution row */}
              <div className="pt-4 border-t border-white/[0.08]">
                <p className="text-sm font-semibold text-indigo-400 flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(99,102,241,0.15)" }}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {p.solution}
                </p>
              </div>
            </motion.div>
          ))}
          {/* Trailing spacer: última tarjeta no queda pegada al borde */}
          <div className="w-4 flex-shrink-0" />
        </div>
      </div>

      {/* ── DESKTOP: grid de tres columnas ── */}
      <div
        className="hidden md:block max-w-6xl mx-auto"
        onMouseLeave={() => setHovered(null)}
      >
        <div className="grid grid-cols-3 gap-5">
          {problemas.map((p, i) => {
            const isActive = hovered === i;
            const isDimmed = hovered !== null && !isActive;

            return (
              <div
                key={i}
                className="will-change-[opacity]"
                style={{
                  opacity: isDimmed ? 0.38 : 1,
                  transition: "opacity 280ms ease-out",
                }}
                onMouseEnter={() => setHovered(i)}
              >
                <motion.div
                  className="h-full"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  animate={isActive ? { y: -6, scale: 1.02 } : { y: 0, scale: 1 }}
                  style={{
                    borderRadius: "1rem",
                    boxShadow: isActive
                      ? "0 0 0 1px rgba(99,102,241,0.45), 0 12px 40px rgba(99,102,241,0.16)"
                      : "none",
                    transition: "box-shadow 320ms ease-out",
                  }}
                >
                  <div
                    className="relative flex flex-col h-full rounded-2xl p-7 overflow-hidden"
                    style={{
                      background: isActive ? "#141416" : "#111111",
                      border: `1px solid ${isActive ? "rgba(99,102,241,0.38)" : "rgba(255,255,255,0.07)"}`,
                      transition: "background 300ms ease-out, border-color 300ms ease-out",
                    }}
                  >
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 inset-x-0 h-px"
                      style={{
                        background: isActive
                          ? "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)"
                          : "transparent",
                        transition: "background 300ms ease-out",
                      }}
                    />

                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-indigo-400 mb-5 flex-shrink-0"
                      style={{
                        background: isActive ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.08)",
                        border: `1px solid ${isActive ? "rgba(99,102,241,0.35)" : "rgba(99,102,241,0.18)"}`,
                        transition: "background 300ms ease-out, border-color 300ms ease-out",
                      }}
                    >
                      {p.icon}
                    </div>

                    <span className="text-[11px] font-semibold tracking-widest text-zinc-600 uppercase mb-3 block">
                      {p.tag}
                    </span>

                    <h3 className="text-xl font-bold text-white mb-4">{p.title}</h3>

                    <p className="text-[#c0c0c0] text-[15px] leading-relaxed mb-8 flex-1 min-h-[72px]">
                      {p.desc}
                    </p>

                    {/* Solution row */}
                    <div className="mt-auto pt-5 border-t border-white/[0.08]">
                      <p className="text-sm font-semibold text-indigo-400 flex items-center gap-2">
                        <motion.span
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(99,102,241,0.15)" }}
                          animate={isActive ? { scale: [1, 1.5, 0.85, 1.2, 1] } : { scale: 1 }}
                          transition={{ duration: 0.42, ease: "easeOut" }}
                        >
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </motion.span>
                        {p.solution}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
