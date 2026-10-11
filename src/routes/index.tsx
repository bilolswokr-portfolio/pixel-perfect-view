import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Hero } from "@/components/Hero";
import { ProductDemo } from "@/components/ProductDemo";
import { DemoRequest, FAQ, Features, FinalCTA, Footer, HowItWorks, Pricing, Problem, SectionHead, Reveal, Transformation, Trust, ValueStack } from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BizPilot AI — Your Business. Under Control." },
      { name: "description", content: "Organize customer inquiries, track leads, prepare AI-assisted replies and keep every follow-up clear. Built for education centers in Uzbekistan." },
      { property: "og:title", content: "BizPilot AI — Your Business. Under Control." },
      { property: "og:description", content: "The intelligent workspace for inquiries, leads and follow-ups." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const links = [["Product", "#product"], ["Features", "#features"], ["How It Works", "#how"], ["Pricing", "#pricing"], ["FAQ", "#faq"]];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="announce flex items-center justify-center gap-3 border-b border-border/60 bg-surface/80 px-4 py-2 text-xs text-soft backdrop-blur">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />
        Introducing a smarter way to manage customer inquiries
        <a href="#product" className="text-glow hover:underline">Explore →</a>
      </div>
      <nav className={`transition-all duration-300 ${scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "bg-background/30 backdrop-blur-sm"}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="#top" aria-label="BizPilot AI home"><Logo animated /></a>
          <ul className="hidden items-center gap-8 text-sm text-soft md:flex">
            {links.map(([n, h]) => <li key={n}><a href={h} className="transition-colors hover:text-foreground">{n}</a></li>)}
          </ul>
          <a href="#demo" className="btn-primary hidden !py-2 !text-sm md:inline-flex">Get a Free Demo <span className="arrow">→</span></a>
          <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
        </div>
      </nav>
      {open && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 md:hidden">
          <div className="flex h-16 items-center justify-between px-5"><Logo /><button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button></div>
          <ul className="space-y-1 px-5 pt-6 text-2xl font-semibold">
            {links.map(([n, h]) => <li key={n}><a href={h} onClick={() => setOpen(false)} className="block py-3">{n}</a></li>)}
          </ul>
          <div className="px-5 pt-6"><a href="#demo" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">Get a Free Demo →</a></div>
        </div>
      )}
    </header>
  );
}

function Index() {
  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Transformation />
        <section id="product" className="relative py-28">
          <div className="pointer-events-none absolute left-1/2 top-40 h-[500px] w-[900px] -translate-x-1/2 halo opacity-40" />
          <div className="relative mx-auto max-w-7xl px-5">
            <SectionHead eyebrow="Product" title="One intelligent workspace. A clearer way to work." sub="Click around — every tab works. All data shown is sample demo data." />
            <Reveal className="mt-14"><ProductDemo /></Reveal>
          </div>
        </section>
        <Features />
        <HowItWorks />
        <ValueStack />
        <Trust />
        <Pricing />
        <DemoRequest />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
