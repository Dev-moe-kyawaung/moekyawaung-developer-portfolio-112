import { useEffect, useMemo, useRef, useState } from "react";
import { useSys } from "../ctx";
import { PAGES, PROJECTS, THEMES, type ThemeKey } from "../data";
import { sfx } from "../audio";

type Item = { id: string; group: string; label: string; hint: string; run: () => void };

export default function Command() {
  const { cmd, setCmd, setTheme, openProject, askAI, toggleSound, sound } = useSys();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(() => {
    const jump = (id: string) => () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setCmd(false);
      sfx.tick();
    };
    const base: Item[] = [
      { id: "s1", group: "JUMP", label: "Projects", hint: "nodes", run: jump("nodes") },
      { id: "s2", group: "JUMP", label: "Cinema reel", hint: "signal", run: jump("signal") },
      { id: "s3", group: "JUMP", label: "Systems", hint: "skills", run: jump("systems") },
      { id: "s4", group: "JUMP", label: "Constellation", hint: "github", run: jump("sky") },
      { id: "s5", group: "JUMP", label: "Studio", hint: "gallery", run: jump("studio") },
      { id: "s6", group: "JUMP", label: "Contact", hint: "hire", run: jump("link") },
      ...((Object.keys(THEMES) as ThemeKey[]).map((k, n) => ({
        id: "t" + k,
        group: "MODE",
        label: `Switch to ${THEMES[k].name}`,
        hint: `${n + 1} · ${THEMES[k].tag}`,
        run: () => {
          setTheme(k);
          setCmd(false);
        },
      })) as Item[]),
      {
        id: "snd",
        group: "SYS",
        label: sound ? "Mute interface" : "Enable sonic UI",
        hint: "audio",
        run: () => {
          toggleSound();
          setCmd(false);
        },
      },
      ...PROJECTS.map((p) => ({
        id: "p" + p.id,
        group: "PROJECT",
        label: p.title,
        hint: p.cat,
        run: () => openProject(p),
      })),
      {
        id: "ai",
        group: "ORACLE",
        label: q ? `Ask AI: ${q}` : "Open AI core",
        hint: "architecture",
        run: () => askAI(q || "Map the PWA cache tiers"),
      },
    ];
    const s = q.trim().toLowerCase();
    if (!s) return base;
    return base.filter(
      (it) =>
        it.label.toLowerCase().includes(s) ||
        it.hint.toLowerCase().includes(s) ||
        it.group.toLowerCase().includes(s)
    );
  }, [q, setCmd, setTheme, openProject, askAI, toggleSound, sound]);

  useEffect(() => {
    setI(0);
  }, [q, cmd]);

  useEffect(() => {
    if (cmd) {
      setQ("");
      setTimeout(() => input.current?.focus(), 30);
    }
  }, [cmd]);

  if (!cmd) return null;

  const run = (it: Item) => it.run();

  return (
    <div
      className="fixed inset-0 z-[58] grid place-items-start bg-black/55 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setCmd(false)}
    >
      <div
        className="panel hud-frame noise mx-auto w-full max-w-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="hud-tr" />
        <span className="hud-bl" />
        <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "rgb(var(--c1)/0.25)" }}>
          <span className="t1 font-hud text-[10px] tracking-[0.3em]">CMD</span>
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setI((v) => Math.min(items.length - 1, v + 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setI((v) => Math.max(0, v - 1));
              }
              if (e.key === "Enter" && items[i]) run(items[i]);
            }}
            placeholder="jump, switch, inspect, ask…"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-slate-500"
          />
          <span className="text-[9px] tracking-[0.2em] text-slate-500">ESC</span>
        </div>
        <div className="max-h-[46vh] overflow-y-auto py-1">
          {items.slice(0, 14).map((it, n) => (
            <button
              key={it.id}
              onMouseEnter={() => setI(n)}
              onClick={() => run(it)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left text-[12px] transition"
              style={{
                background: n === i ? "rgb(var(--c1)/0.12)" : "transparent",
                color: n === i ? "rgb(var(--c1))" : "#cbd5e1",
              }}
            >
              <span>
                <span className="mr-3 text-[9px] tracking-[0.2em] text-slate-500">{it.group}</span>
                {it.label}
              </span>
              <span className="text-[9px] tracking-[0.16em] text-slate-500">{it.hint}</span>
            </button>
          ))}
          {items.length === 0 && (
            <div className="px-4 py-6 text-center text-[11px] text-slate-500">
              no match · {PAGES.length} surfaces still in orbit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
