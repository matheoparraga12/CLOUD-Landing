"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Planes", href: "#precios" },
  { label: "FAQ", href: "#faq" },
];

function CloudIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 40 28" fill="none" aria-hidden="true">
      <path
        d="M31 24H11C6.03 24 2 19.97 2 15c0-4.63 3.5-8.44 8-8.94C11.76 3.1 15.65 1 20 1s8.24 2.1 10 5.06C34.5 6.56 38 10.37 38 15a9 9 0 0 1-7 9z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

function smoothTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      style={{ backdropFilter: scrolled ? "blur(20px)" : "none" }}
      className={`fixed inset-x-0 top-0 z-[9999] transition-all duration-300 ${
        scrolled ? "bg-[#080808]/80 border-b border-white/[0.06]" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-6">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2 flex-shrink-0 text-white hover:text-white/80 transition-colors"
        >
          <CloudIcon size={28} />
          <span className="text-[17px] font-extrabold tracking-tight">REAS</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => { e.preventDefault(); setOpen(false); smoothTo(l.href); }}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contacto"
          onClick={(e) => { e.preventDefault(); smoothTo("#contacto"); }}
          className="hidden md:inline-flex items-center bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex-shrink-0"
        >
          Contacto
        </a>

        {/* Hamburger */}
        <button
          className="ml-auto md:hidden w-9 h-9 flex flex-col justify-center gap-[5px] border border-white/10 rounded-lg px-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          <motion.span className="block h-[1.5px] bg-white rounded-full" animate={open ? { y: 6.5, rotate: 45 } : {}} transition={{ duration: 0.2 }} />
          <motion.span className="block h-[1.5px] bg-white rounded-full" animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.15 }} />
          <motion.span className="block h-[1.5px] bg-white rounded-full" animate={open ? { y: -6.5, rotate: -45 } : {}} transition={{ duration: 0.2 }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[#080808] border-t border-white/[0.06] px-6 pb-5 pt-3 flex flex-col gap-1"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-zinc-400 hover:text-white py-2.5 border-b border-white/[0.06] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-3 w-full text-center bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Contacto
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
