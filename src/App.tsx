import { useState } from "react";
import AICore from "./components/AICore";
import Cinema from "./components/Cinema";
import Command from "./components/Command";
import Constellation from "./components/Constellation";
import { Cursor, Grain, HudCorners, Telemetry, Vignette, Wipe } from "./components/Chrome";
import FieldCanvas from "./components/FieldCanvas";
import Hero from "./components/Hero";
import Nav, { Boot } from "./components/Nav";
import ProjectGrid from "./components/ProjectGrid";
import { AppMatrix, Contact, Marquee, Method, SectionTitle, Skills, Studio, Timeline } from "./components/Sections";
import { Achievements, CtaBand, Faq, ScrollRail, Services, StackOrbit, Testimonials } from "./components/Ultra";
import { SysProvider, useSys } from "./ctx";
import { PROFILE, THEMES, type ThemeKey } from "./data";

const COPY: Record<
  ThemeKey,
  {
    signal: [string, string];
    nodes: [string, string];
    svc: [string, string];
    sys: [string, string];
    sky: [string, string];
    voices: [string, string];
    mx: [string, string];
    studio: [string, string];
    log: [string, string];
    faq: [string, string];
    link: [string, string];
  }
> = {
  quantum: {
    signal: ["SIGNAL REEL", "motion studies that calibrate the field's tempo"],
    nodes: ["ENTANGLED PROJECT NODES", "hover to trace the graph · click to collapse a case"],
    svc: ["ENGAGEMENT VECTORS", "how the field can be applied to your problem"],
    sys: ["SYSTEM COHERENCE", "capability amplitudes vs production workloads"],
    sky: ["GITHUB CONSTELLATION", "deployed surfaces locked in orbit"],
    voices: ["OBSERVER SIGNALS", "measurements from those who shipped with me"],
    mx: ["APPLICATION MATRIX", "sixteen shipped cells + lovable satellites"],
    studio: ["OPERATOR STUDIO", "stills from the field"],
    log: ["OBSERVATION LOG", "the timeline as recorded by the field"],
    faq: ["DECOHERENCE FAQ", "collapse the common questions"],
    link: ["ESTABLISH ENTANGLEMENT", "open a channel to the operator"],
  },
  mecha: {
    signal: ["CALIBRATION REEL", "reference footage for mechanical timing"],
    nodes: ["TECHNICAL MODULE INDEX", "exploded views · inspect to pull the drawing"],
    svc: ["SERVICE SPECIFICATIONS", "contract classes available for fabrication"],
    sys: ["DRIVE SPECIFICATIONS", "tolerances from live assemblies"],
    sky: ["DEPLOYMENT GRID", "pages plotted as survey beacons"],
    voices: ["FIELD REPORTS", "sign-off notes from prior work orders"],
    mx: ["PARTS CATALOGUE", "sixteen fabricated units + lovable SKUs"],
    studio: ["DRAFTING ARCHIVE", "operator reference plates"],
    log: ["ENGINEERING CHANGELOG", "revision history, most recent first"],
    faq: ["TECHNICAL Q&A", "specifications, clarified"],
    link: ["SUBMIT WORK ORDER", "specifications welcome"],
  },
  plasma: {
    signal: ["PLASMA REEL", "energy studies for core ignition timing"],
    nodes: ["REACTOR MODULE ARRAY", "hover to overdrive · click to open a cell"],
    svc: ["POWER OUTPUT CLASSES", "how the reactor routes into your grid"],
    sys: ["CORE OUTPUT PROFILE", "sustained throughput across the spectrum"],
    sky: ["ORBITAL CELL FIELD", "live pages as ignition points"],
    voices: ["RESONANCE LOG", "feedback from coupled reactors"],
    mx: ["ENERGY CELL GRID", "sixteen ignited cells + lovable flares"],
    studio: ["CORE STILLS", "captured during overdrive"],
    log: ["IGNITION HISTORY", "reactor milestones since first light"],
    faq: ["CONTAINMENT FAQ", "stabilise the common questions"],
    link: ["OPEN PLASMA CHANNEL", "route a signal to the core"],
  },
};

function Shell() {
  const { theme } = useSys();
  const [booting, setBooting] = useState(true);
  const C = COPY[theme];

  return (
    <div className="relative min-h-screen" style={{ background: "rgb(var(--bg0))" }}>
      {booting && <Boot done={() => setBooting(false)} />}
      <Cursor />
      <HudCorners />
      <Telemetry />
      <Vignette />
      <Grain />
      <Wipe />
      <Command />

      <div
        className={`pointer-events-none fixed inset-0 -z-20 ${theme === "mecha" ? "blueprint-paper" : "hex-grid"}`}
        style={{
          maskImage: "radial-gradient(ellipse at 50% 20%, #000 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 20%, #000 30%, transparent 85%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1100px 700px at 50% -10%, rgb(var(--c1)/0.16), transparent 60%), radial-gradient(800px 600px at 90% 90%, rgb(var(--c2)/0.12), transparent 60%), linear-gradient(rgb(var(--bg0)), rgb(var(--bg1)) 55%, rgb(var(--bg0)))",
        }}
      />
      <FieldCanvas theme={theme} />

      <Nav />
      <ScrollRail />

      <main className="relative">
        <Hero />
        <Marquee />

        <section className="mx-auto max-w-6xl px-5 pt-6 pb-10">
          <Achievements />
        </section>

        <section id="signal" className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle index="00" title={C.signal[0]} sub={C.signal[1]} />
          <Cinema />
        </section>

        <section id="nodes" className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle index="01" title={C.nodes[0]} sub={C.nodes[1]} />
          <ProjectGrid />
        </section>

        <section id="services" className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle index="02" title={C.svc[0]} sub={C.svc[1]} />
          <Services />
        </section>

        <section id="systems" className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle index="03" title={C.sys[0]} sub={C.sys[1]} />
          <Skills />
          <Method />
          <div className="mt-14">
            <StackOrbit />
          </div>
        </section>

        <section id="sky" className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle index="04" title={C.sky[0]} sub={C.sky[1]} />
          <Constellation />
        </section>

        <section id="voices" className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle index="05" title={C.voices[0]} sub={C.voices[1]} />
          <Testimonials />
        </section>

        <section id="matrix" className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle index="06" title={C.mx[0]} sub={C.mx[1]} />
          <AppMatrix />
        </section>

        <section id="studio" className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle index="07" title={C.studio[0]} sub={C.studio[1]} />
          <Studio />
        </section>

        <section id="log" className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle index="08" title={C.log[0]} sub={C.log[1]} />
          <Timeline />
        </section>

        <section id="faq" className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle index="09" title={C.faq[0]} sub={C.faq[1]} />
          <Faq />
        </section>

        <div className="mx-auto max-w-6xl px-5">
          <CtaBand />
        </div>

        <section id="link" className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle index="10" title={C.link[0]} sub={C.link[1]} />
          <Contact />
        </section>

        <footer className="mt-6 border-t py-8 text-center" style={{ borderColor: "rgb(var(--c1)/0.18)" }}>
          <div className="t1 font-hud text-[10px] tracking-[0.3em] a-flicker">
            {THEMES[theme].icon} {THEMES[theme].name} · ULTRA PRO MAX
          </div>
          <div className="mt-2 text-[10px] tracking-[0.2em] text-slate-500">
            © {new Date().getFullYear()} {PROFILE.name} · KEYS 1/2/3 THEMES · / COMMAND
          </div>
        </footer>
      </main>

      <AICore />
    </div>
  );
}

export default function App() {
  return (
    <SysProvider>
      <Shell />
    </SysProvider>
  );
}
