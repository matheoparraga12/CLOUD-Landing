"use client";

function CloudIcon({ size = 24 }: { size?: number }) {
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

const links = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Planes", href: "#precios" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

function smoothTo(href: string) {
  if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  const el = document.querySelector(href);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); smoothTo("#"); }}
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
            >
              <CloudIcon size={24} />
              <span className="text-[16px] font-extrabold tracking-tight">REAS</span>
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Automatización para agentes inmobiliarios. Atiende, califica y agenda por WhatsApp 24/7.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); smoothTo(l.href); }}
                className="text-sm text-zinc-500 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-xs">© {year} REAS. Todos los derechos reservados.</p>
          <p className="text-zinc-600 text-xs">Hecho en Argentina 🇦🇷</p>
        </div>
      </div>
    </footer>
  );
}
