import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { sfx } from "../audio";
import { useSys } from "../ctx";
import { FILTERS, PROJECTS, type Group, type Project } from "../data";
import { useReveal } from "../hooks";

function Diagram({ p, hot }: { p: Project; hot: boolean }) {
  const { theme } = useSys();
  if (theme === "mecha") {
    return (
      <svg viewBox="0 0 200 76" className="w-full">
        <g style={{ transition: "transform .5s", transform: hot ? "translate(0,-8px)" : "none" }}>
          <rect x="8" y="10" width="54" height="24" fill="none" stroke="rgb(var(--c1))" strokeWidth="1" />
          <text x="35" y="25" fontSize="7" textAnchor="middle" fill="rgb(var(--c1))" fontFamily="monospace">
            UI LAYER
          </text>
        </g>
        <g style={{ transition: "transform .5s .05s", transform: hot ? "translate(10px,0)" : "none" }}>
          <rect x="74" y="26" width="52" height="24" fill="none" stroke="rgb(var(--c2))" strokeWidth="1" />
          <text x="100" y="41" fontSize="7" textAnchor="middle" fill="rgb(var(--c2))" fontFamily="monospace">
            CORE
          </text>
        </g>
        <g style={{ transition: "transform .5s .1s", transform: hot ? "translate(0,8px)" : "none" }}>
          <rect x="138" y="42" width="54" height="24" fill="none" stroke="rgb(var(--c1))" strokeWidth="1" />
          <text x="165" y="57" fontSize="7" textAnchor="middle" fill="rgb(var(--c1))" fontFamily="monospace">
            DATA
          </text>
        </g>
        <path d="M62 22 H74 V38" fill="none" stroke="rgb(var(--c1)/0.7)" strokeWidth="0.8" className="flowline" />
        <path d="M126 38 H138 V54" fill="none" stroke="rgb(var(--c1)/0.7)" strokeWidth="0.8" className="flowline" />
      </svg>
    );
  }
  if (theme === "plasma") {
    return (
      <svg viewBox="0 0 200 76" className="w-full">
        <g transform="translate(100 38)">
          <circle r="28" fill="none" stroke="rgb(var(--c1)/0.5)" strokeWidth="1" />
          <circle r="10" fill="rgb(var(--c1)/0.25)" stroke="rgb(var(--c1))" strokeWidth="1" />
          <circle r="4" fill="rgb(var(--c2))" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={Math.cos(a) * 12}
                y1={Math.sin(a) * 12}
                x2={Math.cos(a) * 34}
                y2={Math.sin(a) * 34}
                stroke="rgb(var(--c2)/0.6)"
                strokeWidth="0.9"
                className="flowline"
              />
            );
          })}
        </g>
        <text x="14" y="16" fontSize="7" fill="rgb(var(--c1))" fontFamily="monospace">
          CORE {p.n}
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 76" className="w-full">
      {[
        [24, 20],
        [72, 48],
        [118, 16],
        [162, 44],
        [96, 66],
      ].map(([x, y], i, arr) => (
        <g key={i}>
          {i < arr.length - 1 && (
            <line
              x1={x}
              y1={y}
              x2={arr[i + 1][0]}
              y2={arr[i + 1][1]}
              stroke="rgb(var(--c1)/0.55)"
              strokeWidth="0.9"
              className="flowline"
            />
          )}
          <circle cx={x} cy={y} r={hot ? 5 : 3.4} fill="rgb(var(--c1)/0.25)" stroke="rgb(var(--c2))" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

function Card({
  p,
  idx,
  register,
  onHot,
  hot,
}: {
  p: Project;
  idx: number;
  register: (id: string, el: HTMLDivElement | null) => void;
  onHot: (id: string | null) => void;
  hot: boolean;
}) {
  const { theme, openProject } = useSys();
  const { ref, inView } = useReveal<HTMLDivElement>(0.15);
  const kind = theme === "mecha" ? "MODULE" : theme === "plasma" ? "REACTOR" : "NODE";

  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-6px)`;
  };

  return (
    <div
      ref={(el) => {
        ref.current = el;
        register(p.id, el);
      }}
      data-hot
      onMouseEnter={() => {
        onHot(p.id);
        sfx.hover();
      }}
      onMouseLeave={(e) => {
        onHot(null);
        e.currentTarget.style.transform = "";
      }}
      onPointerMove={tilt}
      onClick={() => openProject(p)}
      className={`reveal ${inView ? "in" : ""} panel clip-corner noise group relative cursor-pointer overflow-hidden p-0 transition-transform duration-200`}
      style={{
        animationDelay: `${idx * 70}ms`,
        boxShadow: hot ? "0 0 44px rgb(var(--c1)/0.35)" : undefined,
        borderColor: hot ? "rgb(var(--c1)/0.7)" : undefined,
      }}
    >
      <div className="relative h-28 overflow-hidden">
        <img src={p.cover} alt="" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(transparent, rgb(var(--bg0)))" }} />
        <div className="absolute left-3 top-3 clip-tag px-2 py-0.5 text-[8px] font-bold tracking-[0.2em] text-black" style={{ background: "rgb(var(--c1))" }}>
          {p.year}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="t2 text-[9px] tracking-[0.24em]">
              {kind}-{p.n} · {p.cat}
            </div>
            <h3 className="mt-1 font-disp text-[16px] font-bold leading-tight text-white">{p.title}</h3>
          </div>
          <div className="relative grid h-9 w-9 shrink-0 place-items-center text-[10px] font-bold t1">
            <span
              className="absolute inset-0 border a-spin-slow"
              style={{
                borderColor: "rgb(var(--c1)/0.5)",
                borderRadius: theme === "plasma" ? "999px" : "2px",
                borderStyle: theme === "mecha" ? "dashed" : "solid",
              }}
            />
            {p.n}
          </div>
        </div>

        <div className="my-3 border-y py-2" style={{ borderColor: "rgb(var(--c1)/0.18)" }}>
          <Diagram p={p} hot={hot} />
        </div>

        <p className="text-[11.5px] leading-relaxed text-slate-400">{p.desc}</p>

        <div className="mt-3 space-y-1.5">
          {p.metrics.map((m) => (
            <div key={m.k} className="flex items-center gap-2">
              <span className="w-[86px] shrink-0 text-[8.5px] tracking-[0.15em] text-slate-500">{m.k}</span>
              <span className="h-[5px] flex-1 overflow-hidden bg-white/8">
                <span
                  className="block h-full transition-[width] duration-[1200ms] ease-out"
                  style={{
                    width: inView ? `${m.v}%` : "0%",
                    background: "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))",
                    boxShadow: "0 0 10px rgb(var(--c1)/0.8)",
                  }}
                />
              </span>
              <span className="t1 w-7 text-right text-[9px] tabular-nums">{m.v}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span
              key={s}
              className="clip-tag px-2 py-0.5 text-[9px] tracking-wider text-slate-300"
              style={{ background: "rgb(var(--c2)/0.12)", border: "1px solid rgb(var(--c2)/0.26)" }}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="t1 mt-3 text-[10px] font-bold tracking-[0.2em]">INSPECT MODULE →</div>
      </div>
    </div>
  );
}

function GraphView({
  list,
  hot,
  setHot,
}: {
  list: Project[];
  hot: string | null;
  setHot: (id: string | null) => void;
}) {
  const { openProject, theme } = useSys();
  return (
    <div className="panel hud-frame relative h-[520px] overflow-hidden">
      <span className="hud-tr" />
      <span className="hud-bl" />
      <svg className="absolute inset-0 h-full w-full">
        {list.flatMap((p) =>
          p.links
            .filter((id) => list.some((x) => x.id === id))
            .map((id) => {
              const b = PROJECTS.find((x) => x.id === id)!;
              const active = hot === p.id || hot === id;
              return (
                <line
                  key={p.id + id}
                  x1={`${p.x}%`}
                  y1={`${p.y}%`}
                  x2={`${b.x}%`}
                  y2={`${b.y}%`}
                  stroke="rgb(var(--c1))"
                  strokeWidth={active ? 1.8 : 0.8}
                  opacity={active ? 0.85 : 0.25}
                  className="flowline"
                />
              );
            })
        )}
      </svg>
      {list.map((p) => (
        <button
          key={p.id}
          data-hot
          onMouseEnter={() => setHot(p.id)}
          onMouseLeave={() => setHot(null)}
          onClick={() => openProject(p)}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <span
            className="flex items-center gap-2 px-2.5 py-1.5 text-[10px] font-bold tracking-wide text-white"
            style={{
              background: "rgb(var(--bg0)/0.85)",
              border: `1px solid rgb(var(--c1)/${hot === p.id ? 0.9 : 0.4})`,
              boxShadow: hot === p.id ? "0 0 24px rgb(var(--c1)/0.45)" : "none",
              borderRadius: theme === "plasma" ? 999 : 2,
            }}
          >
            <span className="t1">{p.n}</span>
            {p.title}
          </span>
        </button>
      ))}
    </div>
  );
}

function Modal() {
  const { project, openProject, theme, askAI } = useSys();
  if (!project) return null;
  const p = project;
  const related = PROJECTS.filter((x) => p.links.includes(x.id) || x.links.includes(p.id));
  return (
    <div
      className="fixed inset-0 z-[57] grid place-items-center bg-black/70 px-4 py-8 backdrop-blur-sm"
      onClick={() => openProject(null)}
    >
      <div
        className="panel hud-frame noise relative max-h-[88vh] w-full max-w-3xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="hud-tr" />
        <span className="hud-bl" />
        <div className="relative h-48 overflow-hidden sm:h-64">
          <img src={p.cover} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 30%, rgb(var(--bg0)))" }} />
          <button
            onClick={() => openProject(null)}
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center text-white"
            style={{ background: "rgb(var(--bg0)/0.7)", border: "1px solid rgb(var(--c1)/0.4)" }}
          >
            ×
          </button>
          <div className="absolute bottom-4 left-5">
            <div className="t2 text-[10px] tracking-[0.24em]">
              {p.cat} · {p.year} · {p.n}
            </div>
            <h3 className="font-disp text-3xl font-extrabold text-white">{p.title}</h3>
          </div>
        </div>
        <div className="grid gap-6 p-5 sm:grid-cols-[1.3fr_0.9fr]">
          <div>
            <p className="text-[13px] leading-relaxed text-slate-300">{p.long}</p>
            <div className="mt-4">
              <Diagram p={p} hot />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="clip-tag px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-black"
                style={{ background: "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))" }}
              >
                OPEN SOURCE ↗
              </a>
              <button
                onClick={() => askAI(p.title + " architecture")}
                className="clip-tag t1 px-4 py-2 text-[10px] font-bold tracking-[0.18em]"
                style={{ border: "1px solid rgb(var(--c1)/0.5)" }}
              >
                ASK {theme === "mecha" ? "DRAFT-BOT" : theme === "plasma" ? "CORE-AI" : "Q-ORACLE"}
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {p.metrics.map((m) => (
              <div key={m.k} className="border px-3 py-2" style={{ borderColor: "rgb(var(--c1)/0.22)" }}>
                <div className="flex justify-between text-[10px] tracking-[0.16em] text-slate-500">
                  <span>{m.k}</span>
                  <span className="t1">{m.v}</span>
                </div>
                <div className="mt-1 h-1.5 bg-white/10">
                  <div
                    className="h-full"
                    style={{
                      width: `${m.v}%`,
                      background: "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))",
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="clip-tag px-2 py-0.5 text-[9px] text-slate-300"
                  style={{ background: "rgb(var(--c2)/0.12)", border: "1px solid rgb(var(--c2)/0.26)" }}
                >
                  {s}
                </span>
              ))}
            </div>
            {related.length > 0 && (
              <div>
                <div className="mb-2 text-[9px] tracking-[0.22em] text-slate-500">LINKED NODES</div>
                {related.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => openProject(r)}
                    className="mb-1 block w-full truncate border px-2 py-1.5 text-left text-[11px] text-slate-300"
                    style={{ borderColor: "rgb(var(--c1)/0.2)" }}
                  >
                    {r.n} · {r.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectGrid() {
  const { theme } = useSys();
  const wrap = useRef<HTMLDivElement | null>(null);
  const nodes = useRef<Record<string, HTMLDivElement | null>>({});
  const [lines, setLines] = useState<{ a: string; b: string; d: string }[]>([]);
  const [hot, setHot] = useState<string | null>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [filter, setFilter] = useState<"all" | Group>("all");
  const [mode, setMode] = useState<"tiles" | "graph">("tiles");

  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.group === filter);

  const register = useCallback((id: string, el: HTMLDivElement | null) => {
    nodes.current[id] = el;
  }, []);

  const measure = useCallback(() => {
    const c = wrap.current;
    if (!c || mode !== "tiles") return;
    const cb = c.getBoundingClientRect();
    setBox({ w: cb.width, h: cb.height });
    const out: { a: string; b: string; d: string }[] = [];
    for (const p of list) {
      const ea = nodes.current[p.id];
      if (!ea) continue;
      const ra = ea.getBoundingClientRect();
      const ax = ra.left - cb.left + ra.width / 2;
      const ay = ra.top - cb.top + ra.height / 2;
      for (const l of p.links) {
        if (!list.some((x) => x.id === l)) continue;
        const eb = nodes.current[l];
        if (!eb) continue;
        const rb = eb.getBoundingClientRect();
        const bx = rb.left - cb.left + rb.width / 2;
        const by = rb.top - cb.top + rb.height / 2;
        const mx = (ax + bx) / 2;
        out.push({ a: p.id, b: l, d: `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}` });
      }
    }
    setLines(out);
  }, [list, mode]);

  useLayoutEffect(() => {
    measure();
  }, [measure, theme, filter, mode]);

  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    if (wrap.current) ro.observe(wrap.current);
    window.addEventListener("resize", measure);
    const t1 = setTimeout(measure, 400);
    const t2 = setTimeout(measure, 1200);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [measure]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setFilter(f.id);
                sfx.tick();
              }}
              className="clip-tag px-2.5 py-1 text-[9px] font-bold tracking-[0.16em]"
              style={{
                background: filter === f.id ? "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))" : "rgb(255 255 255 / 0.04)",
                color: filter === f.id ? "#000" : "rgb(148 163 184)",
                border: "1px solid rgb(var(--c1)/0.25)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {(["tiles", "graph"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                sfx.tick();
              }}
              className="px-2.5 py-1 text-[9px] font-bold tracking-[0.16em]"
              style={{
                background: mode === m ? "rgb(var(--c1)/0.2)" : "transparent",
                color: mode === m ? "rgb(var(--c1))" : "rgb(148 163 184)",
                border: "1px solid rgb(var(--c1)/0.25)",
              }}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {mode === "graph" ? (
        <GraphView list={list} hot={hot} setHot={setHot} />
      ) : (
        <div ref={wrap} className="relative">
          <svg className="pointer-events-none absolute inset-0 hidden md:block" width={box.w} height={box.h} style={{ zIndex: 0 }}>
            {lines.map((l, i) => {
              const active = hot === l.a || hot === l.b;
              return (
                <g key={i}>
                  <path
                    d={l.d}
                    fill="none"
                    stroke="rgb(var(--c1))"
                    strokeWidth={active ? 1.6 : 0.8}
                    opacity={active ? 0.75 : 0.22}
                  />
                  <path d={l.d} fill="none" stroke="rgb(var(--c2))" strokeWidth={active ? 2.4 : 1.2} opacity={active ? 0.9 : 0.3} className="flowline" />
                </g>
              );
            })}
          </svg>
          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ zIndex: 1 }}>
            {list.map((p, i) => (
              <Card key={p.id} p={p} idx={i} register={register} hot={hot === p.id} onHot={setHot} />
            ))}
          </div>
        </div>
      )}
      <Modal />
    </div>
  );
}
