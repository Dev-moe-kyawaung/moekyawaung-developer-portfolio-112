import { useEffect, useState } from "react";
import { APPS, GALLERY, LOVABLE, METHOD, PRINCIPLES, PROFILE, SKILLS, TECH, THEMES, TIMELINE } from "../data";
import { useSys } from "../ctx";
import { useReveal } from "../hooks";
import { sfx } from "../audio";

export function SectionTitle({
  index,
  title,
  sub,
}: {
  index: string;
  title: string;
  sub: string;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={`reveal ${inView ? "in" : ""} mb-8`}>
      <div className="flex items-center gap-3">
        <span
          className="clip-tag px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] text-black"
          style={{ background: "rgb(var(--c2))" }}
        >
          {index}
        </span>
        <h2 className="font-disp text-[clamp(1.35rem,3.4vw,2.2rem)] font-extrabold tracking-tight text-white">
          {title}
        </h2>
        <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgb(var(--c1)/0.6), transparent)" }} />
      </div>
      <p className="mt-1.5 pl-9 text-[11px] tracking-[0.16em] text-slate-500">{sub}</p>
    </div>
  );
}

export function Marquee() {
  const row = [...TECH, ...TECH];
  return (
    <div className="relative overflow-hidden border-y py-3" style={{ borderColor: "rgb(var(--c1)/0.18)" }}>
      <div className="marquee-track gap-8 pr-8">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 text-[11px] tracking-[0.28em] text-slate-400">
            <span className="t1">{THEMES.quantum.icon}</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CoreStatus() {
  const { theme } = useSys();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1300);
    return () => clearInterval(id);
  }, []);
  const rnd = (base: number, spread: number) => (base + Math.sin(tick * 1.7 + base) * spread).toFixed(1);
  const readouts = [
    { k: theme === "mecha" ? "TORQUE" : theme === "plasma" ? "CORE TEMP" : "COHERENCE", v: rnd(87, 6), u: theme === "plasma" ? "MK" : "%" },
    { k: theme === "mecha" ? "TOLERANCE" : theme === "plasma" ? "FLUX" : "ENTROPY", v: rnd(12, 3), u: theme === "mecha" ? "µm" : "TW" },
    { k: "UPTIME", v: rnd(99, 0.4), u: "%" },
    { k: theme === "mecha" ? "RPM" : theme === "plasma" ? "RPM" : "QUBITS", v: rnd(64, 9), u: "" },
  ];

  return (
    <div className="panel hud-frame clip-corner noise relative overflow-hidden p-5">
      <span className="hud-tr" />
      <span className="hud-bl" />
      <div className="mb-3 flex items-center justify-between">
        <span className="t1 font-hud text-[10px] font-bold tracking-[0.24em]">
          {theme === "mecha" ? "DRIVE ASSEMBLY" : theme === "plasma" ? "REACTOR CORE Σ" : "QUANTUM CORE"}
        </span>
        <span className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg1" style={{ animation: "blip 1.2s infinite" }} />
          LIVE
        </span>
      </div>
      <div className="relative mx-auto h-[190px] w-[190px]">
        <svg viewBox="0 0 200 200" className="absolute inset-0">
          <circle cx="100" cy="100" r="92" fill="none" stroke="rgb(var(--c1)/0.18)" strokeWidth="1" />
          <g className="a-spin-slow" style={{ transformOrigin: "100px 100px" }}>
            <circle cx="100" cy="100" r="78" fill="none" stroke="rgb(var(--c1)/0.6)" strokeWidth="1.4" strokeDasharray="30 14" />
          </g>
          <g className="a-spin-rev" style={{ transformOrigin: "100px 100px" }}>
            <circle cx="100" cy="100" r="62" fill="none" stroke="rgb(var(--c2)/0.7)" strokeWidth="1" strokeDasharray="4 10" />
          </g>
          <g className="a-spin-med" style={{ transformOrigin: "100px 100px" }}>
            <polygon
              points={Array.from({ length: 6 })
                .map((_, k) => {
                  const a = (k / 6) * Math.PI * 2;
                  return `${100 + Math.cos(a) * 38},${100 + Math.sin(a) * 38}`;
                })
                .join(" ")}
              fill="rgb(var(--c1)/0.08)"
              stroke="rgb(var(--c1))"
              strokeWidth="1.2"
            />
          </g>
          <circle cx="100" cy="100" r="20" fill="rgb(var(--c1)/0.28)" />
          <circle cx="100" cy="100" r="11" fill="rgb(var(--c2))" />
        </svg>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {readouts.map((r) => (
          <div key={r.k} className="border px-2.5 py-1.5" style={{ borderColor: "rgb(var(--c1)/0.2)", background: "rgb(var(--bg0)/0.5)" }}>
            <div className="text-[8px] tracking-[0.2em] text-slate-500">{r.k}</div>
            <div className="t1 font-hud text-[13px] font-bold tabular-nums">
              {r.v}
              <span className="ml-0.5 text-[8px] opacity-70">{r.u}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const { theme } = useSys();
  const { ref, inView } = useReveal<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className="grid gap-6 md:grid-cols-[1.35fr_1fr]">
      <div className="space-y-3.5">
        {SKILLS.map((s, i) => (
          <div key={s.name} className={`reveal ${inView ? "in" : ""}`} style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-end justify-between">
              <span className="text-[12px] font-bold tracking-wide text-slate-200">{s.name}</span>
              <span className="t1 text-[11px] tabular-nums">{s.v}%</span>
            </div>
            <div className="mt-1 text-[9px] tracking-[0.14em] text-slate-500">{s.note}</div>
            <div className="mt-1.5 h-[7px] w-full overflow-hidden" style={{ background: "rgb(255 255 255 / 0.07)" }}>
              <div
                className="h-full transition-[width] duration-[1400ms] ease-out"
                style={{
                  width: inView ? `${s.v}%` : "0%",
                  background:
                    theme === "mecha"
                      ? "repeating-linear-gradient(90deg, rgb(var(--c1)) 0 6px, rgb(var(--c1)/0.35) 6px 10px)"
                      : "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))",
                  boxShadow: "0 0 14px rgb(var(--c1)/0.7)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <CoreStatus />
    </div>
  );
}

export function Method() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className="mt-10 grid gap-6 lg:grid-cols-2">
      <div>
        <div className="t2 mb-4 text-[10px] tracking-[0.24em]">OPERATING PRINCIPLES</div>
        <div className="grid gap-3 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.n}
              className={`reveal ${inView ? "in" : ""} panel clip-corner p-4`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="t1 font-hud text-[11px]">{p.n}</div>
              <div className="mt-1 font-disp text-[14px] font-bold text-white">{p.t}</div>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-400">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="t2 mb-4 text-[10px] tracking-[0.24em]">BUILD METHOD</div>
        <div className="relative pl-8">
          <span className="absolute left-[11px] top-1 h-[calc(100%-12px)] w-px" style={{ background: "linear-gradient(rgb(var(--c1)), rgb(var(--c2)/0.1))" }} />
          {METHOD.map((m, i) => (
            <div key={m.n} className={`reveal ${inView ? "in" : ""} relative mb-5`} style={{ animationDelay: `${i * 90}ms` }}>
              <span className="absolute -left-[27px] top-1 h-3 w-3 glow-sm" style={{ background: "rgb(var(--c1))", clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)" }} />
              <div className="font-disp text-[15px] font-bold text-white">
                {m.n} · {m.t}
              </div>
              <p className="mt-1 text-[12px] text-slate-400">{m.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Timeline() {
  const { theme } = useSys();
  const { ref, inView } = useReveal<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className="relative pl-6">
      <span className="absolute left-[7px] top-1 h-full w-px" style={{ background: "linear-gradient(rgb(var(--c1)), rgb(var(--c2)/0.1))" }} />
      {TIMELINE.map((t, i) => (
        <div key={t.y} className={`reveal ${inView ? "in" : ""} relative mb-7`} style={{ animationDelay: `${i * 110}ms` }}>
          <span
            className="absolute -left-[23px] top-1 h-3.5 w-3.5 glow-sm"
            style={{
              background: "rgb(var(--c1))",
              clipPath:
                theme === "mecha"
                  ? "polygon(50% 0,100% 50%,50% 100%,0 50%)"
                  : theme === "plasma"
                  ? "circle(50%)"
                  : "polygon(50% 0,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)",
            }}
          />
          <div className="t2 font-hud text-[10px] font-bold tracking-[0.26em]">{t.y}</div>
          <div className="mt-0.5 font-disp text-[16px] font-bold text-white">{t.t}</div>
          <p className="mt-1 max-w-2xl text-[11.5px] leading-relaxed text-slate-400">{t.d}</p>
        </div>
      ))}
    </div>
  );
}

export function AppMatrix() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.1);
  return (
    <div>
      <div ref={ref} className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {APPS.map((a, i) => (
          <div
            key={a}
            className={`reveal ${inView ? "in" : ""} panel clip-corner group px-2.5 py-3 text-center transition hover:-translate-y-1`}
            style={{ animationDelay: `${i * 45}ms` }}
          >
            <div className="t2 text-[8px] tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</div>
            <div className="mt-1 text-[10.5px] font-bold leading-tight text-slate-200 group-hover:text-white">{a}</div>
            <div className="mx-auto mt-2 h-[3px] w-0 transition-all duration-500 group-hover:w-full" style={{ background: "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))" }} />
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="t2 mb-3 text-[10px] tracking-[0.24em]">LOVABLE SURFACES</div>
        <div className="flex flex-wrap gap-2">
          {LOVABLE.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="clip-tag px-3 py-1.5 text-[10px] tracking-wider text-slate-300 transition hover:text-white"
              style={{ background: "rgb(var(--c2)/0.1)", border: "1px solid rgb(var(--c2)/0.28)" }}
            >
              {l.name} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Studio() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.1);
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div ref={ref}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {GALLERY.map((g, i) => (
          <button
            key={g.src}
            onClick={() => {
              setOpen(i);
              sfx.open();
            }}
            className={`reveal ${inView ? "in" : ""} hud-frame group relative overflow-hidden`}
            style={{ animationDelay: `${i * 50}ms`, aspectRatio: i === 0 ? "1/1" : "4/5" }}
          >
            <span className="hud-tr" />
            <span className="hud-bl" />
            <img src={g.src} alt={g.cap} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-2 text-left text-[9px] tracking-[0.18em] text-slate-200">
              {g.cap}
            </div>
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="fixed inset-0 z-[57] grid place-items-center bg-black/80 p-6" onClick={() => setOpen(null)}>
          <div className="text-center">
            <img src={GALLERY[open].src} alt="" className="max-h-[82vh] max-w-full object-contain" style={{ boxShadow: "0 0 80px rgb(var(--c1)/0.35)" }} />
            <div className="mt-3 t1 text-[11px] tracking-[0.24em]">{GALLERY[open].cap}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Contact() {
  const { theme } = useSys();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", note: "" });
  return (
    <div className="panel hud-frame clip-corner noise relative overflow-hidden p-6 sm:p-9">
      <span className="hud-tr" />
      <span className="hud-bl" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-2xl" style={{ background: "rgb(var(--c1))" }} />
      <div className="relative grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="t2 text-[10px] tracking-[0.26em]">
            {theme === "mecha" ? "REQUEST FOR QUOTATION" : theme === "plasma" ? "OPEN A CHANNEL" : "ENTANGLE WITH ME"}
          </div>
          <h3 className="mt-2 font-disp text-[clamp(1.4rem,4vw,2.5rem)] font-extrabold leading-tight text-white">
            Let's build something
            <br />
            <span className="t1 txt-glow">absurdly well engineered.</span>
          </h3>
          <p className="mt-3 max-w-md text-[12px] leading-relaxed text-slate-400">
            Available for senior frontend, full-stack and performance-rescue engagements. Remote-first, {PROFILE.location}.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="clip-tag px-5 py-2.5 text-[11px] font-bold tracking-[0.18em] text-black"
              style={{ background: "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))" }}
            >
              GITHUB PROFILE ↗
            </a>
            <a
              href={PROFILE.gravatar}
              target="_blank"
              rel="noreferrer"
              className="clip-tag t1 px-5 py-2.5 text-[11px] font-bold tracking-[0.18em]"
              style={{ border: "1px solid rgb(var(--c1)/0.5)" }}
            >
              GRAVATAR ↗
            </a>
          </div>

          <form
            className="mt-6 space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              sfx.burst();
            }}
          >
            <div className="t2 text-[9px] tracking-[0.22em]">TRANSMIT A BRIEF</div>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="name / studio"
              className="w-full bg-transparent px-3 py-2 text-[12px] text-white outline-none"
              style={{ border: "1px solid rgb(var(--c1)/0.25)" }}
            />
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="what should we build?"
              rows={3}
              className="w-full bg-transparent px-3 py-2 text-[12px] text-white outline-none"
              style={{ border: "1px solid rgb(var(--c1)/0.25)" }}
            />
            <button
              type="submit"
              className="clip-tag px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-black"
              style={{ background: "rgb(var(--c1))" }}
            >
              {sent ? "SIGNAL QUEUED" : "QUEUE SIGNAL"}
            </button>
          </form>
        </div>

        <div className="space-y-2">
          {[
            { k: "HANDLE", v: PROFILE.handle },
            { k: "PHONE A", v: PROFILE.phones[0] },
            { k: "PHONE B", v: PROFILE.phones[1] },
            { k: "TIMEZONE", v: "GMT+6:30 · async friendly" },
            { k: "STATUS", v: "OPEN FOR CONTRACTS" },
          ].map((r) => (
            <div
              key={r.k}
              className="flex items-center justify-between border px-3 py-2 text-[11px]"
              style={{ borderColor: "rgb(var(--c1)/0.22)", background: "rgb(var(--bg0)/0.5)" }}
            >
              <span className="text-[9px] tracking-[0.2em] text-slate-500">{r.k}</span>
              <span className="t1 font-bold">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
