import { useEffect, useState } from "react";
import { HERO_ART, IMG, PROFILE, THEMES } from "../data";
import { useSys } from "../ctx";
import { useCountUp, useReveal, useTypewriter } from "../hooks";
import { sfx } from "../audio";

function Stat({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.4);
  const v = useCountUp(value, inView);
  return (
    <div ref={ref} className="panel clip-corner px-3 py-2.5">
      <div className="t1 font-hud text-xl font-bold txt-glow tabular-nums">
        {v}
        <span className="text-xs opacity-70">{suffix}</span>
      </div>
      <div className="mt-0.5 text-[8.5px] tracking-[0.2em] text-slate-400">{label}</div>
    </div>
  );
}

function Letters({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((ch, i) => (
        <span key={i} className="letter" style={{ animationDelay: `${i * 45}ms` }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

function Portrait() {
  const { theme } = useSys();
  const orbits = [IMG.mka3, IMG.mka12, IMG.mka25];
  return (
    <div className="relative mx-auto h-[300px] w-[300px] shrink-0 sm:h-[360px] sm:w-[360px]">
      <div
        className="absolute inset-0 rounded-full border a-spin-slow"
        style={{
          borderColor: "rgb(var(--c1)/0.35)",
          borderStyle: theme === "mecha" ? "dashed" : "solid",
        }}
      />
      <div
        className="absolute inset-[18px] rounded-full border-2 a-spin-rev"
        style={{
          borderColor: "transparent",
          borderTopColor: "rgb(var(--c1))",
          borderBottomColor: "rgb(var(--c2)/0.7)",
        }}
      />
      <div
        className="absolute inset-[36px] rounded-full border a-spin-med"
        style={{ borderColor: "rgb(var(--c2)/0.3)", borderStyle: "dotted" }}
      />

      {orbits.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            animation: `spin-slow ${14 + i * 4}s linear infinite`,
            transform: `rotate(${i * 120}deg)`,
          }}
        >
          <img
            src={src}
            alt=""
            className="absolute left-1/2 top-0 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
            style={{ border: "1px solid rgb(var(--c1)/0.6)", boxShadow: "0 0 16px rgb(var(--c1)/0.4)" }}
          />
        </div>
      ))}

      <div
        className={`absolute inset-[56px] overflow-hidden hud-frame ${
          theme === "mecha" ? "clip-corner" : "rounded-full"
        } glow-md ${theme === "plasma" ? "a-heat" : ""}`}
        style={{ border: "1px solid rgb(var(--c1)/0.55)" }}
      >
        <span className="hud-tr" />
        <span className="hud-bl" />
        <img
          src={PROFILE.avatar}
          alt={PROFILE.name}
          className="h-full w-full object-cover"
          style={{
            filter:
              theme === "mecha"
                ? "grayscale(1) contrast(1.25) brightness(1.05)"
                : theme === "plasma"
                ? "saturate(1.35) contrast(1.1)"
                : "saturate(1.15)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{
            background:
              theme === "mecha"
                ? "linear-gradient(rgb(var(--c1)/0.35), transparent 60%)"
                : "radial-gradient(circle at 50% 120%, rgb(var(--c1)/0.45), transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 h-10 opacity-40"
          style={{
            background: "linear-gradient(rgb(var(--c1)/0), rgb(var(--c1)/0.5), rgb(var(--c1)/0))",
            animation: "scanline 5s linear infinite",
          }}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const { theme, setCmd } = useSys();
  const role = useTypewriter(PROFILE.role, 28);
  const T = THEMES[theme];
  const first = PROFILE.name.split(" ")[0];
  const rest = PROFILE.name.split(" ").slice(1).join(" ");
  const [py, setPy] = useState(0);

  useEffect(() => {
    const h = () => setPy(Math.min(window.scrollY, 700));
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <section id="top" className="relative mx-auto max-w-6xl px-5 pb-12 pt-28 sm:pt-32">
      {/* generated hero art backdrop with parallax */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {(Object.keys(HERO_ART) as (keyof typeof HERO_ART)[]).map((k) => (
          <img
            key={k}
            src={HERO_ART[k]}
            alt=""
            className="absolute left-1/2 top-0 h-[130%] w-[120%] -translate-x-1/2 object-cover transition-opacity duration-700"
            style={{
              opacity: k === theme ? 0.32 : 0,
              transform: `translate(-50%, ${py * 0.25}px) scale(1.05)`,
              maskImage: "radial-gradient(ellipse at 60% 30%, #000 20%, transparent 72%)",
              WebkitMaskImage: "radial-gradient(ellipse at 60% 30%, #000 20%, transparent 72%)",
            }}
          />
        ))}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgb(var(--bg0)) 96%)" }} />
      </div>

      <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] tracking-[0.26em]">
            <span
              className="clip-tag px-2.5 py-1 font-bold text-black"
              style={{ background: "rgb(var(--c1))" }}
            >
              {T.tag} · ULTRA PRO MAX
            </span>
            <span className="t2 a-flicker">{T.blurb}</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg1" style={{ animation: "blip 1.2s infinite" }} />
              AVAILABLE · GMT+6:30
            </span>
          </div>

          <h1 className="font-disp text-[clamp(2.4rem,7.4vw,5rem)] font-extrabold leading-[0.9] tracking-tight text-white">
            <span className="block t1 txt-glow">
              <Letters text={first} />
            </span>
            <span className="block">
              <Letters text={rest} />
            </span>
          </h1>

          <div className="mt-3 h-6 text-[13px] tracking-[0.18em] text-slate-300">
            {role}
            <span className="t1 ml-0.5 animate-pulse">█</span>
          </div>

          <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-slate-400">{PROFILE.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#nodes"
              onMouseEnter={() => sfx.hover()}
              className="clip-tag px-5 py-2.5 text-[11px] font-bold tracking-[0.18em] text-black transition hover:brightness-110"
              style={{ background: "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))" }}
            >
              ENTER THE GRID
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="clip-tag px-5 py-2.5 text-[11px] font-bold tracking-[0.18em] transition hover:text-white"
              style={{ border: "1px solid rgb(var(--c1)/0.5)", color: "rgb(var(--c1))" }}
            >
              GITHUB ↗
            </a>
            <button
              onClick={() => setCmd(true)}
              className="hidden items-center gap-1.5 px-2 py-1 text-[10px] tracking-[0.16em] text-slate-500 sm:flex"
              style={{ border: "1px solid rgb(var(--c1)/0.2)" }}
            >
              PRESS <kbd className="t1">/</kbd> COMMAND
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {PROFILE.stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>

        <Portrait />
      </div>
    </section>
  );
}
