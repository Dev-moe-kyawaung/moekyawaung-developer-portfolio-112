import { useEffect, useRef, useState } from "react";
import { sfx } from "../audio";
import { useSys } from "../ctx";
import {
  ACHIEVEMENTS,
  FAQ,
  SERVICES,
  STACK_ORBIT,
  TECH,
  TESTIMONIALS,
  THEMES,
} from "../data";
import { useCountUp, useReveal } from "../hooks";

/* ---------- Services with 3D flip ---------- */
export function Services() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.12);
  const [flip, setFlip] = useState<number | null>(null);
  const { askAI } = useSys();
  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICES.map((s, i) => (
        <div
          key={s.n}
          className={`reveal ${inView ? "in" : ""} relative h-[248px]`}
          style={{ animationDelay: `${i * 90}ms`, perspective: "1200px" }}
          onMouseEnter={() => {
            setFlip(i);
            sfx.hover();
          }}
          onMouseLeave={() => setFlip(null)}
        >
          <div className={`flip3d relative h-full w-full ${flip === i ? "flipped" : ""}`}>
            <div className="flip-face panel hud-frame clip-corner noise absolute inset-0 flex flex-col p-5">
              <span className="hud-tr" />
              <span className="hud-bl" />
              <div className="flex items-center justify-between">
                <span className="t1 text-3xl">{s.icon}</span>
                <span
                  className="clip-tag px-2 py-0.5 text-[8px] font-bold tracking-[0.2em] text-black"
                  style={{ background: "rgb(var(--c2))" }}
                >
                  {s.price}
                </span>
              </div>
              <div className="t2 mt-4 text-[9px] tracking-[0.24em]">SVC-{s.n}</div>
              <h3 className="mt-1 font-disp text-[16px] font-bold leading-tight text-white">{s.title}</h3>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="clip-tag px-2 py-0.5 text-[8.5px] tracking-wider text-slate-300"
                    style={{ background: "rgb(var(--c1)/0.1)", border: "1px solid rgb(var(--c1)/0.25)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-[9px] tracking-[0.18em] text-slate-500">HOVER TO EXPAND →</div>
            </div>
            <div
              className="flip-face flip-back panel clip-corner absolute inset-0 flex flex-col p-5"
              style={{ background: "linear-gradient(155deg, rgb(var(--c1)/0.14), rgb(var(--bg0)/0.9))" }}
            >
              <div className="t1 text-[9px] tracking-[0.24em]">SVC-{s.n} · DETAIL</div>
              <p className="mt-3 text-[12px] leading-relaxed text-slate-200">{s.d}</p>
              <button
                onClick={() => askAI(s.title + " architecture")}
                className="clip-tag mt-auto px-3 py-2 text-[9.5px] font-bold tracking-[0.16em] text-black"
                style={{ background: "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))" }}
              >
                MAP THIS SYSTEM ▸
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Achievement badges with count-up ---------- */
function Badge({ a, i, run }: { a: (typeof ACHIEVEMENTS)[number]; i: number; run: boolean }) {
  const v = useCountUp(a.v, run);
  return (
    <div className={`panel clip-corner p-4 text-center ${run ? "badge-pop" : "opacity-0"}`} style={{ animationDelay: `${i * 80}ms` }}>
      <div className="t1 font-hud text-3xl font-bold txt-glow tabular-nums">
        {v}
        <span className="text-base opacity-70">{a.s}</span>
      </div>
      <div className="mt-1 text-[9px] font-bold tracking-[0.18em] text-slate-200">{a.k}</div>
      <div className="mt-0.5 text-[8.5px] tracking-[0.12em] text-slate-500">{a.note}</div>
    </div>
  );
}

export function Achievements() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {ACHIEVEMENTS.map((a, i) => (
        <Badge key={a.k} a={a} i={i} run={inView} />
      ))}
    </div>
  );
}

/* ---------- Stack orbit ---------- */
export function StackOrbit() {
  const { theme } = useSys();
  const { ref, inView } = useReveal<HTMLDivElement>(0.2);
  const rings = [0, 1, 2, 3];
  return (
    <div ref={ref} className="grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
      <div className={`reveal ${inView ? "in" : ""}`}>
        <div className="t2 text-[10px] tracking-[0.24em]">CORE STACK · LIVE ORBIT</div>
        <h3 className="mt-2 font-disp text-2xl font-extrabold text-white">
          Tools chosen by <span className="t1">constraint</span>, not hype.
        </h3>
        <p className="mt-3 max-w-md text-[12px] leading-relaxed text-slate-400">
          Every layer earns its place. Inner rings run on every request; outer rings ignite only when the
          problem demands them.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {TECH.slice(0, 12).map((t) => (
            <span
              key={t}
              className="clip-tag px-2.5 py-1 text-[9px] tracking-wider text-slate-300"
              style={{ background: "rgb(var(--c1)/0.08)", border: "1px solid rgb(var(--c1)/0.22)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto h-[340px] w-[340px]">
        {rings.map((r) => (
          <div
            key={r}
            className="absolute rounded-full border"
            style={{
              inset: `${r * 42}px`,
              borderColor: "rgb(var(--c1)/0.2)",
              borderStyle: theme === "mecha" ? "dashed" : "solid",
            }}
          />
        ))}
        <div className="absolute inset-[38%] rounded-full">
          <div className="conic-ring absolute -inset-4 rounded-full opacity-70" />
          <div
            className="absolute inset-0 grid place-items-center rounded-full glow-md"
            style={{ background: "radial-gradient(circle at 35% 30%, #fff, rgb(var(--c1)) 50%, rgb(var(--c2)))" }}
          >
            <span className="font-hud text-lg text-black">{THEMES[theme].icon}</span>
          </div>
        </div>
        {STACK_ORBIT.map((s) => {
          const same = STACK_ORBIT.filter((x) => x.ring === s.ring);
          const idx = same.indexOf(s);
          const step = 360 / same.length;
          const radius = 42 + s.ring * 42;
          const dur = 22 + s.ring * 8;
          return (
            <div
              key={s.name}
              className="absolute inset-0"
              style={{ animation: `conic-spin ${dur}s linear infinite`, animationDelay: `${-idx * (dur / same.length)}s` }}
            >
              <span
                className="absolute left-1/2 top-1/2 whitespace-nowrap px-1.5 py-0.5 text-[8.5px] font-bold tracking-wider text-white"
                style={{
                  transform: `rotate(${idx * step}deg) translateX(${radius + 130}px) rotate(-${idx * step}deg) translate(-50%,-50%)`,
                  background: "rgb(var(--bg0)/0.85)",
                  border: `1px solid rgb(var(--c${(s.ring % 2) + 1})/0.5)`,
                }}
              >
                {s.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Testimonials carousel ---------- */
export function Testimonials() {
  const [i, setI] = useState(0);
  const { ref, inView } = useReveal<HTMLDivElement>(0.2);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    timer.current = window.setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5200);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [inView]);

  const t = TESTIMONIALS[i];
  return (
    <div ref={ref} className={`reveal ${inView ? "in" : ""}`}>
      <div className="panel hud-frame noise relative overflow-hidden p-7 sm:p-10">
        <span className="hud-tr" />
        <span className="hud-bl" />
        <div className="pointer-events-none absolute -left-10 -top-10 select-none font-disp text-[10rem] leading-none opacity-10 t1">
          “
        </div>
        <div className="relative min-h-[130px]">
          <p key={i} className="font-disp text-[clamp(1rem,2.4vw,1.5rem)] font-semibold leading-relaxed text-slate-100" style={{ animation: "riseFade .6s both" }}>
            {t.quote}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center font-hud text-[11px] text-black" style={{ background: "linear-gradient(135deg, rgb(var(--c1)), rgb(var(--c2)))" }}>
              {t.name[0]}
            </span>
            <div>
              <div className="t1 text-[12px] font-bold">{t.name}</div>
              <div className="text-[10px] tracking-[0.16em] text-slate-500">{t.role}</div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          {TESTIMONIALS.map((_, n) => (
            <button
              key={n}
              onClick={() => {
                setI(n);
                sfx.tick();
              }}
              className="h-1.5 transition-all"
              style={{
                width: n === i ? 32 : 12,
                background: n === i ? "rgb(var(--c1))" : "rgb(255 255 255 / 0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- FAQ accordion ---------- */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, inView } = useReveal<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className="mx-auto max-w-3xl space-y-2.5">
      {FAQ.map((f, i) => {
        const on = open === i;
        return (
          <div
            key={f.q}
            className={`reveal ${inView ? "in" : ""} panel clip-corner overflow-hidden`}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <button
              onClick={() => {
                setOpen(on ? null : i);
                sfx.tick();
              }}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <span className="flex items-center gap-3">
                <span className="t1 font-hud text-[11px]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[13px] font-bold text-white">{f.q}</span>
              </span>
              <span className="t2 text-lg transition-transform" style={{ transform: on ? "rotate(45deg)" : "none" }}>
                +
              </span>
            </button>
            <div className="grid transition-all duration-300" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="px-4 pb-4 pl-11 text-[12px] leading-relaxed text-slate-400">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Scroll rail ---------- */
const RAIL = [
  { id: "top", l: "INTRO" },
  { id: "signal", l: "CINEMA" },
  { id: "nodes", l: "WORK" },
  { id: "services", l: "SERVICES" },
  { id: "systems", l: "SYSTEMS" },
  { id: "sky", l: "ORBIT" },
  { id: "voices", l: "VOICES" },
  { id: "studio", l: "STUDIO" },
  { id: "faq", l: "FAQ" },
  { id: "link", l: "CONTACT" },
];

export function ScrollRail() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    RAIL.forEach((r) => {
      const el = document.getElementById(r.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <div className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2.5 2xl:flex">
      {RAIL.map((r) => {
        const on = active === r.id;
        return (
          <a key={r.id} href={`#${r.id}`} className="group flex items-center justify-end gap-2">
            <span
              className="text-[8px] tracking-[0.2em] opacity-0 transition group-hover:opacity-100"
              style={{ color: on ? "rgb(var(--c1))" : "rgb(148 163 184)" }}
            >
              {r.l}
            </span>
            <span
              className="block h-1.5 transition-all"
              style={{
                width: on ? 22 : 8,
                background: on ? "rgb(var(--c1))" : "rgb(255 255 255 / 0.25)",
                boxShadow: on ? "0 0 10px rgb(var(--c1))" : "none",
              }}
            />
          </a>
        );
      })}
    </div>
  );
}

/* ---------- Big CTA band ---------- */
export function CtaBand() {
  const { setCmd } = useSys();
  const { ref, inView } = useReveal<HTMLDivElement>(0.3);
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} relative overflow-hidden py-16 text-center`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 aurora" style={{ background: "radial-gradient(600px 300px at 50% 50%, rgb(var(--c1)/0.2), transparent 70%)" }} />
      <div className="font-hud text-[10px] tracking-[0.4em] t2">READY WHEN YOU ARE</div>
      <h2 className="mx-auto mt-3 max-w-3xl font-disp text-[clamp(1.8rem,5vw,3.4rem)] font-extrabold leading-[0.95] text-white">
        Bring the hardest part of your product.
        <br />
        <span className="t1 txt-glow">I'll make it feel effortless.</span>
      </h2>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <a
          href="#link"
          className="clip-tag px-6 py-3 text-[12px] font-bold tracking-[0.18em] text-black"
          style={{ background: "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))" }}
        >
          START A PROJECT ↗
        </a>
        <button
          onClick={() => setCmd(true)}
          className="clip-tag t1 px-6 py-3 text-[12px] font-bold tracking-[0.18em]"
          style={{ border: "1px solid rgb(var(--c1)/0.5)" }}
        >
          OPEN COMMAND /
        </button>
      </div>
    </div>
  );
}
