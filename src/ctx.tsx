import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { sfx, setAudio } from "./audio";
import type { Project, ThemeKey } from "./data";

type Sys = {
  theme: ThemeKey;
  setTheme: (t: ThemeKey) => void;
  wiping: boolean;
  sound: boolean;
  toggleSound: () => void;
  project: Project | null;
  openProject: (p: Project | null) => void;
  cmd: boolean;
  setCmd: (b: boolean) => void;
  aiOpen: boolean;
  setAiOpen: (b: boolean) => void;
  aiSeed: string;
  askAI: (q: string) => void;
};

const Ctx = createContext<Sys | null>(null);

export function useSys() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSys");
  return v;
}

export function SysProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>("quantum");
  const [wiping, setWiping] = useState(false);
  const [sound, setSound] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [cmd, setCmd] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiSeed, setAiSeed] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback(
    (t: ThemeKey) => {
      if (t === theme || wiping) return;
      sfx.switch();
      setWiping(true);
      window.setTimeout(() => {
        setThemeState(t);
        window.setTimeout(() => setWiping(false), 420);
      }, 280);
    },
    [theme, wiping]
  );

  const toggleSound = useCallback(() => {
    setSound((s) => {
      const n = !s;
      setAudio(n);
      if (n) sfx.open();
      return n;
    });
  }, []);

  const openProject = useCallback((p: Project | null) => {
    setProject(p);
    p ? sfx.open() : sfx.close();
    if (p) setCmd(false);
  }, []);

  const askAI = useCallback((q: string) => {
    setAiSeed(q);
    setAiOpen(true);
    setCmd(false);
    sfx.burst();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmd((c) => !c);
        sfx.tick();
        return;
      }
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setCmd(true);
        sfx.tick();
        return;
      }
      if (e.key === "Escape") {
        setCmd(false);
        setProject(null);
        return;
      }
      if (typing) return;
      if (e.key === "1") setTheme("quantum");
      if (e.key === "2") setTheme("mecha");
      if (e.key === "3") setTheme("plasma");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      wiping,
      sound,
      toggleSound,
      project,
      openProject,
      cmd,
      setCmd,
      aiOpen,
      setAiOpen,
      aiSeed,
      askAI,
    }),
    [
      theme,
      setTheme,
      wiping,
      sound,
      toggleSound,
      project,
      openProject,
      cmd,
      aiOpen,
      aiSeed,
      askAI,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
