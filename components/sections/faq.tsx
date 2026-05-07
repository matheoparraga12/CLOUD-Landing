"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateIn } from "@/components/ui/animate-in";

const faqs = [
  {
    q: "¿Necesito saber programar para usar REAS?",
    a: "No. REAS está diseñado para agentes inmobiliarios, no para técnicos. La configuración inicial la hacemos nosotros. Vos solo usás WhatsApp como siempre.",
  },
  {
    q: "¿Cómo se conecta con mi WhatsApp?",
    a: "REAS se conecta a tu número de WhatsApp Business existente. No necesitás un número nuevo ni cambiar tu flujo de trabajo actual.",
  },
  {
    q: "¿Qué pasa si el lead hace una pregunta que REAS no sabe responder?",
    a: "REAS reconoce cuándo una consulta requiere intervención humana y te notifica de inmediato para que puedas tomar el control de la conversación.",
  },
  {
    q: "¿Puedo personalizar las respuestas?",
    a: "Sí. Podés configurar el tono, la información de tus propiedades, las zonas en las que trabajás y cualquier detalle que quieras que REAS comunique.",
  },
  {
    q: "¿Funciona con Google Calendar?",
    a: "Sí. REAS lee tu disponibilidad real en Google Calendar y agenda las visitas sin superposiciones. También podés usar otras plataformas de agendamiento.",
  },
  {
    q: "¿Hay contrato de permanencia?",
    a: "No. Todos los planes son mensuales y podés cancelar cuando quieras, sin penalidades ni burocracia.",
  },
  {
    q: "¿Cuánto tiempo tarda la configuración?",
    a: "El onboarding estándar toma menos de 48 horas. Un especialista te guía en todo el proceso hasta que REAS esté funcionando correctamente.",
  },
  {
    q: "¿Puedo probar REAS antes de pagar?",
    a: "Sí. Ofrecemos una demo personalizada donde te mostramos el sistema funcionando con tu número y tus propiedades. Sin compromiso.",
  },
];

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-white/[0.07] last:border-0"
      style={{
        background: open ? "rgba(255,255,255,0.03)" : "transparent",
        // inset box-shadow: left border visual without shifting content
        boxShadow: open ? "inset 2px 0 0 #5A67D8" : "inset 2px 0 0 transparent",
        transition: "background 300ms ease, box-shadow 300ms ease",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-6 py-5 px-6 text-left"
      >
        <span
          className="text-[15px] font-medium leading-snug transition-colors duration-300"
          style={{ color: open ? "#818cf8" : "#e4e4e7" }}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="mt-0.5 flex-shrink-0 text-xl leading-none transition-colors duration-300"
          style={{ color: open ? "#818cf8" : "#71717a" }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-zinc-400 text-[15px] leading-relaxed pb-5 px-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-20 min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
          {/* Left */}
          <AnimateIn>
            <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
              Preguntas frecuentes
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              ¿Tenés dudas? Acá respondemos las preguntas que nos hacen los agentes antes de empezar.
            </p>
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#818cf8] hover:text-[#a5b4fc] transition-colors duration-200"
            >
              ¿Otra pregunta? Escribinos
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </AnimateIn>

          {/* Right accordion */}
          <AnimateIn delay={0.1}>
            <div className="bg-[#111] border border-white/[0.07] rounded-2xl overflow-hidden">
              {faqs.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} i={i} />
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
