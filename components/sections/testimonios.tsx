"use client";

import { AnimateIn } from "@/components/ui/animate-in";

const testimonios = [
  {
    quote:
      "Antes perdía leads los fines de semana porque no podía responder. Ahora REAS los atiende y cuando llego el lunes tengo visitas ya agendadas.",
    name: "Martín G.",
    role: "Agente independiente · Buenos Aires",
    avatar: "MG",
  },
  {
    quote:
      "Lo que más me sorprendió es la calidad de las respuestas. Los clientes no saben que están hablando con un sistema automático.",
    name: "Laura P.",
    role: "Broker inmobiliaria · Córdoba",
    avatar: "LP",
  },
  {
    quote:
      "En el primer mes recuperé la inversión. Cerré tres operaciones que antes se me hubieran ido por falta de seguimiento.",
    name: "Diego R.",
    role: "Agente en franquicia · Rosario",
    avatar: "DR",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-400 mb-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonios() {
  return (
    <section id="testimonios" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">Testimonios</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Lo que dicen los agentes
          </h2>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonios.map((t, i) => (
            <AnimateIn key={i} delay={i * 0.1}>
              <div className="relative bg-[#111] border border-white/[0.07] rounded-2xl p-7 flex flex-col h-full hover:border-white/[0.12] transition-colors">
                <Stars />
                <p className="text-zinc-300 text-[15px] leading-relaxed italic flex-1 mb-7">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-zinc-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
