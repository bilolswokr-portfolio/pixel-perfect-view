import { useEffect, useRef } from "react";
import { LayoutGrid, ListChecks, LineChart, Send, Sparkles, UserRound, BellRing } from "lucide-react";
import { LogoMark } from "./Logo";

function CommandCenter() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.transform = `rotateY(${x * 14 - 12}deg) rotateX(${8 - y * 10}deg)`;
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="relative h-[560px] w-full [perspective:1400px]">
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 halo" />
      <div
        ref={ref}
        className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{ transform: "rotateY(-12deg) rotateX(8deg)" }}
      >
        {/* orbital rings */}
        <svg className="absolute inset-0 m-auto h-[460px] w-[460px] anim-spin-slow" viewBox="0 0 460 460" style={{ transform: "translateZ(-40px)" }} aria-hidden>
          <ellipse cx="230" cy="230" rx="220" ry="90" stroke="oklch(0.78 0.11 260 / .35)" fill="none" />
          <ellipse cx="230" cy="230" rx="180" ry="180" stroke="oklch(0.6 0.2 262 / .2)" fill="none" strokeDasharray="2 8" />
          <circle cx="450" cy="230" r="3" fill="oklch(0.78 0.11 260)" />
        </svg>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 560" aria-hidden>
          {[
            "M300 280 C220 200 160 140 110 110",
            "M300 280 C380 200 440 150 500 120",
            "M300 280 C220 340 160 400 120 440",
            "M300 280 C380 350 440 410 490 450",
          ].map((d) => (
            <path key={d} d={d} className="flow-line" stroke="oklch(0.78 0.11 260 / .55)" strokeWidth="1.2" fill="none" />
          ))}
        </svg>
        {/* core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ transform: "translate(-50%,-50%) translateZ(60px)" }}>
          <div className="glass grid h-36 w-36 place-items-center rounded-[2rem] anim-float">
            <LogoMark size={84} animated />
          </div>
        </div>
        {/* panels */}
        <Panel cls="left-0 top-6" z={40} delay="0s">
          <Row icon={<Send className="h-3.5 w-3.5" />} label="New inquiry · Telegram" />
          <p className="mt-2 text-sm text-soft">“Do you have IELTS evening classes for adults?”</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Malika R. · just now</p>
        </Panel>
        <Panel cls="right-0 top-0" z={90} delay="-2s">
          <Row icon={<Sparkles className="h-3.5 w-3.5" />} label="AI suggested reply" />
          <p className="mt-2 text-sm text-soft">Yes — evening groups run Mon/Wed/Fri at 19:00. Want me to book a placement test?</p>
          <div className="mt-3 flex gap-2 text-[11px]">
            <span className="rounded bg-primary/20 px-2 py-0.5 text-glow">Review</span>
            <span className="rounded border border-border px-2 py-0.5 text-muted-foreground">Edit</span>
          </div>
        </Panel>
        <Panel cls="left-2 bottom-10" z={110} delay="-4s">
          <Row icon={<UserRound className="h-3.5 w-3.5" />} label="Lead profile" />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-medium">Malika Rahimova</span>
            <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[11px] text-warning">Interested</span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">IELTS · Evening group</p>
        </Panel>
        <Panel cls="right-4 bottom-24" z={20} delay="-1s">
          <Row icon={<BellRing className="h-3.5 w-3.5" />} label="Follow-up → Tasks" />
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center gap-2 text-xs"><span className="h-1.5 w-1.5 rounded-full bg-success" />Call back · Tue 10:00</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Send schedule PDF</div>
          </div>
        </Panel>
        <Panel cls="right-24 bottom-0" z={140} delay="-3s" w="w-52">
          <Row icon={<LineChart className="h-3.5 w-3.5" />} label="Inquiries · demo" />
          <div className="mt-2 flex h-12 items-end gap-1">
            {[30, 45, 38, 60, 52, 75, 68, 90].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-primary/40 to-glow" style={{ height: `${h}%` }} />
            ))}
          </div>
        </Panel>
        {/* particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="particle absolute h-1 w-1 rounded-full bg-glow"
            style={{ left: `${10 + i * 8}%`, top: `${55 + (i % 4) * 10}%`, animationDelay: `${i * -0.7}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function Panel({ children, cls, z, delay, w = "w-60" }: { children: React.ReactNode; cls: string; z: number; delay: string; w?: string }) {
  return (
    <div className={`absolute ${cls} ${w}`} style={{ transform: `translateZ(${z}px)` }}>
      <div className="glass p-3.5 anim-float" style={{ animationDelay: delay, ["--z" as string]: "0px" }}>
        {children}
      </div>
    </div>
  );
}
function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-glow">
      <span className="grid h-5 w-5 place-items-center rounded bg-primary/20">{icon}</span>
      {label}
    </div>
  );
}

function MobileComposition() {
  return (
    <div className="relative mx-auto mt-4 h-72 w-full max-w-sm">
      <div className="absolute inset-0 halo" />
      <div className="absolute left-1/2 top-6 -translate-x-1/2 glass grid h-28 w-28 place-items-center rounded-3xl"><LogoMark size={64} animated /></div>
      <div className="absolute bottom-6 left-0 w-48 glass p-3 text-xs"><span className="text-glow">New inquiry</span><p className="mt-1 text-soft">“IELTS evening classes?”</p></div>
      <div className="absolute bottom-0 right-0 w-44 glass p-3 text-xs"><span className="text-glow">Follow-up</span><p className="mt-1 text-soft">Call back · Tue 10:00</p></div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute right-[-10%] top-0 h-[700px] w-[700px] halo opacity-60" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 lg:grid-cols-[1fr_1.1fr]">
        <div className="reveal in">
          <p className="eyebrow">The intelligent business operating system</p>
          <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.2rem]">
            Every Customer Inquiry. <span className="text-gradient">Organized.</span>
            <br />Every Next Step. <span className="text-gradient">Clear.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-soft">
            BizPilot AI helps you organize customer inquiries, respond faster, track potential customers, and keep your business moving without losing important opportunities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#demo" className="btn-primary">Get a Free Demo <span className="arrow">→</span></a>
            <a href="#product" className="btn-ghost">Explore the Platform</a>
          </div>
          <ul className="mt-10 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            {[
              [LayoutGrid, "One organized workspace"],
              [ListChecks, "Clear follow-up workflow"],
              [LineChart, "Business insights at a glance"],
            ].map(([Icon, t]) => {
              const I = Icon as typeof LayoutGrid;
              return (
                <li key={t as string} className="flex items-center gap-2"><I className="h-4 w-4 text-glow" />{t as string}</li>
              );
            })}
          </ul>
        </div>
        <div className="hidden lg:block"><CommandCenter /></div>
        <div className="lg:hidden"><MobileComposition /></div>
      </div>
    </section>
  );
}
