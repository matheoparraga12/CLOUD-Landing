"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// Step data
// ─────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Captura instantánea",
    desc: "Un interesado te escribe. REAS responde al instante con un saludo personalizado y comienza a interactuar.",
  },
  {
    num: "02",
    title: "Calificación con IA",
    desc: "El sistema detecta presupuesto, zona de interés y urgencia. Solo los leads con alto potencial avanzan.",
  },
  {
    num: "03",
    title: "Cierre de agenda",
    desc: "REAS coordina la cita en tu calendario según tu disponibilidad real. Recibís una notificación con los datos.",
  },
];

// Ancho de cada card + gap del carrusel mobile
const CARD_W = 280;
const CARD_GAP = 16;

// ─────────────────────────────────────────────
// Screen 1 — WhatsApp capture
// ─────────────────────────────────────────────
function Screen1() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 700);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#09090f]">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.06]" style={{ background: "rgba(16,16,22,0.98)" }}>
        <div className="w-7 h-7 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center flex-shrink-0">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.84L.057 23.886l6.234-1.437A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 0 1-5.007-1.374l-.359-.214-3.7.852.938-3.588-.234-.372A9.81 9.81 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
          </svg>
        </div>
        <div>
          <p className="text-white text-[11px] font-semibold leading-none">REAS</p>
          <p className="text-[#25D366] text-[9px] mt-0.5">en línea</p>
        </div>
      </div>

      <div className="flex-1 px-3 py-4 space-y-2.5 overflow-hidden">
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div key="msg1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="bg-[#1c1c26] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                <p className="text-[#c0c0c0] text-[11px] leading-relaxed">Hola, info sobre la casa en Palermo 👀</p>
                <p className="text-zinc-600 text-[9px] text-right mt-1">10:42</p>
              </div>
            </motion.div>
          )}
          {phase === 2 && (
            <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-end">
              <div className="rounded-2xl rounded-tr-sm px-4 py-3" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.2)" }}>
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400 block"
                      animate={{ y: [0, -4, 0] }} transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {phase >= 3 && (
            <motion.div key="reply1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
              <div className="rounded-2xl rounded-tr-sm px-3 py-2 max-w-[88%]" style={{ background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.22)" }}>
                <p className="text-zinc-100 text-[11px] leading-relaxed">¡Hola! Sí, está disponible 🏠 ¿Cuál es tu presupuesto y cuándo querés verla?</p>
                <p className="text-indigo-400/50 text-[9px] text-right mt-1">10:42 ✓✓</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Screen 2 — AI Qualification
// ─────────────────────────────────────────────
const qualRows = [
  { label: "Zona de interés", value: "Palermo" },
  { label: "Presupuesto", value: "USD 180k" },
  { label: "Urgencia", value: "Alta ↑" },
];

function Screen2() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const t3 = setTimeout(() => setPhase(3), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#09090f]">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-indigo-500/20" style={{ background: "rgba(16,16,26,0.98)" }}>
        <div className="w-7 h-7 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-white text-[11px] font-semibold leading-none">REAS IA</p>
          <p className="text-indigo-400 text-[9px] mt-0.5">analizando lead...</p>
        </div>
        <motion.div className="w-2 h-2 rounded-full bg-indigo-400"
          animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1.1, repeat: Infinity }} />
      </div>

      <div className="flex-1 px-4 py-4 overflow-hidden">
        <p className="text-zinc-600 text-[10px] uppercase tracking-widest mb-3">Perfil detectado</p>
        <div className="space-y-0">
          {qualRows.map((row, i) => (
            <AnimatePresence key={row.label}>
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.18 }}
                  className="flex items-center justify-between py-2.5 border-b border-white/[0.05]"
                >
                  <span className="text-zinc-500 text-[10px]">{row.label}</span>
                  <span className="text-white text-[11px] font-semibold">{row.value}</span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {phase >= 2 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl px-3 py-2.5" style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.28)" }}>
            <p className="text-indigo-300 text-[10px]">Lead clasificado como{" "}
              <span className="text-white font-bold">Alta prioridad</span>
            </p>
          </motion.div>
        )}

        {phase >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mt-3">
            <span className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
            </span>
            <span className="text-zinc-400 text-[10px]">Avanzando al cierre de agenda...</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Screen 3 — Calendar
// ─────────────────────────────────────────────
const CAL_DAYS = ["Lu","Ma","Mi","Ju","Vi","Sá","Do"];
const CAL_NUMS = [null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const ACTIVE_DAY = 14;

function Screen3() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#09090f]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]" style={{ background: "rgba(16,16,22,0.98)" }}>
        <p className="text-white text-[11px] font-semibold">Mayo 2026</p>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      </div>

      <div className="px-3 py-3 flex-1 overflow-hidden">
        <div className="grid grid-cols-7 mb-1">
          {CAL_DAYS.map((d) => (
            <div key={d} className="text-center text-[9px] text-zinc-600 font-medium py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {CAL_NUMS.map((n, i) => (
            <div key={i} className={`text-center text-[10px] py-2 rounded-lg transition-colors ${
              n === ACTIVE_DAY ? "bg-indigo-500 text-white font-bold" :
              n ? "text-zinc-400" : ""
            }`}>
              {n}
            </div>
          ))}
        </div>

        {phase >= 1 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-xl px-3 py-3" style={{ background: "rgba(99,102,241,0.14)", border: "1px solid rgba(99,102,241,0.3)" }}>
            <div className="flex items-center gap-2.5">
              {phase >= 2 ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 16 }}
                  className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                </motion.div>
              ) : (
                <div className="w-5 h-5 rounded-full border border-indigo-500/40 flex-shrink-0" />
              )}
              <div>
                <p className="text-white text-[10px] font-semibold">Visita agendada</p>
                <p className="text-indigo-300 text-[9px] mt-0.5">Mié 14 · 17:00 hs · Palermo</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

const screens = [Screen1, Screen2, Screen3];

// ─────────────────────────────────────────────
// Phone mockup — compact prop para mobile
// ─────────────────────────────────────────────
function PhoneMockup({ activeStep, compact = false }: { activeStep: number; compact?: boolean }) {
  const Screen = screens[activeStep];
  const glowing = activeStep === 1;

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow for step 2 */}
      <motion.div
        animate={{ opacity: glowing ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 rounded-[44px] pointer-events-none"
        style={{ boxShadow: "0 0 60px 8px rgba(99,102,241,0.25)" }}
      />

      {/* Phone shell */}
      <div
        className={`relative rounded-[50px] overflow-hidden ${
          compact
            ? "w-[min(260px,78vw)] h-[400px]"
            : "w-[min(320px,85vw)] h-[600px]"
        }`}
        style={{
          background: "rgba(14,14,20,0.95)",
          border: "1.5px solid rgba(255,255,255,0.1)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 flex justify-center pt-3 z-10">
          <div className="w-16 h-4 rounded-b-xl" style={{ background: "rgba(14,14,20,0.98)" }} />
        </div>

        {/* Side button decoration */}
        <div className="absolute right-[-2px] top-24 w-[3px] h-10 rounded-l-full" style={{ background: "rgba(255,255,255,0.07)" }} />
        <div className="absolute left-[-2px] top-20 w-[3px] h-7 rounded-r-full" style={{ background: "rgba(255,255,255,0.07)" }} />
        <div className="absolute left-[-2px] top-32 w-[3px] h-7 rounded-r-full" style={{ background: "rgba(255,255,255,0.07)" }} />

        {/* Screen content */}
        <div className="absolute inset-0 pt-7 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Screen />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────
export function ComoFunciona() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile carousel refs + anti-loop flag
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const isProgrammatic = useRef(false);

  // Tap dot → scroll carousel programmatically
  const scrollToStep = useCallback((i: number) => {
    const el = mobileCarouselRef.current;
    if (!el) return;
    isProgrammatic.current = true;
    setActiveStep(i);
    el.scrollTo({ left: i * (CARD_W + CARD_GAP), behavior: "smooth" });
    setTimeout(() => { isProgrammatic.current = false; }, 600);
  }, []);

  // User swipes → update activeStep
  const handleCarouselScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (isProgrammatic.current) return;
    const el = e.currentTarget;
    const idx = Math.round(el.scrollLeft / (CARD_W + CARD_GAP));
    setActiveStep(Math.min(Math.max(idx, 0), steps.length - 1));
  }, []);

  // Intersection Observer — desktop sticky scroll only
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStep(i); },
        { threshold: 0.55 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="py-24 md:py-32 md:px-20">
      <div id="como-funciona" aria-hidden="true" className="scroll-mt-24" />

      {/* Header — propio padding en mobile */}
      <div className="px-6 md:px-0">
        <div className="max-w-6xl md:mx-auto text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
            Cómo funciona REAS
          </h2>
          <p className="text-[#c0c0c0] text-lg max-w-xl mx-auto">
            Tres pasos. Sin configuraciones complejas ni conocimiento técnico.
          </p>
        </div>
      </div>

      {/* ── MOBILE: mockup compacto + carrusel sincronizado ── */}
      <div className="md:hidden flex flex-col items-center gap-3">

        {/* Phone compacto */}
        <PhoneMockup activeStep={activeStep} compact />

        {/* Dots — tapeables, scrollean el carrusel */}
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => scrollToStep(i)}
              animate={{ width: activeStep === i ? 36 : 8, opacity: activeStep === i ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full bg-indigo-500"
              aria-label={`Paso ${i + 1}`}
            />
          ))}
        </div>

        {/* Carrusel de pasos — full-width, sincronizado con el mockup */}
        <div
          ref={mobileCarouselRef}
          onScroll={handleCarouselScroll}
          className="w-full overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-4 w-max px-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className="w-[280px] flex-shrink-0 snap-center rounded-2xl p-5"
                style={{
                  background: activeStep === i ? "rgba(99,102,241,0.10)" : "#111111",
                  border: `1px solid ${activeStep === i ? "rgba(99,102,241,0.45)" : "rgba(255,255,255,0.07)"}`,
                  transition: "background 300ms ease, border-color 300ms ease",
                }}
              >
                <span
                  className="text-[11px] font-black tracking-widest uppercase mb-3 block transition-colors duration-300"
                  style={{ color: activeStep === i ? "#818cf8" : "#52525b" }}
                >
                  {s.num}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-[#b0b0b0] text-sm leading-relaxed">{s.desc}</p>

                {/* Línea de acento inferior */}
                <motion.div
                  animate={{ width: activeStep === i ? "40px" : "0px" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mt-4 h-[2px] bg-indigo-500 rounded-full overflow-hidden"
                />
              </div>
            ))}
            {/* Spacer final */}
            <div className="w-4 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* ── DESKTOP: sticky scroll ── */}
      <div className="hidden md:block max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-16 items-start">
          {/* Left — sticky centrado verticalmente en pantalla */}
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-6">
            <PhoneMockup activeStep={activeStep} />
            <div className="flex items-center gap-2">
              {steps.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ width: activeStep === i ? 40 : 10, opacity: activeStep === i ? 1 : 0.3 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="h-[3px] rounded-full bg-indigo-500"
                />
              ))}
            </div>
          </div>

          {/* Right — scrollable steps */}
          <div className="pt-[25vh]">
            {steps.map((s, i) => (
              <div
                key={i}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="min-h-[115vh] flex flex-col justify-center py-16"
              >
                <motion.div
                  animate={{ opacity: activeStep === i ? 1 : 0.4 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className={`text-sm font-black tracking-widest uppercase mb-5 block ${
                    activeStep === i ? "text-indigo-400" : "text-zinc-700"
                  }`}>
                    {s.num}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-[#b8b8b8] text-xl leading-relaxed max-w-sm">
                    {s.desc}
                  </p>
                  <motion.div
                    animate={{ width: activeStep === i ? "48px" : "0px" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mt-8 h-[2px] bg-indigo-500 rounded-full overflow-hidden"
                  />
                </motion.div>
              </div>
            ))}
            {/* Buffer final */}
            <div className="h-[60vh]" />
          </div>
        </div>
      </div>

    </section>
  );
}
