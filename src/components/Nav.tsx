import { useEffect, useState } from "react";
import { sfx } from "../audio";
import { useSys } from "../ctx";
import { THEMES, type ThemeKey } from "../data";

const LINKS = [
  { id: "signal", label: "CINEMA" },
  { id: "nodes", label: "WORK" },
  { id: "services", label: "SERVICES" },
  { id: "systems", label: "SYSTEMS" },
  { id: "voices", label: "VOICES" },
  { id: "faq", label: "FAQ" },
  { id: "link", label: "CONTACT" },
];

export default function Nav() {
  const { theme, setTheme, sound, toggleSound, setCmd } = useSys();
  const [scrolled, setScrolled] = useState(false);
  const [prog, setProg] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 20);
      const max = document.body.scrollHeight - window.innerHeight;
      setProg(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? "backdrop-blur-md" : ""}`}
      style={{
        background: scrolled ? "rgb(var(--bg0) / 0.78)" : "transparent",
        borderBottom: scrolled ? "1px solid rgb(var(--c1)/0.2)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="grid h-8 w-8 place-items-center font-hud text-[12px] font-black text-black"
            style={{
              background: "linear-gradient(135deg, rgb(var(--c1)), rgb(var(--c2)))",
              clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
            }}
          >
            M
          </span>
          <span className="hidden text-[11px] font-bold tracking-[0.25em] text-white sm:block">
            MKA<span className="t1">.SYS</span>
            <span className="ml-1 text-[8px] tracking-[0.3em] text-slate-500">ULTRA PRO MAX</span>
          </span>
        </a>

        <nav className="hidden items-center gap-4 xl:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-[10px] tracking-[0.2em] text-slate-400 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {(Object.keys(THEMES) as ThemeKey[]).map((k, n) => {
            const t = THEMES[k];
            const on = k === theme;
            return (
              <button
                key={k}
                onClick={() => setTheme(k)}
                title={`${t.name} · key ${n + 1}`}
                className="clip-tag cursor-pointer px-2 py-1.5 text-[9px] font-bold tracking-[0.14em] transition"
                style={{
                  background: on
                    ? "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))"
                    : "rgb(255 255 255 / 0.05)",
                  color: on ? "#000" : "rgb(148 163 184)",
                  border: "1px solid rgb(var(--c1)/0.25)",
                }}
              >
                <span className="mr-1">{t.icon}</span>
                <span className="hidden sm:inline">{t.name.split(" ")[0]}</span>
              </button>
            );
          })}
          <button
            onClick={toggleSound}
            title="sonic UI"
            className="ml-1 px-2 py-1.5 text-[10px] tracking-[0.14em]"
            style={{
              border: "1px solid rgb(var(--c1)/0.25)",
              color: sound ? "rgb(var(--c1))" : "rgb(100 116 139)",
            }}
          >
            {sound ? "SONIC" : "MUTE"}
          </button>
          <button
            onClick={() => {
              setCmd(true);
              sfx.tick();
            }}
            className="hidden px-2 py-1.5 text-[10px] tracking-[0.14em] text-slate-400 md:block"
            style={{ border: "1px solid rgb(var(--c1)/0.25)" }}
          >
            /
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="px-2 py-1.5 text-[10px] tracking-[0.14em] text-slate-400 xl:hidden"
            style={{ border: "1px solid rgb(var(--c1)/0.25)" }}
          >
            MENU
          </button>
        </div>
      </div>

      {open && (
        <div className="grid gap-1 border-t px-5 py-3 xl:hidden" style={{ borderColor: "rgb(var(--c1)/0.2)" }}>
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="py-2 text-[11px] tracking-[0.22em] text-slate-300"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <div className="h-[2px] w-full bg-white/5">
        <div
          className="h-full"
          style={{
            width: `${prog}%`,
            background: "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))",
            boxShadow: "0 0 12px rgb(var(--c1))",
          }}
        />
      </div>
    </header>
  );
}

const BOOT_LINES = [
  "INIT KERNEL .............. OK",
  "MOUNT Ψ-FIELD ............ OK",
  "CALIBRATE GEAR TRAIN ..... OK",
  "IGNITE PLASMA CORE ....... OK",
  "RENDER HERO SYNTHESIS .... OK",
  "LINK OPERATOR MKA ........ OK",
  "ULTRA PRO MAX ............ READY",
];

export function Boot({ done }: { done: () => void }) {
  const [p, setP] = useState(0);
  const [n, setN] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setP((v) => {
        const nv = Math.min(100, v + 3 + Math.random() * 8);
        setN(Math.min(BOOT_LINES.length, Math.floor((nv / 100) * BOOT_LINES.length)));
        if (nv >= 100) {
          clearInterval(id);
          setTimeout(done, 420);
        }
        return nv;
      });
    }, 55);
    return () => clearInterval(id);
  }, [done]);

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center"
      style={{ background: "rgb(var(--bg0))", opacity: p >= 100 ? 0 : 1, transition: "opacity .45s" }}
      onClick={done}
    >
      <div className="w-[min(92vw,420px)]">
        <div className="mb-2 font-hud text-[10px] tracking-[0.4em] t1">MKA.SYS · ULTRA PRO MAX BOOT</div>
        <div className="font-disp text-3xl font-extrabold tracking-tight text-white">
          POWERING<span className="t1"> THE GRID</span>
        </div>
        <div className="mt-5 space-y-1 font-mono text-[11px] text-slate-400">
          {BOOT_LINES.slice(0, n).map((l) => (
            <div key={l} className="t3">
              ▸ {l}
            </div>
          ))}
        </div>
        <div className="mt-6 h-[3px] w-full bg-white/10">
          <div
            className="h-full"
            style={{
              width: `${p}%`,
              background: "linear-gradient(90deg, rgb(var(--c1)), rgb(var(--c2)))",
            }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[9px] tracking-[0.25em] text-slate-500">
          <span>{Math.floor(p)}%</span>
          <span>CLICK TO SKIP</span>
        </div>
      </div>
    </div>
  );
}
