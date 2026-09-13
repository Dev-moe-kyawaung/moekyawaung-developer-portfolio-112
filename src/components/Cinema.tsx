import { useEffect, useRef, useState } from "react";
import { REELS } from "../data";
import { useReveal } from "../hooks";
import { sfx } from "../audio";

export default function Cinema() {
  const [i, setI] = useState(0);
  const [on, setOn] = useState(true);
  const vid = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useReveal<HTMLDivElement>(0.2);
  const reel = REELS[i];

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    v.load();
    if (on) void v.play().catch(() => {});
  }, [i, on]);

  useEffect(() => {
    if (!inView) {
      vid.current?.pause();
      return;
    }
    if (on) void vid.current?.play().catch(() => {});
  }, [inView, on]);

  return (
    <div ref={ref} className={`reveal ${inView ? "in" : ""}`}>
      <div className="hud-frame panel noise relative overflow-hidden">
        <span className="hud-tr" />
        <span className="hud-bl" />

        <div className="relative aspect-[16/9] bg-black">
          <video
            ref={vid}
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            style={{ animation: "ken 22s linear alternate infinite" }}
          >
            <source src={reel.src} type="video/mp4" />
          </video>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgb(var(--bg0)/0.55) 0%, transparent 28%, transparent 62%, rgb(var(--bg0)/0.75) 100%)",
            }}
          />

          <div className="absolute left-4 top-4 flex items-center gap-3 text-[10px] tracking-[0.22em]">
            <span className="clip-tag bg-red-500 px-2 py-0.5 font-bold text-black">REC</span>
            <span className="t1 font-hud">{reel.tag}</span>
            <span className="text-slate-300">{reel.note}</span>
          </div>

          <div className="absolute right-4 top-4 text-right text-[9px] tracking-[0.2em] text-slate-300">
            <div className="t2">ISO 250 · 24FPS · LOG</div>
            <div className="mt-1">SIGNAL {92 + i}%</div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div>
              <div className="font-disp text-2xl font-extrabold text-white txt-glow sm:text-4xl">
                {reel.title}
              </div>
              <div className="mt-1 text-[10px] tracking-[0.2em] text-slate-400">
                MOTION STUDY · CALIBRATES INTERFACE TEMPO
              </div>
            </div>
            <button
              onClick={() => {
                setOn((v) => {
                  const n = !v;
                  const el = vid.current;
                  if (el) n ? void el.play() : el.pause();
                  sfx.tick();
                  return n;
                });
              }}
              className="clip-tag px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-black"
              style={{ background: "rgb(var(--c1))" }}
            >
              {on ? "PAUSE" : "PLAY"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px sm:grid-cols-4" style={{ background: "rgb(var(--c1)/0.15)" }}>
          {REELS.map((r, n) => (
            <button
              key={r.tag}
              onClick={() => {
                setI(n);
                sfx.tick();
              }}
              className="px-3 py-3 text-left transition"
              style={{
                background: n === i ? "rgb(var(--c1)/0.16)" : "rgb(var(--bg0)/0.9)",
              }}
            >
              <div className="t2 text-[8px] tracking-[0.22em]">{r.tag}</div>
              <div className={`mt-0.5 text-[12px] font-bold ${n === i ? "t1" : "text-slate-200"}`}>
                {r.title}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
