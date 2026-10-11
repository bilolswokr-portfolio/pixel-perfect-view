import { useMemo, useRef, useState } from "react";
import { BarChart3, Bot, CheckSquare, LayoutDashboard, Search, Settings, Users, X } from "lucide-react";

type Status = "New" | "Contacted" | "Interested" | "Enrolled" | "Lost";
const STATUSES: Status[] = ["New", "Contacted", "Interested", "Enrolled", "Lost"];
const statusCls: Record<Status, string> = {
  New: "bg-primary/20 text-glow",
  Contacted: "bg-elevated text-soft",
  Interested: "bg-warning/15 text-warning",
  Enrolled: "bg-success/15 text-success",
  Lost: "bg-destructive/15 text-destructive",
};

const initialLeads = [
  { id: 1, name: "Malika Rahimova", contact: "@malika_r", type: "IELTS course", status: "Interested" as Status, last: "Today 09:40", next: "Tue 10:00" },
  { id: 2, name: "Jasur Karimov", contact: "+998 90 *** 12 44", type: "Math tutoring", status: "New" as Status, last: "Today 08:15", next: "—" },
  { id: 3, name: "Dilnoza Tursunova", contact: "@dilnoza_t", type: "Kids English", status: "Contacted" as Status, last: "Yesterday", next: "Wed 15:30" },
  { id: 4, name: "Bekzod Aliyev", contact: "+998 93 *** 07 81", type: "SAT prep", status: "Enrolled" as Status, last: "Mon", next: "—" },
  { id: 5, name: "Nigora Usmonova", contact: "@nigora_u", type: "IELTS course", status: "Lost" as Status, last: "Last week", next: "—" },
  { id: 6, name: "Sardor Yusupov", contact: "@sardor_y", type: "Programming", status: "New" as Status, last: "Today 11:02", next: "Thu 12:00" },
];

const qa = [
  { q: "How much does the IELTS course cost?", a: "Our IELTS program pricing depends on the group format. I can share the current schedule and fees, or book a free placement test so we can recommend the right level.", next: "Create lead · Send price list · Follow up in 2 days" },
  { q: "Do you have classes on weekends?", a: "Yes, we run weekend groups for several courses. Which subject are you interested in? I'll send available times.", next: "Ask for subject · Tag as ‘Weekend’" },
  { q: "Can my child try a lesson first?", a: "Of course! We offer a trial lesson so you can see the teaching style. Which day works best for you this week?", next: "Schedule trial · Assign to admin" },
];

const tabs = [
  { k: "Dashboard", icon: LayoutDashboard },
  { k: "Leads", icon: Users },
  { k: "AI Assistant", icon: Bot },
  { k: "Tasks", icon: CheckSquare },
  { k: "Analytics", icon: BarChart3 },
  { k: "Settings", icon: Settings },
] as const;
type Tab = (typeof tabs)[number]["k"];

export function ProductDemo() {
  const [tab, setTab] = useState<Tab>("Dashboard");
  const [leads, setLeads] = useState(initialLeads);
  const [tasks, setTasks] = useState([
    { id: 1, t: "Call back Malika about evening IELTS", lead: "Malika Rahimova", date: "Tue 10:00", pr: "High", done: false },
    { id: 2, t: "Send trial lesson times", lead: "Dilnoza Tursunova", date: "Wed 15:30", pr: "Medium", done: false },
    { id: 3, t: "Reply to programming inquiry", lead: "Sardor Yusupov", date: "Thu 12:00", pr: "Medium", done: false },
    { id: 4, t: "Confirm SAT group start date", lead: "Bekzod Aliyev", date: "Mon 09:00", pr: "Low", done: true },
  ]);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current!.style.transform = `rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
  };

  return (
    <div className="[perspective:1600px]">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => ref.current && (ref.current.style.transform = "")}
        className="panel overflow-hidden transition-transform duration-300 ease-out"
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-elevated" /><span className="h-2.5 w-2.5 rounded-full bg-elevated" /><span className="h-2.5 w-2.5 rounded-full bg-elevated" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">app.bizpilot.ai / {tab.toLowerCase()}</span>
          <span className="ml-auto rounded border border-warning/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-warning">Demo data</span>
        </div>
        <div className="grid md:grid-cols-[200px_1fr]">
          <nav className="flex gap-1 overflow-x-auto border-b border-border p-2 md:flex-col md:border-b-0 md:border-r" role="tablist" aria-label="Product sections">
            {tabs.map(({ k, icon: I }) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={`flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${tab === k ? "bg-primary/15 text-foreground shadow-[inset_2px_0_0_var(--primary)]" : "text-muted-foreground hover:bg-elevated/60 hover:text-foreground"}`}
              >
                <I className="h-4 w-4" />{k}
              </button>
            ))}
          </nav>
          <div key={tab} className="min-h-[460px] p-5 animate-in fade-in slide-in-from-bottom-2 duration-300" role="tabpanel">
            {tab === "Dashboard" && <Dashboard leads={leads} tasks={tasks} />}
            {tab === "Leads" && <Leads leads={leads} setLeads={setLeads} />}
            {tab === "AI Assistant" && <Assistant />}
            {tab === "Tasks" && <Tasks tasks={tasks} setTasks={setTasks} />}
            {tab === "Analytics" && <Analytics />}
            {tab === "Settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string | number; hint: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface/60 p-4" title={hint}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}

function Dashboard({ leads, tasks }: { leads: typeof initialLeads; tasks: { done: boolean }[] }) {
  const active = leads.filter((l) => l.status !== "Lost" && l.status !== "Enrolled").length;
  const due = tasks.filter((t) => !t.done).length;
  const trend = [12, 18, 15, 22, 19, 27, 24, 31, 28, 34, 30, 38];
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Total inquiries" value={142} hint="Sample, last 30 days" />
        <Stat label="Active leads" value={active} hint="Updates with Leads tab" />
        <Stat label="Follow-ups due" value={due} hint="Updates with Tasks tab" />
      </div>
      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-lg border border-border bg-surface/60 p-4">
          <p className="text-sm font-medium">Inquiry trend <span className="text-xs text-muted-foreground">· demo</span></p>
          <svg viewBox="0 0 330 120" className="mt-3 w-full" aria-label="Demo inquiry trend chart">
            <defs><linearGradient id="tg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="oklch(0.6 0.2 262 / .5)" /><stop offset="1" stopColor="oklch(0.6 0.2 262 / 0)" /></linearGradient></defs>
            <path d={`M0 120 ${trend.map((v, i) => `L${i * 30} ${110 - v * 2.5}`).join(" ")} L330 120Z`} fill="url(#tg)" />
            <path d={`M${trend.map((v, i) => `${i * 30} ${110 - v * 2.5}`).join(" L")}`} stroke="oklch(0.78 0.11 260)" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="rounded-lg border border-border bg-surface/60 p-4">
          <p className="text-sm font-medium">Lead status</p>
          <div className="mt-3 space-y-2">
            {STATUSES.map((s) => {
              const n = leads.filter((l) => l.status === s).length;
              return (
                <div key={s} className="text-xs">
                  <div className="flex justify-between text-muted-foreground"><span>{s}</span><span>{n}</span></div>
                  <div className="mt-1 h-1.5 rounded bg-elevated"><div className="h-full rounded bg-primary transition-all" style={{ width: `${(n / leads.length) * 100}%` }} /></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-surface/60 p-4 text-sm">
        <p className="font-medium">Recent activity</p>
        <ul className="mt-2 space-y-1.5 text-muted-foreground">
          <li><span className="text-glow">●</span> Sardor Yusupov sent a new inquiry · 11:02</li>
          <li><span className="text-glow">●</span> Reply to Malika reviewed and approved · 09:44</li>
          <li><span className="text-glow">●</span> Follow-up scheduled for Dilnoza · Yesterday</li>
        </ul>
      </div>
    </div>
  );
}

function Leads({ leads, setLeads }: { leads: typeof initialLeads; setLeads: (f: (l: typeof initialLeads) => typeof initialLeads) => void }) {
  const [q, setQ] = useState("");
  const [f, setF] = useState<"All" | Status>("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(
    () => leads.filter((l) => (f === "All" || l.status === f) && (l.name + l.type + l.contact).toLowerCase().includes(q.toLowerCase())),
    [leads, q, f],
  );
  const lead = leads.find((l) => l.id === open);
  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2">
        <label className="flex flex-1 items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search leads…" className="w-full bg-transparent outline-none placeholder:text-muted-foreground" aria-label="Search leads" />
        </label>
        <select value={f} onChange={(e) => setF(e.target.value as typeof f)} className="rounded-md border border-border bg-surface px-3 py-2 text-sm" aria-label="Filter by status">
          <option>All</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs text-muted-foreground"><tr>{["Name", "Contact", "Inquiry", "Status", "Last", "Next follow-up"].map((h) => <th key={h} className="px-2 py-2 font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {list.map((l) => (
              <tr key={l.id} onClick={() => setOpen(l.id)} className="cursor-pointer border-t border-border/60 hover:bg-elevated/40">
                <td className="px-2 py-2.5 font-medium"><button className="text-left">{l.name}</button></td>
                <td className="px-2 text-muted-foreground">{l.contact}</td>
                <td className="px-2 text-soft">{l.type}</td>
                <td className="px-2"><span className={`rounded-full px-2 py-0.5 text-xs ${statusCls[l.status]}`}>{l.status}</span></td>
                <td className="px-2 text-muted-foreground">{l.last}</td>
                <td className="px-2 text-muted-foreground">{l.next}</td>
              </tr>
            ))}
            {!list.length && <tr><td colSpan={6} className="px-2 py-8 text-center text-muted-foreground">No leads match.</td></tr>}
          </tbody>
        </table>
      </div>
      {lead && (
        <div className="absolute inset-y-0 right-0 w-full max-w-xs glass p-4 animate-in slide-in-from-right-4 fade-in">
          <div className="flex items-start justify-between">
            <div><p className="font-semibold">{lead.name}</p><p className="text-xs text-muted-foreground">{lead.contact}</p></div>
            <button onClick={() => setOpen(null)} aria-label="Close lead"><X className="h-4 w-4" /></button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Inquiry</p><p className="text-sm">{lead.type}</p>
          <p className="mt-4 text-xs text-muted-foreground">Change status</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {STATUSES.map((s) => (
              <button key={s} onClick={() => setLeads((ls) => ls.map((x) => (x.id === lead.id ? { ...x, status: s } : x)))}
                className={`rounded-full px-2.5 py-1 text-xs ${lead.status === s ? statusCls[s] + " ring-1 ring-current" : "border border-border text-muted-foreground hover:text-foreground"}`}>
                {s}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Next follow-up</p><p className="text-sm">{lead.next}</p>
        </div>
      )}
    </div>
  );
}

function Assistant() {
  const [i, setI] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const pick = (n: number) => {
    setI(n);
    setTyped("");
    const full = qa[n].a;
    let k = 0;
    const id = setInterval(() => {
      k += 3;
      setTyped(full.slice(0, k));
      if (k >= full.length) clearInterval(id);
    }, 18);
  };
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <p className="text-sm font-medium">Choose a sample customer question</p>
        <div className="mt-3 space-y-2">
          {qa.map((x, n) => (
            <button key={n} onClick={() => pick(n)} className={`w-full rounded-lg border p-3 text-left text-sm transition-colors ${i === n ? "border-primary bg-primary/10" : "border-border hover:border-glow/60"}`}>{x.q}</button>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-border bg-surface/60 p-4">
        {i === null ? (
          <p className="grid h-full place-items-center text-sm text-muted-foreground">Pick a question to see an example reply.</p>
        ) : (
          <div className="space-y-3 text-sm">
            <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-elevated p-3">{qa[i].q}</div>
            <div className="max-w-[90%] rounded-lg rounded-tl-none border border-primary/40 bg-primary/10 p-3">
              <p className="mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-glow"><Bot className="h-3 w-3" />Example draft · not sent</p>
              {typed}<span className="animate-pulse">▍</span>
            </div>
            <div className="rounded-md border border-dashed border-border p-3 text-xs text-muted-foreground"><span className="text-soft">Suggested next action:</span> {qa[i].next}</div>
            <p className="text-[11px] text-muted-foreground">Examples only. This demo is not connected to any business or Telegram account. Replies always require human review.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Tasks({ tasks, setTasks }: { tasks: { id: number; t: string; lead: string; date: string; pr: string; done: boolean }[]; setTasks: (f: (t: typeof tasks) => typeof tasks) => void }) {
  const pr: Record<string, string> = { High: "text-destructive", Medium: "text-warning", Low: "text-muted-foreground" };
  return (
    <div>
      <p className="text-sm text-muted-foreground">{tasks.filter((t) => !t.done).length} open follow-ups</p>
      <ul className="mt-3 space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className={`flex items-center gap-3 rounded-lg border border-border bg-surface/60 p-3 transition-opacity ${t.done ? "opacity-50" : ""}`}>
            <input type="checkbox" checked={t.done} onChange={() => setTasks((ts) => ts.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))} className="h-4 w-4 accent-[var(--primary)]" aria-label={`Mark ${t.t} complete`} />
            <div className="flex-1">
              <p className={`text-sm ${t.done ? "line-through" : ""}`}>{t.t}</p>
              <p className="text-xs text-muted-foreground">{t.lead} · {t.date}</p>
            </div>
            <span className={`text-xs ${pr[t.pr]}`}>{t.pr}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Analytics() {
  const vol = [22, 30, 26, 41, 35, 48, 44];
  const stages = [["New", 38], ["Contacted", 27], ["Interested", 18], ["Enrolled", 11]] as const;
  const cats = [["IELTS", 40], ["Kids English", 22], ["Math", 18], ["SAT", 12], ["Other", 8]] as const;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-lg border border-border bg-surface/60 p-4 lg:col-span-2">
        <p className="text-sm font-medium">Weekly inquiry volume <span className="text-xs text-warning">· demo data</span></p>
        <div className="mt-4 flex h-36 items-end gap-3">
          {vol.map((v, i) => (
            <div key={i} className="group flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] text-glow opacity-0 transition-opacity group-hover:opacity-100">{v}</span>
              <div className="w-full rounded-t bg-gradient-to-t from-primary/30 to-primary transition-all group-hover:to-glow" style={{ height: `${v * 2.4}%` }} />
              <span className="text-[10px] text-muted-foreground">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-border bg-surface/60 p-4">
        <p className="text-sm font-medium">Lead stages</p>
        {stages.map(([s, n], i) => (
          <div key={s} className="mx-auto mt-2 rounded bg-primary/20 py-1.5 text-center text-xs" style={{ width: `${100 - i * 18}%` }}>{s} · {n}</div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-surface/60 p-4">
        <p className="text-sm font-medium">Inquiry categories</p>
        <div className="mt-3 space-y-2">
          {cats.map(([c, n]) => (
            <div key={c} className="flex items-center gap-2 text-xs"><span className="w-24 text-muted-foreground">{c}</span><div className="h-2 flex-1 rounded bg-elevated"><div className="h-full rounded bg-glow" style={{ width: `${n * 2.2}%` }} /></div><span>{n}%</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  const [s, setS] = useState({ review: true, reminders: true, digest: false });
  const rows: [keyof typeof s, string, string][] = [
    ["review", "Require human review of AI replies", "Recommended. Drafts are never sent automatically."],
    ["reminders", "Follow-up reminders", "Show due follow-ups on the dashboard."],
    ["digest", "Daily summary", "A morning overview of new inquiries."],
  ];
  return (
    <div className="space-y-2">
      {rows.map(([k, t, d]) => (
        <label key={k} className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-border bg-surface/60 p-4">
          <span><span className="block text-sm">{t}</span><span className="text-xs text-muted-foreground">{d}</span></span>
          <button role="switch" aria-checked={s[k]} onClick={() => setS({ ...s, [k]: !s[k] })} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${s[k] ? "bg-primary" : "bg-elevated"}`}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-all ${s[k] ? "left-[22px]" : "left-0.5"}`} />
          </button>
        </label>
      ))}
      <p className="pt-2 text-[11px] text-muted-foreground">Demo settings — changes are local to this preview.</p>
    </div>
  );
}
