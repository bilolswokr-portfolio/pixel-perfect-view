import { useEffect, useRef, useState } from "react";
import { BarChart3, Bot, Check, ChevronDown, Eye, GitBranch, Inbox, Lock, MessageSquare, Shield, SlidersHorizontal, UserCheck, Users, Workflow } from "lucide-react";
import { LogoMark, Logo } from "./Logo";

export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setIn(true), io.disconnect()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, v] = useInView<HTMLDivElement>(0.15);
  return <div ref={ref} className={`reveal ${v ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-soft">{sub}</p>}
    </Reveal>
  );
}

/* ---------------- Problem ---------------- */
export function Problem() {
  const [ref, v] = useInView<HTMLDivElement>(0.3);
  const scenes = [
    { cap: "Important inquiries get buried in busy conversations.", kind: "lost" },
    { cap: "Potential customers need a clear next step.", kind: "follow" },
    { cap: "Customer information is harder to manage when it lives everywhere.", kind: "scatter" },
  ];
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="The problem" title={<>Your business is growing.<br /><span className="text-muted-foreground">Your workflow shouldn't fall apart.</span></>} />
        <div ref={ref} className="mt-16 grid gap-6 md:grid-cols-3">
          {scenes.map((s, i) => (
            <div key={s.kind} className={`panel relative h-80 overflow-hidden p-6 ${i === 1 ? "md:translate-y-10" : ""}`}>
              <div className="absolute inset-0 grid-bg opacity-60" />
              <div className="relative h-52">
                {[0, 1, 2, 3].map((k) => {
                  const scattered = [
                    { l: 8 + k * 18, t: 6 + ((k * 37) % 60), r: (k - 1.5) * 9 },
                    { l: 10 + k * 14, t: 10 + k * 34, r: (k % 2 ? 6 : -6) },
                    { l: (k * 41) % 60, t: (k * 29) % 70, r: (k - 1.5) * 14 },
                  ][i];
                  const ordered = { l: 6, t: k * 46, r: 0 };
                  const p = v ? ordered : scattered;
                  return (
                    <div key={k} className="absolute w-[78%] glass px-3 py-2 text-xs transition-all duration-[1200ms] ease-out"
                      style={{ left: `${p.l}%`, top: p.t, transform: `rotate(${p.r}deg)`, transitionDelay: `${k * 120 + 400}ms`, opacity: !v && i === 0 && k > 1 ? 0.35 : 1 }}>
                      <span className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${v ? "bg-success" : "bg-warning"}`} />
                        {i === 0 && ["New message · 18 min ago", "Price question · 2h", "Trial request · 5h", "Schedule? · 1d"][k]}
                        {i === 1 && ["Follow-up · unassigned", "Call back · no date", "Send info · pending", "Reminder · missed"][k].replace(v ? /unassigned|no date|pending|missed/ : /$^/, ["Mon 10:00", "Tue 11:30", "Wed 14:00", "Thu 09:00"][k])}
                        {i === 2 && ["Notes in chat", "Phone in sheet", "Course in notebook", "Status in memory"][k]}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="relative mt-4 text-sm text-soft">{s.cap}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Transformation ---------------- */
export function Transformation() {
  const [pos, setPos] = useState(50);
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="The transformation" title={<>From scattered conversations to a business that runs with <span className="text-gradient">clarity.</span></>} />
        <Reveal className="mt-14">
          <div className="panel relative h-[420px] select-none overflow-hidden">
            {/* before */}
            <div className="absolute inset-0 bg-surface p-8">
              <p className="eyebrow text-muted-foreground">Before</p>
              {["Hi, price?", "Is there a group on Sat?", "My son wants to join", "Call me pls", "Still available?", "What time?"].map((t, i) => (
                <div key={t} className="absolute rounded-md border border-border bg-card px-3 py-2 text-xs text-muted-foreground opacity-70"
                  style={{ left: `${8 + ((i * 23) % 70)}%`, top: `${20 + ((i * 31) % 60)}%`, transform: `rotate(${(i % 3 - 1) * 8}deg)` }}>{t}</div>
              ))}
            </div>
            {/* after */}
            <div className="absolute inset-0 bg-background p-8" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
              <div className="absolute inset-0 grid-bg" />
              <p className="eyebrow relative text-right">With BizPilot AI</p>
              <div className="relative ml-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
                {[["Hi, price?", "Interested"], ["Is there a group on Sat?", "New"], ["My son wants to join", "Contacted"], ["Call me pls", "Follow-up Tue"]].map(([t, s]) => (
                  <div key={t} className="glass flex items-center justify-between px-3 py-2.5 text-xs"><span>{t}</span><span className="rounded-full bg-primary/20 px-2 py-0.5 text-glow">{s}</span></div>
                ))}
                <div className="glass p-3 sm:col-span-2">
                  <p className="text-xs text-muted-foreground">Needs attention next</p>
                  <div className="mt-2 flex h-10 items-end gap-1.5">{[40, 65, 50, 80, 70, 95, 85].map((h, i) => <div key={i} className="flex-1 rounded-sm bg-primary/70" style={{ height: `${h}%` }} />)}</div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 w-px bg-glow shadow-[var(--shadow-glow)]" style={{ left: `${pos}%` }}>
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-glow bg-card text-glow">⇆</div>
            </div>
            <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Compare before and after"
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {["Keep inquiries organized.", "Give every lead a clear status.", "Know what needs attention next."].map((b, i) => (
            <Reveal key={b} delay={i * 100} className="flex items-center gap-3 text-soft"><span className="grid h-7 w-7 place-items-center rounded-md bg-primary/15 text-glow"><Check className="h-4 w-4" /></span>{b}</Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Features (editorial bento) ---------------- */
export function Features() {
  const [approved, setApproved] = useState(false);
  const [ref, v] = useInView<HTMLDivElement>(0.3);
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="Features" title={<>Everything connected.<br /><span className="text-muted-foreground">Nothing unnecessarily complicated.</span></>} />
        <div className="mt-16 grid gap-5 lg:grid-cols-6">
          <Reveal className="panel overflow-hidden p-7 lg:col-span-4">
            <Feat icon={Inbox} t="Inquiry management" d="Bring customer inquiries into a clearer workflow so your team can see what needs attention." />
            <div className="relative mt-6 grid grid-cols-[1fr_auto_1.2fr] items-center gap-4">
              <div className="space-y-2">{["Telegram", "Phone", "Walk-in"].map((s) => <div key={s} className="rounded-md border border-border px-3 py-2 text-xs text-muted-foreground">{s}</div>)}</div>
              <svg width="60" height="90" aria-hidden><path d="M0 15 C30 15 30 45 60 45 M0 45 H60 M0 75 C30 75 30 45 60 45" className="flow-line" stroke="oklch(0.78 0.11 260)" fill="none" /></svg>
              <div className="glass p-3"><p className="text-xs text-glow">Inquiry queue</p>{["Malika · IELTS", "Jasur · Math", "Sardor · Code"].map((x) => <p key={x} className="mt-1.5 border-t border-border/50 pt-1.5 text-xs">{x}</p>)}</div>
            </div>
          </Reveal>
          <Reveal delay={100} className="panel relative overflow-hidden p-7 lg:col-span-2">
            <div className="absolute -right-10 -top-10 h-40 w-40 halo" />
            <Feat icon={Bot} t="AI-assisted responses" d="Prepare helpful replies to common questions while keeping your business in control of what gets sent." />
            <div className="relative mt-5 rounded-lg border border-primary/40 bg-primary/10 p-3 text-xs">
              “Our weekend groups start at 10:00. Shall I reserve a trial?”
              <div className="mt-3 flex gap-2">
                <button onClick={() => setApproved(!approved)} className={`rounded px-2.5 py-1 ${approved ? "bg-success/20 text-success" : "bg-primary text-primary-foreground"}`}>{approved ? "✓ Approved (demo)" : "Approve draft"}</button>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">Demo only — nothing is sent.</p>
            </div>
          </Reveal>
          <Reveal className="panel p-7 lg:col-span-2">
            <Feat icon={Users} t="Lead management" d="Track prospective customers from first inquiry to the next meaningful step." />
            <div className="mt-5 flex items-center gap-1 text-[10px]">{["New", "Contacted", "Interested", "Enrolled"].map((s, i) => <div key={s} className={`flex-1 rounded py-1.5 text-center ${i === 2 ? "bg-primary text-primary-foreground" : "bg-elevated text-muted-foreground"}`}>{s}</div>)}</div>
          </Reveal>
          <Reveal delay={100} className="panel p-7 lg:col-span-2">
            <Feat icon={UserCheck} t="Follow-up reminders" d="Keep follow-ups visible so important conversations are less likely to be forgotten." />
            <div className="relative mt-5 border-l border-border pl-4 text-xs">{["Mon · Call Jasur", "Tue · Send schedule", "Thu · Trial reminder"].map((x) => <p key={x} className="relative mb-2"><span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-glow" />{x}</p>)}</div>
          </Reveal>
          <Reveal delay={200} className="panel p-7 lg:col-span-2">
            <Feat icon={BarChart3} t="Analytics" d="Understand inquiry patterns and see where your attention may be needed." />
            <div ref={ref} className="mt-5 flex h-20 items-end gap-2">{[35, 60, 45, 80, 55, 90].map((h, i) => <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary/30 to-glow transition-all duration-1000" style={{ height: v ? `${h}%` : "4%", transitionDelay: `${i * 90}ms` }} />)}</div>
          </Reveal>
          <Reveal className="panel p-7 lg:col-span-6">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_2fr]">
              <Feat icon={Workflow} t="Business workflow" d="Bring customer communication and daily follow-up tasks into one practical workspace." />
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {["Inquiry arrives", "Draft reply", "Human review", "Lead status", "Follow-up task", "Insight"].map((s, i, a) => (
                  <span key={s} className="flex items-center gap-2"><span className="rounded-md border border-border bg-surface px-3 py-2">{s}</span>{i < a.length - 1 && <span className="text-glow">→</span>}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function Feat({ icon: I, t, d }: { icon: typeof Inbox; t: string; d: string }) {
  return (<div><span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-glow"><I className="h-4.5 w-4.5" /></span><h3 className="mt-4 text-xl font-semibold">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>);
}

/* ---------------- How it works ---------------- */
export function HowItWorks() {
  const steps = [
    ["01", "Connect your workflow", "Identify where inquiries arrive and which information your team needs to track.", ["Telegram", "Phone calls", "Website form"]],
    ["02", "Configure your workspace", "Set up your lead stages, approved responses, and follow-up process.", ["Stages: New → Enrolled", "12 approved replies", "Reminders on"]],
    ["03", "Start managing with clarity", "Use one organized workspace to track inquiries, tasks, and business activity.", ["Today: 4 follow-ups", "2 new inquiries", "Weekly summary"]],
  ] as const;
  const [active, setActive] = useState(0);
  const [ref, v] = useInView<HTMLDivElement>(0.3);
  return (
    <section id="how" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="How it works" title="Get started without rebuilding your entire business." />
        <div ref={ref} className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="relative">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />
            <div className="absolute left-5 top-2 w-px bg-glow shadow-[var(--shadow-glow)] transition-all duration-700" style={{ height: v ? `${((active + 1) / 3) * 100 - 6}%` : 0 }} />
            {steps.map(([n, t, d], i) => (
              <button key={n} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} className={`relative mb-6 flex w-full gap-5 rounded-xl p-4 text-left transition-colors ${active === i ? "bg-card/60" : ""}`}>
                <span className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-sm ${active >= i ? "border-glow bg-primary/20 text-glow" : "border-border bg-background text-muted-foreground"}`}>{n}</span>
                <span><span className="block text-lg font-semibold">{t}</span><span className="mt-1 block text-sm text-muted-foreground">{d}</span></span>
              </button>
            ))}
          </div>
          <div className="panel relative grid place-items-center overflow-hidden p-10">
            <div className="absolute inset-0 grid-bg" />
            <div key={active} className="relative w-full max-w-sm space-y-3 animate-in fade-in zoom-in-95 duration-500">
              <p className="eyebrow">Step {steps[active][0]}</p>
              {steps[active][3].map((x, i) => <div key={x} className="glass px-4 py-3 text-sm" style={{ marginLeft: i * 20 }}>{x}</div>)}
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">Setup time depends on your business and which integrations you need.</p>
      </div>
    </section>
  );
}

/* ---------------- Value stack ---------------- */
export function ValueStack() {
  const layers = [
    [MessageSquare, "Customer inquiries", "Every incoming question lands in one place instead of scattered chats."],
    [Bot, "AI-assisted communication", "Draft replies for common questions — your team reviews before anything is sent."],
    [GitBranch, "Lead and task organization", "Each prospect gets a status and a clear follow-up task."],
    [BarChart3, "Business insights", "See patterns in inquiries and where attention is needed."],
  ] as const;
  const [sel, setSel] = useState(0);
  return (
    <section className="relative py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
        <div>
          <Reveal><p className="eyebrow">The value stack</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Less scattered work. More visibility into what happens next.</h2></Reveal>
          <div className="mt-8 space-y-2">
            {layers.map(([I, t, d], i) => (
              <button key={t} onClick={() => setSel(i)} onMouseEnter={() => setSel(i)} className={`w-full rounded-lg border p-4 text-left transition-all ${sel === i ? "border-primary bg-primary/10" : "border-transparent hover:border-border"}`}>
                <span className="flex items-center gap-3 font-medium"><I className="h-4 w-4 text-glow" />{t}</span>
                <span className={`grid transition-all ${sel === i ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><span className="overflow-hidden text-sm text-muted-foreground">{d}</span></span>
              </button>
            ))}
          </div>
        </div>
        <div className="relative h-[440px] [perspective:1200px]">
          <div className="absolute inset-0 halo opacity-50" />
          <div className="relative h-full [transform-style:preserve-3d]" style={{ transform: "rotateX(58deg) rotateZ(-38deg)" }}>
            {layers.map(([I, t], i) => (
              <button key={t} onClick={() => setSel(i)} aria-label={t}
                className={`absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl border transition-all duration-500 ${sel === i ? "border-glow bg-primary/30 shadow-[var(--shadow-glow)]" : "border-border bg-card/70"}`}
                style={{ transform: `translate(-50%,-50%) translateZ(${(3 - i) * 60 + (sel === i ? 24 : 0)}px)` }}>
                <span className="absolute left-4 top-4 flex items-center gap-2 text-xs"><I className="h-4 w-4 text-glow" />{t}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Trust ---------------- */
export function Trust() {
  const items = [
    [Lock, "Business data organization", "Your inquiries, leads and tasks are structured in one workspace, scoped to your team."],
    [Eye, "Human review of AI-assisted responses", "AI drafts suggestions. People decide what is sent."],
    [SlidersHorizontal, "Configurable workflows", "Stages, replies and reminders follow how your business already works."],
    [Check, "Clear product boundaries", "We tell you what is available now and what is planned."],
    [Shield, "Secure implementation practices", "Access controls and credentials are configured per business during setup."],
  ] as const;
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="Designed for everyday business workflows" title="Built around your workflow. Designed for clarity." />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {items.map(([I, t, d], i) => (
            <Reveal key={t} delay={i * 80} className="bg-surface p-6">
              <I className="h-5 w-5 text-glow" />
              <p className="mt-6 font-mono text-[10px] text-muted-foreground">0{i + 1}</p>
              <h3 className="mt-1 font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
export function Pricing() {
  const tiers = [
    { n: "Pilot", d: "For businesses evaluating the workflow.", f: ["Limited initial setup", "Guided demonstration", "Agreed pilot scope"], soon: [], cta: "Discuss a Pilot" },
    { n: "Starter", d: "For small teams that need an organized inquiry and follow-up workflow.", f: ["Inquiry workspace", "Lead statuses", "Follow-up tasks & reminders", "AI-drafted replies with review", "Basic analytics"], soon: [], cta: "Get a Free Demo", hl: true },
    { n: "Pro", d: "For businesses that need a more customized workflow and additional capabilities.", f: ["Everything in Starter", "Custom lead stages", "Team roles"], soon: ["Telegram integration — requires setup", "Advanced analytics — planned"], cta: "Discuss Your Workflow" },
  ];
  return (
    <section id="pricing" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow="Pricing" title="Start with the workflow you need today." />
        <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.n} delay={i * 100} className={`relative flex flex-col rounded-2xl p-8 ${t.hl ? "panel border-primary/60 shadow-[var(--shadow-glow)] lg:-translate-y-4" : "border border-border bg-surface"}`}>
              {t.hl && <span className="absolute -top-3 left-8 rounded-md bg-primary px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider">Most teams start here</span>}
              <h3 className="text-xl font-semibold">{t.n}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.d}</p>
              <p className="mt-6 text-3xl font-semibold">Custom <span className="text-sm font-normal text-muted-foreground">· pricing confirmed on call</span></p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {t.f.map((x) => <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-success" />{x}</li>)}
                {t.soon.map((x) => <li key={x} className="flex gap-2 text-muted-foreground"><span className="mt-0.5 h-4 w-4 text-center text-warning">◌</span>{x}</li>)}
              </ul>
              <a href="#demo" className={`mt-8 justify-center ${t.hl ? "btn-primary" : "btn-ghost"}`}>{t.cta} <span className="arrow">→</span></a>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-muted-foreground">Every business has a different workflow. We'll clarify the setup, available features, and scope before you commit.</p>
      </div>
    </section>
  );
}

/* ---------------- Demo request ---------------- */
export function DemoRequest() {
  const [form, setForm] = useState({ name: "", business: "", contact: "", note: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "unavailable">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name.";
    if (form.business.trim().length < 2) er.business = "Please enter your business name.";
    if (!/^(\+?\d[\d\s-]{7,}|@\w{4,}|[^@\s]+@[^@\s]+\.\w+)$/.test(form.contact.trim())) er.contact = "Enter a phone, email or @telegram username.";
    if (form.note.length > 500) er.note = "Please keep it under 500 characters.";
    setErrors(er);
    if (!Object.keys(er).length) setState("unavailable");
  };
  const field = (k: keyof typeof form, label: string, ph: string) => (
    <label className="block">
      <span className="text-sm text-soft">{label}</span>
      <input value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} placeholder={ph} maxLength={120}
        className="mt-1.5 w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-glow" aria-invalid={!!errors[k]} />
      {errors[k] && <span className="mt-1 block text-xs text-destructive">{errors[k]}</span>}
    </label>
  );
  return (
    <section id="demo" className="relative py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Free demo</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">See how it fits your business before you commit.</h2>
          <ul className="mt-8 space-y-3 text-soft">
            {["Explore the interface.", "Understand the workflow.", "Discuss your current inquiry process.", "Confirm what can be configured for your business."].map((x) => (
              <li key={x} className="flex gap-3"><span className="grid h-6 w-6 place-items-center rounded bg-primary/15 text-glow"><Check className="h-3.5 w-3.5" /></span>{x}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={100} className="panel p-7">
          {state === "unavailable" ? (
            <div className="grid h-full place-items-center text-center" role="status">
              <div>
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-warning/15 text-warning">!</span>
                <h3 className="mt-4 text-lg font-semibold">Your details look good — but online booking isn't connected yet.</h3>
                <p className="mt-2 text-sm text-muted-foreground">Your request was not sent. Demo submissions will be enabled once a contact channel is configured.</p>
                <button onClick={() => setState("idle")} className="btn-ghost mt-6">Back to form</button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">
              {field("name", "Your name", "Aziz Karimov")}
              {field("business", "Business name", "Bright Future Learning Center")}
              {field("contact", "Phone, email or Telegram", "+998 90 123 45 67")}
              <label className="block">
                <span className="text-sm text-soft">How do you handle inquiries today? <span className="text-muted-foreground">(optional)</span></span>
                <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3} maxLength={500}
                  className="mt-1.5 w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-glow" />
              </label>
              <button type="submit" className="btn-primary w-full justify-center">Book a Free Demo <span className="arrow">→</span></button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const faqs = [
  ["What is BizPilot AI?", "A business workspace that helps you organize customer inquiries, track leads, prepare AI-assisted replies, and keep follow-ups visible."],
  ["Which businesses is it designed for?", "It is initially designed for private education centers and small businesses in Uzbekistan, though the workflow fits many service businesses."],
  ["Can it help manage Telegram inquiries?", "Telegram integration is part of the product direction. A real connection requires configuration and the appropriate bot credentials for your business — we'll confirm availability during the demo."],
  ["Does the AI send messages automatically?", "No. By default the AI prepares drafts that your team reviews and approves. Nothing is sent without a person deciding."],
  ["Can I customize the workflow?", "Yes. Lead stages, approved responses and follow-up rules can be configured to match how you work."],
  ["How does setup work?", "We map where your inquiries come from, configure your stages and replies, then help your team get started. Timing depends on your business and integrations."],
  ["What happens during the free demo?", "We walk through the interface, discuss your current process, and clarify what can be configured for you. No commitment."],
  ["How is business data handled?", "Your data is kept in your workspace and access is limited to your team. Specific storage and access details are confirmed during setup."],
  ["Which features are available right now?", "The interactive preview on this page shows the core workflow with demo data. We'll confirm exactly which features are live versus planned before you commit."],
];
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHead eyebrow="FAQ" title="Questions, answered honestly." />
        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map(([q, a], i) => (
            <div key={q}>
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium">
                {q}<ChevronDown className={`h-4 w-4 shrink-0 text-glow transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}><p className="overflow-hidden text-sm text-muted-foreground">{a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
export function FinalCTA() {
  const [ref, v] = useInView<HTMLDivElement>(0.3);
  return (
    <section className="relative overflow-hidden py-36">
      <div ref={ref} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 halo" />
        <svg className="absolute left-1/2 top-[38%] w-[1100px] -translate-x-1/2 -translate-y-1/2" viewBox="0 0 1100 400" aria-hidden>
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx="550" cy="200" rx={250 + i * 140} ry={60 + i * 40} fill="none" stroke="oklch(0.78 0.11 260)" strokeOpacity={0.4 - i * 0.1}
              strokeDasharray="2000" style={{ strokeDashoffset: v ? 0 : 2000, transition: `stroke-dashoffset 2.4s ${i * 0.3}s ease-out` }} />
          ))}
        </svg>
      </div>
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <div className="mx-auto mb-10 grid h-28 w-28 place-items-center rounded-[2rem] glass anim-float"><LogoMark size={72} /></div>
        <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">Give every inquiry a <span className="text-gradient">clearer next step.</span></h2>
        <p className="mx-auto mt-5 max-w-xl text-soft">Explore a more organized way to manage your customer conversations, leads, and follow-ups.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#demo" className="btn-primary">Get a Free Demo <span className="arrow">→</span></a>
          <a href="#product" className="btn-ghost">Explore the Platform</a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Your Business. Under Control. An intelligent workspace for inquiries, leads and follow-ups.</p>
        </div>
        <FootCol t="Product" l={[["Platform", "#product"], ["Pricing", "#pricing"], ["Free demo", "#demo"], ["FAQ", "#faq"]]} />
        <FootCol t="Features" l={[["Inquiries", "#features"], ["AI replies", "#features"], ["Leads & tasks", "#features"], ["How it works", "#how"]]} />
        <FootCol t="Legal" l={[["Privacy policy", "/privacy"], ["Terms of service", "/terms"]]} />
      </div>
      <div className="border-t border-border py-6 text-center font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} BizPilot AI. All rights reserved.</div>
    </footer>
  );
}
function FootCol({ t, l }: { t: string; l: [string, string][] }) {
  return (<div><p className="eyebrow text-muted-foreground">{t}</p><ul className="mt-4 space-y-2 text-sm">{l.map(([n, h]) => <li key={n}><a href={h} className="text-soft hover:text-glow">{n}</a></li>)}</ul></div>);
}
