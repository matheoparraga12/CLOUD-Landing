"use client";

import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

// ─── Reemplazá este ID con el de tu video de YouTube ───────────────────
const VIDEO_ID = "dQw4w9WgXcQ";
// ───────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────
// Video Modal
// ─────────────────────────────────────────────
function VideoModal({ onClose }: { onClose: () => void }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const close = useCallback(() => {
    // Detiene el video vaciando el src antes de desmontar
    if (iframeRef.current) iframeRef.current.src = "";
    onClose();
  }, [onClose]);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    // Bloquear scroll del body
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [close]);

  const content = (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        key="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        onClick={close}
      >
        {/* Video container — clic dentro NO cierra el modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar — fuera del recuadro de video */}
          <button
            onClick={close}
            className="absolute -top-11 right-0 flex items-center gap-1.5 text-zinc-400 hover:text-indigo-400 transition-colors duration-200 text-sm font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Cerrar
          </button>

          {/* Marco del video */}
          <div
            className="w-full aspect-video rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 0 0 1px rgba(99,102,241,0.15), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(99,102,241,0.12)",
            }}
          >
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Demo REAS"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Portal para que el modal esté fuera del árbol del Hero
  return typeof document !== "undefined" ? createPortal(content, document.body) : null;
}

// ─────────────────────────────────────────────
// Floating status toast
// ─────────────────────────────────────────────
const toastStates = [
  {
    accent: "#25D366",
    iconBg: "rgba(37,211,102,0.12)",
    iconBorder: "rgba(37,211,102,0.25)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.84L.057 23.886l6.234-1.437A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 0 1-5.007-1.374l-.359-.214-3.7.852.938-3.588-.234-.372A9.81 9.81 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
      </svg>
    ),
    dot: "#25D366",
    label: "WhatsApp",
    title: "Respondiendo Lead #451...",
    sub: "ahora mismo",
  },
  {
    accent: "#818cf8",
    iconBg: "rgba(129,140,248,0.12)",
    iconBorder: "rgba(129,140,248,0.28)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
    dot: "#818cf8",
    label: "IA activa",
    title: "Calificando lead...",
    sub: "analizando perfil",
  },
  {
    accent: "#34d399",
    iconBg: "rgba(52,211,153,0.12)",
    iconBorder: "rgba(52,211,153,0.28)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    dot: "#34d399",
    label: "Agendado",
    title: "Visita confirmada",
    sub: "Mañana · 10:00 hs · Palermo",
  },
];

function FloatingToast() {
  const [show, setShow] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const add = (fn: () => void, ms: number) => {
      const t = setTimeout(() => { if (alive) fn(); }, ms);
      timers.push(t);
    };

    const runCycle = (base: number) => {
      add(() => { setShow(true); setIdx(0); }, base);
      add(() => setIdx(1), base + 2800);
      add(() => setIdx(2), base + 5400);
      add(() => { setShow(false); runCycle(base + 11000); }, base + 8000);
    };

    runCycle(1500);
    return () => { alive = false; timers.forEach(clearTimeout); };
  }, []);

  const state = toastStates[idx];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="toast-wrapper"
          initial={{ opacity: 0, x: 40, y: -8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 36, y: -6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[14%] right-[6%] z-30 hidden lg:block"
        >
          <div
            className="w-[260px] rounded-2xl overflow-hidden"
            style={{
              background: "rgba(8,8,14,0.72)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: `1px solid ${state.accent}33`,
              boxShadow: `0 0 24px ${state.accent}18, 0 8px 32px rgba(0,0,0,0.5)`,
            }}
          >
            <motion.div
              key={`accent-${idx}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-[2px] origin-left"
              style={{ background: `linear-gradient(90deg, ${state.accent}, transparent)` }}
            />

            <div className="px-4 py-3.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: state.iconBg, border: `1px solid ${state.iconBorder}` }}
                      >
                        {state.icon}
                      </div>
                      <span className="text-[11px] font-semibold" style={{ color: state.accent }}>
                        {state.label}
                      </span>
                    </div>
                    <div className="relative flex items-center justify-center w-4 h-4">
                      <motion.div
                        className="absolute w-3 h-3 rounded-full"
                        style={{ background: state.dot, opacity: 0.25 }}
                        animate={{ scale: [1, 1.8, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: state.dot }} />
                    </div>
                  </div>
                  <p className="text-white text-[13px] font-semibold leading-snug mb-0.5">{state.title}</p>
                  <p className="text-zinc-500 text-[11px]">{state.sub}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// Mobile Chatlet — secuencia Lead → Reunión
// ─────────────────────────────────────────────
const CHATLET_STEPS = [
  {
    accent: "#25D366",
    badge: "NUEVO LEAD · Meta Ads",
    text: 'Hola! Me interesa la propiedad. Info xfa 🙏',
    sub: "hace 1 seg · sin leer",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.84L.057 23.886l6.234-1.437A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 0 1-5.007-1.374l-.359-.214-3.7.852.938-3.588-.234-.372A9.81 9.81 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
      </svg>
    ),
  },
  {
    accent: "#818cf8",
    badge: "REAS respondiendo...",
    text: "¡Hola! Soy REAS 🤖 ¿Cuál es tu presupuesto?",
    sub: "respuesta automática · 3 seg",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.2" strokeLinecap="round">
        <path d="M12 2a4 4 0 0 1 0 8 4 4 0 0 1 0-8z" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    accent: "#34d399",
    badge: "✓ LEAD CALIFICADO",
    text: "Presupuesto OK · Ingresos OK · Zona OK",
    sub: "calificación IA completada",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.8" strokeLinecap="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    accent: "#f59e0b",
    badge: "📅 REUNIÓN AGENDADA",
    text: "Vie · 10:00 hs · Palermo",
    sub: "Google Calendar · confirmado",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
] as const;

function MobileChatlet() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"hidden" | "visible" | "exiting" | "gone">("hidden");
  const current = CHATLET_STEPS[step];

  useEffect(() => {
    // Cada paso dura 3 seg en pantalla
    const timers = [
      setTimeout(() => setPhase("visible"), 800),
      setTimeout(() => setStep(1),          3800),
      setTimeout(() => setStep(2),          6800),
      setTimeout(() => setStep(3),          9800),
      // Paso final visible 3 seg → fade out
      setTimeout(() => setPhase("exiting"), 12800),
      setTimeout(() => setPhase("gone"),    13600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === "gone") return null;

  return (
    <div className="md:hidden absolute top-20 left-0 right-0 flex justify-center z-50 px-5 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={
          phase === "visible"  ? { opacity: 1, y: 0 }  :
          phase === "exiting"  ? { opacity: 0, y: -18 } :
                                 { opacity: 0, y: -30 }
        }
        transition={{
          duration: phase === "exiting" ? 0.65 : 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-[85%] max-w-[280px] rounded-2xl overflow-hidden"
        style={{
          background: "#121212",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        <div className="px-4 py-2.5">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-2.5"
            >
              {/* Icon */}
              <div
                className="w-[20px] h-[20px] rounded-md flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${current.accent}18`,
                  border: `1px solid ${current.accent}28`,
                }}
              >
                {current.icon}
              </div>

              {/* Text block */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-[11px] font-semibold leading-tight truncate">
                  {current.text}
                </p>
                <p className="text-zinc-500 text-[10px] leading-tight mt-0.5 truncate">
                  {current.sub}
                </p>
              </div>

              {/* Live dot */}
              <div className="relative flex items-center justify-center w-3 h-3 flex-shrink-0">
                <motion.div
                  className="absolute w-2.5 h-2.5 rounded-full"
                  style={{ background: current.accent, opacity: 0.2 }}
                  animate={{ scale: [1, 1.7, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: current.accent }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-1 pb-2">
          {CHATLET_STEPS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === step ? "12px" : "4px",
                height: "4px",
                background: i <= step ? current.accent : "rgba(255,255,255,0.10)",
                opacity: i < step ? 0.4 : 1,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <section
        id="hero"
        ref={ref}
        className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        {/* Animated orb background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.18) 40%, transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[35%] top-[40%] w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(139,92,246,0.25) 0%, transparent 65%)",
              filter: "blur(50px)",
            }}
            animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[30%] top-[45%] w-[350px] h-[350px] rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(79,70,229,0.2) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
            animate={{ x: [0, -25, 0], y: [0, 25, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        {/* Scroll-driven fade to black */}
        <motion.div
          style={{ opacity: fadeOpacity }}
          className="absolute inset-0 bg-[#080808] z-10 pointer-events-none"
        />

        {/* Bottom gradient edge */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-[#080808] z-10 pointer-events-none" />

        {/* Floating status toast */}
        <FloatingToast />

        {/* Mobile chatlet — absolute, no empuja el contenido */}
        <MobileChatlet />

        {/* Content */}
        <motion.div
          style={{ y: textY }}
          className="relative z-20 text-center max-w-3xl mx-auto px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block mb-6 text-[10px] font-semibold tracking-widest text-white/60 uppercase border border-white/10 bg-white/5 px-3 py-1 rounded-full"
          >
            Automatización Inmobiliaria
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.07] mb-6"
          >
            Trabajá en cerrar,
            <br />
            <span className="text-indigo-400">no en responder.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed"
          >
            Tu propio piloto automático. Captamos, calificamos y agendamos las visitas por vos para que te enfoques solo en cerrar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.66 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            {/* CTA principal — primero en mobile, segundo en desktop */}
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="w-full sm:w-auto sm:order-2 inline-flex items-center justify-center text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 text-sm"
              style={{ background: "linear-gradient(90deg, #5A67D8, #818CF8)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 22px rgba(90,103,216,0.45)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
            >
              Empezar ahora
            </a>

            {/* Botón video — segundo en mobile, primero en desktop */}
            <button
              onClick={() => setVideoOpen(true)}
              className="group w-full sm:w-auto sm:order-1 inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                <polygon points="10,8 16,12 10,16" fill="currentColor" />
              </svg>
              Mirá cómo REAS trabaja por vos (2 min)
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Modal de video — fuera del section para evitar clipping por overflow:hidden */}
      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}
    </>
  );
}
