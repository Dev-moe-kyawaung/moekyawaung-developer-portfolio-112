import { useEffect, useRef, useState } from "react";
import { useSys } from "../ctx";
import { THEMES } from "../data";
import { useClock, useFps } from "../hooks";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const hover = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    document.documentElement.classList.add("cursor-on");
    let raf = 0;
    const move = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      const t = e.target as HTMLElement | null;
      hover.current = !!t?.closest("a,button,[data-hot]");
    };
    const loop = () => {
      const p = pos.current;
      p.rx += (p.x - p.rx) * 0.18;
      p.ry += (p.y - p.ry) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate(${p.x - 3}px, ${p.y - 3}px)`;
      }
      if (ring.current) {
        const s = hover.current ? 1.7 : 1;
        ring.current.style.transform = `translate(${p.rx - 16}px, ${p.ry - 16}px) scale(${s})`;
        ring.current.style.borderColor = hover.current
          ? "rgb(var(--c2))"
          : "rgb(var(--c1) / 0.7)";
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cursor-on");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      <div
        ref={ring}
        className="absolute h-8 w-8 rounded-full border"
        style={{ borderColor: "rgb(var(--c1) / 0.7)" }}
      />
      <div
        ref={dot}
        className="absolute h-1.5 w-1.5 rounded-full"
        style={{ background: "rgb(var(--c1))", boxShadow: "0 0 10px rgb(var(--c1))" }}
      />
    </div>
  );
}

export function HudCorners() {
  const s = "pointer-events-none fixed z-30 h-10 w-10 border-[rgb(var(--c1)/0.45)]";
  return (
    <>
      <span className={`${s} top-3 left-3 border-t border-l`} />
      <span className={`${s} top-3 right-3 border-t border-r`} />
      <span className={`${s} bottom-3 left-3 border-b border-l`} />
      <span className={`${s} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

export function Telemetry() {
  const { theme } = useSys();
  const clock = useClock();
  const fps = useFps();
  const [xy, setXy] = useState("0.50 0.50");
  useEffect(() => {
    const h = (e: PointerEvent) =>
      setXy(`${(e.clientX / innerWidth).toFixed(2)} ${(e.clientY / innerHeight).toFixed(2)}`);
    window.addEventListener("pointermove", h);
    return () => window.removeEventListener("pointermove", h);
  }, []);
  const T = THEMES[theme];
  return (
    <div className="pointer-events-none fixed bottom-3 left-1/2 z-30 hidden -translate-x-1/2 lg:block">
      <div
        className="flex items-center gap-4 px-4 py-1.5 text-[9px] tracking-[0.22em] text-slate-400"
        style={{
          background: "rgb(var(--bg0)/0.7)",
          border: "1px solid rgb(var(--c1)/0.22)",
          backdropFilter: "blur(10px)",
        }}
      >
        <span className="t1 font-hud">{T.code}</span>
        <span>YGN {clock}</span>
        <span className="t2">{fps} FPS</span>
        <span>XY {xy}</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg1" style={{ animation: "blip 1.2s infinite" }} />
          LIVE
        </span>
      </div>
    </div>
  );
}

export function Vignette() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[25] opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.35) 3px)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[25]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgb(var(--bg0) / 0.72) 100%)",
        }}
      />
    </>
  );
}

export function Wipe() {
  const { wiping, theme } = useSys();
  const [phase, setPhase] = useState<"off" | "in" | "out">("off");
  const prev = useRef(wiping);

  useEffect(() => {
    if (wiping && !prev.current) setPhase("in");
    if (!wiping && prev.current) setPhase("out");
    prev.current = wiping;
  }, [wiping]);

  if (phase === "off") return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[70] ${phase === "in" ? "wipe-in" : "wipe-out"}`}
      onAnimationEnd={() => {
        if (phase === "out") setPhase("off");
      }}
      style={{
        background: `linear-gradient(180deg, rgb(var(--c1)), rgb(var(--c2)), rgb(var(--bg0)))`,
      }}
    >
      <div className="grid h-full place-items-center">
        <div className="text-center">
          <div className="font-hud text-4xl font-bold text-black txt-glow">{THEMES[theme].icon}</div>
          <div className="mt-2 font-hud text-sm tracking-[0.4em] text-black">{THEMES[theme].name}</div>
        </div>
      </div>
    </div>
  );
}

export function Grain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[24] opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
