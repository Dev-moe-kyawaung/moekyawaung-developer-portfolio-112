import { useMemo, useState } from "react";
import { PAGES } from "../data";
import { useReveal } from "../hooks";
import { sfx } from "../audio";

function seeded(i: number) {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  return a - Math.floor(a);
}

export default function Constellation() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.15);
  const [hot, setHot] = useState<number | null>(null);

  const stars = useMemo(
    () =>
      PAGES.map((p, i) => ({
        ...p,
        x: 8 + seeded(i) * 84,
        y: 10 + seeded(i + 17) * 78,
        r: 2.2 + seeded(i + 3) * 2.4,
      })),
    []
  );

  const edges = useMemo(() => {
    const out: [number, number][] = [];
    stars.forEach((a, i) => {
      stars.forEach((b, j) => {
        if (j <= i) return;
        const dx = a.x - b.x,
          dy = a.y - b.y;
        if (dx * dx + dy * dy < 380) out.push([i, j]);
      });
    });
    return out;
  }, [stars]);

  return (
    <div ref={ref} className={`reveal ${inView ? "in" : ""}`}>
      <div className="panel hud-frame relative h-[460px] overflow-hidden">
        <span className="hud-tr" />
        <span className="hud-bl" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={stars[a].x}
              y1={stars[a].y}
              x2={stars[b].x}
              y2={stars[b].y}
              stroke="rgb(var(--c1))"
              strokeWidth="0.12"
              opacity={hot === a || hot === b ? 0.8 : 0.18}
              className="flowline"
            />
          ))}
        </svg>
        {stars.map((s, i) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            data-hot
            onMouseEnter={() => {
              setHot(i);
              sfx.hover();
            }}
            onMouseLeave={() => setHot(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            title={s.name}
          >
            <span
              className="block rounded-full"
              style={{
                width: s.r * 4,
                height: s.r * 4,
                background: hot === i ? "rgb(var(--c2))" : "rgb(var(--c1))",
                boxShadow: `0 0 ${hot === i ? 18 : 8}px rgb(var(--c1))`,
              }}
            />
            {hot === i && (
              <span className="absolute left-4 top-0 whitespace-nowrap bg-black/70 px-2 py-0.5 text-[9px] tracking-[0.14em] text-white">
                {s.name} ↗
              </span>
            )}
          </a>
        ))}
        <div className="absolute bottom-3 left-4 text-[9px] tracking-[0.22em] text-slate-500">
          {PAGES.length} GITHUB PAGES IN ORBIT · HOVER TO LOCK TARGET
        </div>
      </div>
    </div>
  );
}
