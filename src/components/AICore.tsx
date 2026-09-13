import { useEffect, useMemo, useRef, useState } from "react";
import { sfx } from "../audio";
import { useSys } from "../ctx";
import { AI_ANSWERS, AI_FALLBACK, AI_PROMPTS, type AiAnswer, type ThemeKey } from "../data";

function resolve(q: string): AiAnswer {
  const s = q.toLowerCase();
  let best: AiAnswer | null = null;
  let score = 0;
  for (const a of AI_ANSWERS) {
    const sc = a.match.reduce((n, m) => n + (s.includes(m) ? 1 : 0), 0);
    if (sc > score) {
      score = sc;
      best = a;
    }
  }
  return best ?? AI_FALLBACK;
}

const LABEL: Record<ThemeKey, { title: string; sub: string; cta: string }> = {
  quantum: { title: "Q-ORACLE", sub: "entanglement graph synthesiser", cta: "COLLAPSE" },
  mecha: { title: "DRAFT-BOT", sub: "blueprint schematic generator", cta: "PLOT" },
  plasma: { title: "CORE-AI", sub: "energy circuit visualiser", cta: "IGNITE" },
};

function Burst({ fire, theme }: { fire: number; theme: ThemeKey }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const ps = useRef<{ x: number; y: number; vx: number; vy: number; l: number }[]>([]);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const S = 180;
    cv.width = S * 2;
    cv.height = S * 2;
    ctx.scale(2, 2);
    let raf = 0;
    const col = theme === "quantum" ? "34,211,238" : theme === "mecha" ? "251,191,36" : "255,94,166";
    const loop = () => {
      ctx.clearRect(0, 0, S, S);
      ps.current = ps.current.filter((p) => p.l > 0);
      for (const p of ps.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.l -= 0.018;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8 * p.l + 0.4, 0, 6.284);
        ctx.fillStyle = `rgba(${col},${p.l})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [theme]);

  useEffect(() => {
    if (!fire) return;
    for (let i = 0; i < 46; i++) {
      const a = Math.random() * 6.283;
      const sp = 1 + Math.random() * 4.2;
      ps.current.push({ x: 90, y: 90, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, l: 1 });
    }
  }, [fire]);

  return <canvas ref={ref} className="pointer-events-none absolute -left-[52px] -top-[52px] h-[180px] w-[180px]" />;
}

function ArchMap({ ans, theme, seed }: { ans: AiAnswer; theme: ThemeKey; seed: number }) {
  const W = 420,
    H = 210;
  const pts = ans.nodes.map((n) => ({ ...n, px: (n.x / 100) * W, py: (n.y / 100) * H }));
  return (
    <svg key={seed} viewBox={`0 0 ${W} ${H}`} className="draw in w-full" style={{ ["--len" as string]: "900" }}>
      <defs>
        <linearGradient id="edgeg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--c1))" />
          <stop offset="100%" stopColor="rgb(var(--c2))" />
        </linearGradient>
      </defs>
      {theme === "mecha" && (
        <g opacity="0.35">
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={"v" + i} x1={i * 30} y1="0" x2={i * 30} y2={H} stroke="rgb(var(--c1)/0.18)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={"h" + i} x1="0" y1={i * 30} x2={W} y2={i * 30} stroke="rgb(var(--c1)/0.18)" strokeWidth="0.5" />
          ))}
        </g>
      )}
      {ans.edges.map(([a, b], i) => {
        const p = pts[a],
          q = pts[b];
        if (!p || !q) return null;
        const mx = (p.px + q.px) / 2;
        const d =
          theme === "mecha"
            ? `M ${p.px} ${p.py} L ${mx} ${p.py} L ${mx} ${q.py} L ${q.px} ${q.py}`
            : `M ${p.px} ${p.py} C ${mx} ${p.py}, ${mx} ${q.py}, ${q.px} ${q.py}`;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="url(#edgeg)" strokeWidth="1.4" opacity="0.85" />
            <path d={d} fill="none" stroke="rgb(var(--c2))" strokeWidth="2.4" className="flowline" opacity="0.7" />
          </g>
        );
      })}
      {pts.map((n, i) => (
        <g key={n.id} style={{ animation: `riseFade .5s ${0.5 + i * 0.12}s both` }}>
          {theme === "mecha" ? (
            <rect x={n.px - 42} y={n.py - 13} width="84" height="26" fill="rgb(var(--bg0)/0.9)" stroke="rgb(var(--c1))" strokeWidth="1.1" />
          ) : theme === "quantum" ? (
            <polygon
              points={Array.from({ length: 6 })
                .map((_, k) => {
                  const a = (k / 6) * Math.PI * 2 + Math.PI / 6;
                  return `${n.px + Math.cos(a) * 46},${n.py + Math.sin(a) * 20}`;
                })
                .join(" ")}
              fill="rgb(var(--bg1)/0.92)"
              stroke="rgb(var(--c1))"
              strokeWidth="1.1"
            />
          ) : (
            <ellipse cx={n.px} cy={n.py} rx="46" ry="17" fill="rgb(var(--bg1)/0.9)" stroke="rgb(var(--c1))" strokeWidth="1.2" />
          )}
          <text
            x={n.px}
            y={n.py + 3}
            textAnchor="middle"
            fontSize="7.4"
            fill="rgb(var(--c3))"
            style={{ fontFamily: "ui-monospace, monospace", letterSpacing: "0.5px" }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function AICore() {
  const { theme, aiOpen, setAiOpen, aiSeed } = useSys();
  const [q, setQ] = useState("");
  const [ans, setAns] = useState<AiAnswer | null>(null);
  const [thinking, setThinking] = useState(false);
  const [fire, setFire] = useState(0);
  const [seed, setSeed] = useState(0);
  const [log, setLog] = useState<{ me: boolean; text: string }[]>([
    { me: false, text: "Premium core online. Ask me about architecture, POS, PWA, realtime or hiring." },
  ]);
  const L = LABEL[theme];
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const lastSeed = useRef("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setLog((l) => [...l, { me: true, text }]);
    setQ("");
    setThinking(true);
    setFire((f) => f + 1);
    sfx.burst();
    const a = resolve(text);
    setTimeout(() => {
      setThinking(false);
      setAns(a);
      setSeed((s) => s + 1);
      setLog((l) => [...l, { me: false, text: a.lines.join(" ") }]);
      setFire((f) => f + 1);
    }, 900);
  };

  useEffect(() => {
    if (aiSeed && aiSeed !== lastSeed.current) {
      lastSeed.current = aiSeed;
      send(aiSeed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiSeed]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [log, ans]);

  const rings = useMemo(() => [0, 1, 2], []);

  return (
    <>
      <button
        onClick={() => {
          setAiOpen(!aiOpen);
          setFire((f) => f + 1);
          sfx.open();
        }}
        className="fixed bottom-5 right-5 z-50 h-[76px] w-[76px]"
        aria-label="AI assistant"
      >
        <span className="relative block h-full w-full">
          <Burst fire={fire} theme={theme} />
          {rings.map((i) => (
            <span
              key={i}
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: "rgb(var(--c1) / 0.5)",
                animation: `pulse-ring 2.6s ${i * 0.85}s ease-out infinite`,
              }}
            />
          ))}
          <span className="absolute inset-[6px] rounded-full border-2 border-dashed a-spin-slow" style={{ borderColor: "rgb(var(--c2) / 0.6)" }} />
          <span className="absolute inset-[15px] rounded-full a-spin-rev border-t-2 border-b-2" style={{ borderColor: "rgb(var(--c1))" }} />
          <span
            className="absolute inset-[24px] rounded-full glow-md a-float"
            style={{
              background: "radial-gradient(circle at 35% 30%, #fff, rgb(var(--c1)) 45%, rgb(var(--c2)) 100%)",
            }}
          />
          <span className="absolute inset-0 grid place-items-center font-hud text-[9px] font-bold tracking-widest text-black/80">AI</span>
        </span>
      </button>

      <div
        className={`fixed bottom-[104px] right-4 z-50 w-[min(94vw,440px)] origin-bottom-right transition-all duration-300 ${
          aiOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
        }`}
      >
        <div className="panel hud-frame clip-corner noise relative overflow-hidden">
          <span className="hud-tr" />
          <span className="hud-bl" />
          <div className="flex items-center justify-between border-b px-4 py-2" style={{ borderColor: "rgb(var(--c1)/0.25)" }}>
            <div>
              <div className="t1 font-hud text-sm font-bold tracking-[0.22em] txt-glow">{L.title}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-slate-400">{L.sub}</div>
            </div>
            <button onClick={() => setAiOpen(false)} className="t2 px-2 text-lg leading-none">
              ×
            </button>
          </div>

          <div ref={bodyRef} className="max-h-[46vh] space-y-3 overflow-y-auto px-4 py-3">
            {log.map((m, i) => (
              <div key={i} className={`text-[11.5px] leading-relaxed ${m.me ? "text-right" : ""}`}>
                <span
                  className={`inline-block max-w-[85%] px-3 py-2 clip-corner ${m.me ? "bg-white/8 text-slate-200" : "text-slate-300"}`}
                  style={m.me ? {} : { background: "rgb(var(--c1)/0.09)", border: "1px solid rgb(var(--c1)/0.22)" }}
                >
                  {!m.me && <span className="t1 mr-1">▸</span>}
                  {m.text}
                </span>
              </div>
            ))}
            {thinking && (
              <div className="t1 flex items-center gap-2 text-[11px]">
                <span className="inline-block h-2 w-2 rounded-full bg1" style={{ animation: "blip .8s infinite" }} />
                computing topology
              </div>
            )}
            {ans && !thinking && (
              <div className="mt-2 border p-2" style={{ borderColor: "rgb(var(--c1)/0.25)", background: "rgb(var(--bg0)/0.6)" }}>
                <div className="mb-1 flex items-center justify-between text-[9px] tracking-[0.2em] text-slate-400">
                  <span className="t2">{ans.title}</span>
                  <span>FIG-{String(seed).padStart(3, "0")}</span>
                </div>
                <ArchMap ans={ans} theme={theme} seed={seed} />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 px-4 pb-2">
            {AI_PROMPTS.slice(0, 3).map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="clip-tag px-2 py-1 text-[9.5px] tracking-wider text-slate-300 transition hover:text-white"
                style={{ background: "rgb(var(--c2)/0.14)", border: "1px solid rgb(var(--c2)/0.3)" }}
              >
                {p}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(q);
            }}
            className="flex items-center gap-2 border-t px-3 py-2"
            style={{ borderColor: "rgb(var(--c1)/0.25)" }}
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="query the system…"
              className="min-w-0 flex-1 bg-transparent py-1 text-[12px] text-slate-100 outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="clip-tag px-3 py-1.5 text-[9.5px] font-bold tracking-[0.15em] text-black"
              style={{ background: "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))" }}
            >
              {L.cta}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
