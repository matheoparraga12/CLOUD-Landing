import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Problemas } from "@/components/sections/problemas";
import { ComoFunciona } from "@/components/sections/como-funciona";
import { Precios } from "@/components/sections/precios";
import { FAQ } from "@/components/sections/faq";
import { Integraciones } from "@/components/sections/integraciones";
import { Contacto } from "@/components/sections/contacto";
import { ScrollReset } from "@/components/ui/scroll-reset";

export default function Home() {
  return (
    <>
      <ScrollReset />
      <Nav />
      <main>
        <Hero />
        <Problemas />
        <ComoFunciona />
        <Integraciones />
        <Precios />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
