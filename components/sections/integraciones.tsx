"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame, useMotionValueEvent } from "framer-motion";
import { AnimateIn } from "@/components/ui/animate-in";

// ─────────────────────────────────────────────
// Integration data
// ─────────────────────────────────────────────
const integrations = [
  {
    name: "WhatsApp API",
    color: "#25D366",
    desc: "Atendemos a tus leads en la app que usan todos los días, de forma instantánea y sin fricciones.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.84L.057 23.886l6.234-1.437A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 0 1-5.007-1.374l-.359-.214-3.7.852.938-3.588-.234-.372A9.81 9.81 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
      </svg>
    ),
  },
  {
    name: "OpenAI",
    color: "#10a37f",
    desc: "Inteligencia artificial avanzada para entender contexto, conversar y calificar con precisión humana.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#10a37f" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 2a4.5 4.5 0 0 1 4.243 6.004A4.5 4.5 0 0 1 14 15.95V20a2 2 0 0 1-4 0v-4.05A4.5 4.5 0 0 1 7.757 8.004 4.5 4.5 0 0 1 12 2z"/>
        <circle cx="12" cy="10" r="2"/>
        <path d="M6.343 6.343A8 8 0 1 0 17.657 17.657"/>
      </svg>
    ),
  },
  {
    name: "Google Calendar",
    color: "#4285F4",
    desc: "Sincronización bidireccional en tiempo real para agendar visitas sin riesgo de doble reserva.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <text x="8" y="19" fontSize="7" fill="#4285F4" stroke="none" fontWeight="700">G</text>
      </svg>
    ),
  },
  {
    name: "Meta Ads",
    color: "#0082FB",
    desc: "Conexión directa con tus anuncios de Facebook e Instagram para capturar leads en el momento que hacen clic.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#0082FB" opacity="0.15"/>
        <path d="M7.5 14.5c0-2.2 1.3-4.5 3-4.5.8 0 1.5.6 1.5 1.5 0 1.5-1 3-1 4.5 0 .8.5 1.5 1.5 1.5 2 0 3.5-3 3.5-5.5 0-2.5-1.5-4-4-4-3 0-5 2.5-5 5.5 0 1 .2 2 .5 2.5" stroke="#0082FB" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "n8n Core",
    color: "#EA4B71",
    desc: "El cerebro operativo que enlaza todas tus herramientas y orquesta los flujos automáticos 24/7.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EA4B71" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="12" r="2"/>
        <circle cx="19" cy="6" r="2"/>
        <circle cx="19" cy="18" r="2"/>
        <line x1="7" y1="12" x2="17" y2="7"/>
        <line x1="7" y1="12" x2="17" y2="17"/>
      </svg>
    ),
  },
  {
    name: "CRM Inmobiliario",
    color: "#f59e0b",
    desc: "Sincronizá contactos, historial y estado de cada lead directamente con tu CRM favorito.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    name: "Portales Inmobiliarios",
    color: "#8b5cf6",
    desc: "Capturá leads de Zonaprop, Argenprop y MercadoLibre directamente en tu flujo de atención.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
];

// 3× copies for seamless loop
const ITEMS = [...integrations, ...integrations, ...integrations];

// Width of one full set of cards: 7 cards × (300px + 16px gap)
const CARD_W   = 300;
const CARD_GAP = 16;
const SINGLE_W = integrations.length * (CARD_W + CARD_GAP); // 2212px

// Auto-scroll speed (px/sec) — same visual pace as the CSS marquee (50s ÷ 2212px ≈ 44px/s)
const SPEED = 44;

// ─────────────────────────────────────────────
// Shared card
// ─────────────────────────────────────────────
function IntegrationCard({ item }: { item: typeof integrations[0] }) {
  return (
    <div
      className="group w-[300px] flex-shrink-0 rounded-2xl px-5 py-6 cursor-default select-none"
      style={{
        background: "rgba(13,13,18,0.9)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease, background 300ms ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-5px) scale(1.02)";
        el.style.borderColor = `${item.color}44`;
        el.style.boxShadow = `0 0 0 1px ${item.color}33, 0 16px 40px rgba(0,0,0,0.5)`;
        el.style.background = "rgba(18,18,26,0.95)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0) scale(1)";
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.boxShadow = "none";
        el.style.background = "rgba(13,13,18,0.9)";
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
        style={{
          background: `${item.color}1e`,
          border: `1px solid ${item.color}38`,
          filter: `drop-shadow(0 0 6px ${item.color}30)`,
        }}
      >
        {item.icon}
      </div>
      <h3 className="text-white font-extrabold text-base mb-2">{item.name}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed px-0.5">{item.desc}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Desktop: CSS keyframe marquee (unchanged)
// ─────────────────────────────────────────────
function DesktopMarquee() {
  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .marquee-track {
          animation: marquee 50s linear infinite;
          will-change: transform;
        }
      `}</style>
      <div
        className="relative z-0 w-full overflow-hidden mt-[72px]"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          maskImage:        "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="marquee-track flex gap-4 w-max py-4">
          {ITEMS.map((item, i) => <IntegrationCard key={i} item={item} />)}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// Mobile: Framer Motion drag + auto-resume loop
// ─────────────────────────────────────────────
function MobileMarquee() {
  const x            = useMotionValue(0);
  const isPaused     = useRef(false);
  const resumeTimer  = useRef<ReturnType<typeof setTimeout>>();

  // Seamless loop: teleport x to stay within (-SINGLE_W, 0]
  useMotionValueEvent(x, "change", (val) => {
    if (val > 0)          x.set(val - SINGLE_W);
    else if (val < -SINGLE_W) x.set(val + SINGLE_W);
  });

  // Per-frame auto-scroll — stops while dragging
  useAnimationFrame((_, delta) => {
    if (isPaused.current) return;
    x.set(x.get() - (SPEED * delta / 1000));
  });

  function pause() {
    isPaused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }

  function scheduleResume() {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    // Resume after 1.5 s of inactivity
    resumeTimer.current = setTimeout(() => {
      isPaused.current = false;
    }, 1500);
  }

  // Cleanup timer on unmount
  useEffect(() => () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); }, []);

  return (
    <div
      className="w-full overflow-hidden mt-[72px]"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent, 8%, black 15%, black 85%, 92%, transparent)",
        maskImage:        "linear-gradient(to right, transparent, 8%, black 15%, black 85%, 92%, transparent)",
      }}
    >
      <motion.div
        style={{ x, display: "flex", gap: `${CARD_GAP}px`, width: "max-content", paddingBottom: "16px", paddingTop: "16px" }}
        drag="x"
        // Wide constraints so the elastic spring never kicks in — teleport handles looping
        dragConstraints={{ left: -SINGLE_W * 10, right: SINGLE_W }}
        dragElastic={0}
        // Natural flick inertia after release
        dragTransition={{ timeConstant: 200, power: 0.12 }}
        onDragStart={pause}
        onDragEnd={scheduleResume}
      >
        {ITEMS.map((item, i) => <IntegrationCard key={i} item={item} />)}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────
export function Integraciones() {
  return (
    <section id="integraciones" className="py-24 md:py-32 flex flex-col items-center">

      {/* Title */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 md:px-20">
        <AnimateIn className="text-center">
          <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">Integraciones</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
            Tu ecosistema, totalmente{" "}
            <span className="text-indigo-400">integrado.</span>
          </h2>
          <p className="text-[#c0c0c0] text-lg max-w-xl mx-auto">
            REAS conecta todas tus herramientas en un flujo sin fricciones.
          </p>
        </AnimateIn>
      </div>

      {/* Desktop: CSS auto-marquee */}
      <div className="hidden md:block w-full">
        <DesktopMarquee />
      </div>

      {/* Mobile: drag + auto-resume */}
      <div className="md:hidden w-full">
        <MobileMarquee />
      </div>

    </section>
  );
}
