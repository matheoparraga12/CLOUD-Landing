"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateIn } from "@/components/ui/animate-in";

const checks = [
  "Respondés leads en segundos, no en horas",
  "Calificación automática sin perder oportunidades",
  "Agenda de visitas sincronizada con tu Google Calendar",
  "Sin conocimientos técnicos requeridos",
  "Configuración lista en menos de 48 horas",
];

const WA_SVG = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.84L.057 23.886l6.234-1.437A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 0 1-5.007-1.374l-.359-.214-3.7.852.938-3.588-.234-.372A9.81 9.81 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

const OPTIONS = [
  {
    value: "whitepaper" as const,
    title: "Quiero el paso a paso",
    sub: "Enviame el protocolo para ver cómo lo hacés antes de decidir.",
    btnLabel: "Mandame el paso a paso →",
    success: {
      title: "¡Listo! Revisá tu mail.",
      body: "El paso a paso ya está en camino. Si no lo ves, chequeá en Promociones o Spam.",
    },
  },
  {
    value: "listo" as const,
    title: "¡Estoy listo! Hablemos.",
    sub: "Quiero que me contactes para activar REAS hoy mismo.",
    btnLabel: "Contactame ahora →",
    success: {
      title: "¡Excelente!",
      body: "Me pongo en contacto con vos prioritariamente para empezar.",
    },
  },
] as const;

type Intencion = typeof OPTIONS[number]["value"];

// Un campo con label fijo y hint siempre renderizado (sin reflow)
function Field({
  label,
  focused,
  hint,
  hintVisible,
  children,
}: {
  label: string;
  focused: boolean;
  hint: string;
  hintVisible: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="text-xs font-semibold uppercase tracking-wider block mb-1 md:mb-2 transition-colors duration-300"
        style={{ color: focused || hintVisible ? "#818cf8" : "#a1a1aa" }}
      >
        {label}
      </label>
      {children}
      {/* Hint siempre en el DOM — solo cambia opacidad, nunca reflow */}
      <p
        className="text-[11px] mt-1 transition-all duration-300"
        style={{
          color: "#818cf8",
          opacity: hintVisible ? 1 : 0,
          // height fija evita el salto
          height: "1rem",
          overflow: "hidden",
        }}
      >
        {hint}
      </p>
    </div>
  );
}

export function Contacto() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [intencion, setIntencion] = useState<Intencion>("whitepaper");
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const activeOpt = OPTIONS.find((o) => o.value === intencion)!;
  const wantsContact = intencion === "listo";
  const wantsWhitepaper = intencion === "whitepaper";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  }

  const inputBase =
    "w-full bg-black/20 border rounded-xl px-4 py-2 md:py-3 text-white text-sm placeholder-zinc-500 focus:outline-none transition-all duration-300";

  const inputStyle = (name: string, prioritized: boolean) => {
    if (focused === name) {
      return {
        borderColor: "#5A67D8",
        boxShadow: "0 0 0 3px rgba(90,103,216,0.15)",
      };
    }
    if (prioritized) {
      return {
        borderColor: "rgba(129,140,248,0.45)",
        boxShadow: "0 0 0 2px rgba(90,103,216,0.08)",
      };
    }
    return {
      borderColor: "rgba(255,255,255,0.08)",
      boxShadow: "none",
    };
  };

  return (
    <section id="contacto" className="py-24 md:py-32 px-6 md:px-20 min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-start">

          {/* ── Left ── */}
          <AnimateIn>
            <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">Contacto</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
              Elevá tu rendimiento como agente.
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6 md:mb-10">
              Automatizo tu gestión de leads para que te enfoques en cerrar ventas.{" "}
              <span className="text-white font-medium">
                Yo me encargo de la tecnología, vos de los cierres.
              </span>
            </p>

            <ul className="space-y-4">
              {checks.map((c, i) => (
                <li key={i} className="flex items-center gap-3.5 text-[15px] text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </AnimateIn>

          {/* ── Right — glassmorphism form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div
                className="absolute -inset-px rounded-2xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 60% 0%, rgba(90,103,216,0.18) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              <div
                className="relative rounded-2xl p-5 md:p-8 md:min-h-[600px] flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <AnimatePresence mode="wait">

                  {/* ── Success ── */}
                  {status === "sent" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex-1 flex flex-col items-center justify-center text-center"
                    >
                      {/* Check con glow pulsante */}
                      <div className="relative flex items-center justify-center mb-6">
                        {/* Anillo de pulso */}
                        <motion.div
                          className="absolute rounded-full"
                          style={{ background: "rgba(99,102,241,0.15)" }}
                          animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                          initial={{ width: 72, height: 72 }}
                        />
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.15, type: "spring", stiffness: 240, damping: 16 }}
                          className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(99,102,241,0.12)",
                            border: "1px solid rgba(129,140,248,0.35)",
                            boxShadow: "0 0 28px rgba(99,102,241,0.25)",
                          }}
                        >
                          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </motion.div>
                      </div>
                      <motion.h3
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="text-xl font-bold text-white mb-3"
                      >
                        {activeOpt.success.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.42, duration: 0.4 }}
                        className="text-zinc-300 text-[15px] leading-relaxed max-w-[260px]"
                      >
                        {activeOpt.success.body}
                      </motion.p>
                    </motion.div>

                  ) : (
                    /* ── Form ── */
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="flex-1 flex flex-col gap-3 md:gap-5"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Selector de intención */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                          ¿Qué necesitás hoy?
                        </p>
                        <div className="space-y-2">
                          {OPTIONS.map((opt) => {
                            const active = intencion === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => setIntencion(opt.value)}
                                className="w-full flex items-start gap-3 rounded-xl px-3 py-2.5 md:py-3.5 text-left"
                                style={{
                                  background: active ? "rgba(90,103,216,0.12)" : "rgba(0,0,0,0.15)",
                                  border: `1px solid ${active ? "rgba(129,140,248,0.55)" : "rgba(255,255,255,0.07)"}`,
                                  boxShadow: active
                                    ? "0 0 0 3px rgba(90,103,216,0.12), 0 0 20px rgba(90,103,216,0.07)"
                                    : "none",
                                  opacity: active ? 1 : 0.4,
                                  transition: "opacity 300ms ease, border-color 300ms ease, box-shadow 300ms ease, background 300ms ease",
                                }}
                              >
                                {/* Radio indicator */}
                                <span
                                  className="mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                                  style={{ borderColor: active ? "#818cf8" : "rgba(255,255,255,0.2)" }}
                                >
                                  <motion.span
                                    animate={{ scale: active ? 1 : 0 }}
                                    transition={{ duration: 0.15, type: "spring", stiffness: 400, damping: 20 }}
                                    className="w-2 h-2 rounded-full bg-indigo-400"
                                  />
                                </span>
                                <span>
                                  <span
                                    className="block text-[13px] font-semibold transition-colors duration-300"
                                    style={{ color: active ? "#e0e7ff" : "#71717a" }}
                                  >
                                    {opt.title}
                                  </span>
                                  <span className="block text-xs text-zinc-500 mt-0.5">{opt.sub}</span>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Nombre — sin hint */}
                      <Field
                        label="Nombre"
                        focused={focused === "nombre"}
                        hint=""
                        hintVisible={false}
                      >
                        <input
                          name="nombre"
                          value={form.nombre}
                          onChange={handleChange}
                          onFocus={() => setFocused("nombre")}
                          onBlur={() => setFocused(null)}
                          required
                          placeholder="Tu nombre"
                          className={inputBase}
                          style={inputStyle("nombre", false)}
                        />
                      </Field>

                      {/* Email — se resalta con Opción A */}
                      <Field
                        label="Email"
                        focused={focused === "email"}
                        hint="✦ Aquí recibirás el protocolo"
                        hintVisible={wantsWhitepaper && focused !== "email"}
                      >
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          required
                          placeholder="tu@email.com"
                          className={inputBase}
                          style={inputStyle("email", wantsWhitepaper && focused !== "email")}
                        />
                      </Field>

                      {/* Teléfono — se resalta con Opción B */}
                      <Field
                        label="Teléfono"
                        focused={focused === "telefono"}
                        hint="✦ Dato clave para contactarte"
                        hintVisible={wantsContact && focused !== "telefono"}
                      >
                        <input
                          name="telefono"
                          value={form.telefono}
                          onChange={handleChange}
                          onFocus={() => setFocused("telefono")}
                          onBlur={() => setFocused(null)}
                          required={wantsContact}
                          placeholder={wantsContact ? "Tu número para contactarte" : "+54 9 11 0000 0000"}
                          className={inputBase}
                          style={inputStyle("telefono", wantsContact && focused !== "telefono")}
                        />
                      </Field>

                      {/* Botón dinámico */}
                      <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-white font-semibold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-shadow duration-200"
                        style={{ background: "linear-gradient(90deg, #5A67D8, #818CF8)" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(90,103,216,0.45)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                        }}
                      >
                        {status === "loading" ? (
                          <>
                            <motion.span
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                            />
                            Enviando...
                          </>
                        ) : (
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={activeOpt.btnLabel}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.15 }}
                            >
                              {activeOpt.btnLabel}
                            </motion.span>
                          </AnimatePresence>
                        )}
                      </motion.button>

                      {/* WhatsApp ghost con borde verde */}
                      <a
                        href="https://wa.me/5491100000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full inline-flex items-center justify-center gap-3 text-sm font-medium rounded-xl px-5 py-3 transition-all duration-200"
                        style={{
                          border: "1px solid rgba(37,211,102,0.25)",
                          color: "#6b7280",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.borderColor = "rgba(37,211,102,0.55)";
                          el.style.color = "#25D366";
                          el.style.background = "rgba(37,211,102,0.04)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.borderColor = "rgba(37,211,102,0.25)";
                          el.style.color = "#6b7280";
                          el.style.background = "transparent";
                        }}
                      >
                        {WA_SVG}
                        ¿Duda urgente? Hablamos por WhatsApp
                        <svg
                          width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
