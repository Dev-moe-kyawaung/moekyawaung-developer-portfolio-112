import { useEffect, useRef } from "react";
import type { ThemeKey } from "../data";

const PAL: Record<ThemeKey, { a: string; b: string; c: string }> = {
  quantum: { a: "34,211,238", b: "167,139,250", c: "52,211,153" },
  mecha: { a: "96,165,250", b: "251,191,36", c: "190,220,255" },
  plasma: { a: "255,94,166", b: "255,165,60", c: "168,85,247" },
};

type P = { x: number; y: number; vx: number; vy: number; r: number; h: number };

export default function FieldCanvas({ theme }: { theme: ThemeKey }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d", { alpha: true })!;
    let w = 0,
      h = 0,
      dpr = 1;
    let raf = 0;
    let t = 0;
    const mouse = { x: 0.5, y: 0.5 };

    const parts: P[] = [];
    const cols: { x: number; y: number; sp: number; len: number }[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = w < 700 ? 55 : 110;
      parts.length = 0;
      for (let i = 0; i < n; i++)
        parts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.8 + 0.6,
          h: Math.random(),
        });
      cols.length = 0;
      const cn = Math.floor(w / 34);
      for (let i = 0; i < cn; i++)
        cols.push({
          x: i * 34 + 8,
          y: Math.random() * h,
          sp: 0.8 + Math.random() * 2.6,
          len: 6 + Math.floor(Math.random() * 14),
        });
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };

    const GLY = "01ΨΦΛΔΣ∆<>/{}[]#*+=";

    const drawQuantum = () => {
      const p = PAL.quantum;
      ctx.font = "12px ui-monospace, monospace";
      for (const c of cols) {
        c.y += c.sp;
        if (c.y - c.len * 14 > h) {
          c.y = -Math.random() * 200;
          c.sp = 0.8 + Math.random() * 2.6;
        }
        for (let k = 0; k < c.len; k++) {
          const yy = c.y - k * 14;
          if (yy < -14 || yy > h + 14) continue;
          const al = (1 - k / c.len) * 0.36;
          ctx.fillStyle = k === 0 ? `rgba(220,255,255,${al + 0.4})` : `rgba(${p.c},${al})`;
          ctx.fillText(GLY[(Math.floor(yy / 14) + k) % GLY.length], c.x, yy);
        }
      }
      // entangled particle network
      const mx = mouse.x * w,
        my = mouse.y * h;
      for (const q of parts) {
        q.x += q.vx;
        q.y += q.vy;
        if (q.x < 0 || q.x > w) q.vx *= -1;
        if (q.y < 0 || q.y > h) q.vy *= -1;
        const dx = mx - q.x,
          dy = my - q.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 40000) {
          q.vx += dx * 0.00004;
          q.vy += dy * 0.00004;
        }
        q.vx = Math.max(-1, Math.min(1, q.vx));
        q.vy = Math.max(-1, Math.min(1, q.vy));
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.r, 0, 6.284);
        ctx.fillStyle = `rgba(${q.h > 0.6 ? p.b : p.a},0.75)`;
        ctx.fill();
      }
      ctx.lineWidth = 0.6;
      for (let i = 0; i < parts.length; i++)
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i],
            b = parts[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const d = dx * dx + dy * dy;
          if (d < 16000) {
            ctx.strokeStyle = `rgba(${p.a},${0.18 * (1 - d / 16000)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      // fractal tree
      const branch = (x: number, y: number, len: number, ang: number, dep: number) => {
        if (dep === 0 || len < 4) return;
        const x2 = x + Math.cos(ang) * len,
          y2 = y + Math.sin(ang) * len;
        ctx.strokeStyle = `rgba(${p.b},${0.06 + dep * 0.016})`;
        ctx.lineWidth = dep * 0.35;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        const sway = Math.sin(t * 0.008 + dep) * 0.22;
        branch(x2, y2, len * 0.72, ang - 0.5 + sway, dep - 1);
        branch(x2, y2, len * 0.72, ang + 0.5 + sway, dep - 1);
      };
      branch(w * 0.5, h + 10, Math.min(h * 0.16, 120), -Math.PI / 2, 8);
    };

    const gear = (
      cx: number,
      cy: number,
      r: number,
      teeth: number,
      rot: number,
      col: string,
      alpha: number
    ) => {
      ctx.strokeStyle = `rgba(${col},${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= teeth * 2; i++) {
        const a = (i / (teeth * 2)) * Math.PI * 2 + rot;
        const rr = i % 2 === 0 ? r : r * 0.86;
        const x = cx + Math.cos(a) * rr,
          y = cy + Math.sin(a) * rr;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.62, 0, 6.284);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.16, 0, 6.284);
      ctx.stroke();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + rot;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r * 0.18, cy + Math.sin(a) * r * 0.18);
        ctx.lineTo(cx + Math.cos(a) * r * 0.6, cy + Math.sin(a) * r * 0.6);
        ctx.stroke();
      }
    };

    const drawMecha = () => {
      const p = PAL.mecha;
      const rot = t * 0.004;
      gear(w * 0.14, h * 0.26, Math.min(w, h) * 0.12, 16, rot, p.a, 0.35);
      gear(w * 0.14 + Math.min(w, h) * 0.19, h * 0.26 + Math.min(w, h) * 0.1, Math.min(w, h) * 0.075, 12, -rot * 1.6, p.b, 0.3);
      gear(w * 0.86, h * 0.74, Math.min(w, h) * 0.15, 20, -rot * 0.7, p.a, 0.25);
      // drafting crosshair follows pointer
      const mx = mouse.x * w,
        my = mouse.y * h;
      ctx.strokeStyle = `rgba(${p.b},0.28)`;
      ctx.setLineDash([6, 8]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, my);
      ctx.lineTo(w, my);
      ctx.moveTo(mx, 0);
      ctx.lineTo(mx, h);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = `rgba(${p.b},0.5)`;
      ctx.strokeRect(mx - 14, my - 14, 28, 28);
      // travelling scan
      const sy = (t * 1.4) % (h + 200) - 100;
      const g = ctx.createLinearGradient(0, sy - 60, 0, sy + 60);
      g.addColorStop(0, `rgba(${p.a},0)`);
      g.addColorStop(0.5, `rgba(${p.a},0.1)`);
      g.addColorStop(1, `rgba(${p.a},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, sy - 60, w, 120);
      // corner ticks
      ctx.strokeStyle = `rgba(${p.c},0.22)`;
      for (let i = 0; i < parts.length; i += 4) {
        const q = parts[i];
        q.x += q.vx * 0.3;
        q.y += q.vy * 0.3;
        if (q.x < 0 || q.x > w) q.vx *= -1;
        if (q.y < 0 || q.y > h) q.vy *= -1;
        ctx.beginPath();
        ctx.moveTo(q.x - 4, q.y);
        ctx.lineTo(q.x + 4, q.y);
        ctx.moveTo(q.x, q.y - 4);
        ctx.lineTo(q.x, q.y + 4);
        ctx.stroke();
      }
    };

    const drawPlasma = () => {
      const p = PAL.plasma;
      const cx = w * 0.5 + (mouse.x - 0.5) * 60,
        cy = h * 0.45 + (mouse.y - 0.5) * 40;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.55);
      g.addColorStop(0, `rgba(${p.a},0.13)`);
      g.addColorStop(0.4, `rgba(${p.c},0.06)`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      // orbital flux
      for (let k = 0; k < 5; k++) {
        const rr = Math.min(w, h) * (0.16 + k * 0.09);
        ctx.strokeStyle = `rgba(${k % 2 ? p.b : p.a},${0.14 - k * 0.018})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let a = 0; a <= 6.3; a += 0.08) {
          const wob = Math.sin(a * (3 + k) + t * 0.02) * (6 + k * 3);
          const x = cx + Math.cos(a) * (rr + wob) * 1.5;
          const y = cy + Math.sin(a) * (rr + wob) * 0.55;
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
      // neon particles spiralling inward
      for (const q of parts) {
        const dx = cx - q.x,
          dy = cy - q.y;
        const d = Math.hypot(dx, dy) || 1;
        q.vx += (dx / d) * 0.035 - (dy / d) * 0.05;
        q.vy += (dy / d) * 0.035 + (dx / d) * 0.05;
        q.vx *= 0.965;
        q.vy *= 0.965;
        q.x += q.vx;
        q.y += q.vy;
        if (d < 26) {
          const a = Math.random() * 6.283;
          const rad = Math.min(w, h) * 0.5;
          q.x = cx + Math.cos(a) * rad;
          q.y = cy + Math.sin(a) * rad;
          q.vx = q.vy = 0;
        }
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.r * 1.2, 0, 6.284);
        ctx.fillStyle = `rgba(${q.h > 0.5 ? p.b : p.a},0.8)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${p.a},0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const loop = () => {
      t++;
      ctx.clearRect(0, 0, w, h);
      const th = themeRef.current;
      if (th === "quantum") drawQuantum();
      else if (th === "mecha") drawMecha();
      else drawPlasma();
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 -z-10 h-full w-full opacity-80"
      style={{ pointerEvents: "none" }}
    />
  );
}
