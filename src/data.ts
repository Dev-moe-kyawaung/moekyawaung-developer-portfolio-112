export type ThemeKey = "quantum" | "mecha" | "plasma";

export const THEMES: Record<
  ThemeKey,
  { key: ThemeKey; name: string; tag: string; icon: string; blurb: string; code: string }
> = {
  quantum: {
    key: "quantum",
    name: "QUANTUM MATRIX",
    tag: "Ψ-FIELD",
    icon: "⟁",
    blurb: "entangled node graph · fractal data cascade",
    code: "QM-07",
  },
  mecha: {
    key: "mecha",
    name: "MECHA BLUEPRINT",
    tag: "REV-04.2",
    icon: "⚙",
    blurb: "schematic line-draw · exploded module view",
    code: "MB-04",
  },
  plasma: {
    key: "plasma",
    name: "PLASMA REACTOR",
    tag: "CORE-Σ",
    icon: "◎",
    blurb: "rotating energy core · neon particle flux",
    code: "PR-Σ1",
  },
};

const C = "https://res.cloudinary.com/dye5qpwii/image/upload";
const V = "https://res.cloudinary.com/dye5qpwii/video/upload";

export const HERO_ART: Record<ThemeKey, string> = {
  quantum: "/hero-quantum.jpg",
  mecha: "/hero-mecha.jpg",
  plasma: "/hero-plasma.jpg",
};

export const IMG = {
  avatar: `${C}/v1778527878/IMG_20260430_053105_uef0yr.png`,
  mka25: `${C}/v1778763535/MKA_25_lbx6fb.webp`,
  mka12: `${C}/v1778763531/MKA_12_iv8kpm.webp`,
  mka3: `${C}/v1778763531/MKA_3_zqrhhr.webp`,
  mka11: `${C}/v1778763532/MKA_11_jbijtv.webp`,
  mka13: `${C}/v1778763532/MKA_13_i4bao3.webp`,
  mka22: `${C}/v1778795801/MKA_22_felevo.webp`,
  still20: `${C}/v1778795799/2024119_20_b94fen.jpg`,
  still18: `${C}/v1778795800/2024119_18_syk2ou.jpg`,
  still12: `${C}/v1778795800/2024119_12_sqhcat.jpg`,
  content: `${C}/v1779031816/Content_65_oayzj3.jpg`,
  fireworks: `${C}/v1779052645/2153-fireworks-composer_gm3e0h.jpg`,
  preview: `${C}/v1778795822/preview_dzhqvv.webp`,
  preview2: `${C}/v1778763536/preview_ls5ptn.webp`,
  cloud: `${C}/v1778795825/cloud-icon-poster-1_2_opl7sy.png`,
  cop1: `${C}/v1778795856/copilot_image_1778795675037_heh9xk.png`,
  cop2: `${C}/v1778795856/copilot_image_1778794626112_ega7kk.png`,
  cop3: `${C}/v1778795859/copilot_image_1778794430377_n7xlmz.png`,
  cop4: `${C}/v1778795856/copilot_image_1778795000722_eo96gj.png`,
  cop5: `${C}/v1778795847/copilot_image_1778795115579_acfm5j.png`,
  cop6: `${C}/v1778795853/copilot_image_1778794781671_kytvkc.png`,
  art: `${C}/v1778747388/image-1_1_khsx9s.png`,
};

export const PROFILE = {
  name: "MOE KYAW AUNG",
  handle: "@moekyawaung-tech",
  role: "Senior Frontend / Full-Stack Engineer",
  avatar: IMG.avatar,
  location: "Myanmar · Remote (GMT+6:30)",
  phones: ["+95 9 889 000 889", "+959 666 000 050"],
  github: "https://github.com/Dev-moe-kyawaung/",
  gravatar: "https://gravatar.com/moekyawaung2026",
  summary:
    "I architect production-grade web systems — POS platforms, real-time dashboards, PWAs and game engines — with an obsession for performance budgets, offline-first resilience and interfaces that feel alive.",
  stats: [
    { label: "REPOSITORIES", value: 120, suffix: "+" },
    { label: "DEPLOYED APPS", value: 43, suffix: "" },
    { label: "LIGHTHOUSE AVG", value: 97, suffix: "/100" },
    { label: "YEARS SHIPPING", value: 8, suffix: "y" },
  ],
};

export type Group = "commerce" | "realtime" | "media" | "engine" | "edge" | "market" | "ops";

export type Project = {
  id: string;
  n: string;
  title: string;
  cat: string;
  group: Group;
  desc: string;
  long: string;
  stack: string[];
  url: string;
  year: string;
  cover: string;
  featured?: boolean;
  metrics: { k: string; v: number }[];
  x: number;
  y: number;
  links: string[];
};

export const FILTERS: { id: "all" | Group; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "commerce", label: "COMMERCE" },
  { id: "realtime", label: "REALTIME" },
  { id: "media", label: "MEDIA" },
  { id: "engine", label: "ENGINE" },
  { id: "edge", label: "EDGE" },
  { id: "market", label: "MARKET" },
  { id: "ops", label: "OPS" },
];

export const PROJECTS: Project[] = [
  {
    id: "pos",
    n: "01",
    title: "POS Ultimate Pro Max",
    cat: "COMMERCE CORE",
    group: "commerce",
    desc: "Offline-first point-of-sale with IndexedDB sync queue, multi-terminal conflict resolution, thermal receipt pipeline and role-scoped audit trails.",
    long: "A multi-terminal retail kernel. Every sale is a durable mutation: written to IndexedDB first, clocked with a per-device Lamport stamp, then replayed through a conflict-aware sync worker. Receipts rasterise offscreen and encode to ESC/POS. Role scopes cut the UI to the millimetre — cashier, manager, auditor — without shipping three apps.",
    stack: ["React", "IndexedDB", "Service Worker", "Chart.js"],
    url: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
    year: "2026",
    cover: IMG.cop1,
    featured: true,
    metrics: [
      { k: "SYNC LATENCY", v: 92 },
      { k: "OFFLINE COVER", v: 100 },
      { k: "TX/SEC", v: 78 },
    ],
    x: 18,
    y: 22,
    links: ["admin", "shop"],
  },
  {
    id: "social",
    n: "02",
    title: "Social Dashboard",
    cat: "REALTIME ANALYTICS",
    group: "realtime",
    desc: "Streaming engagement analytics with virtualised feeds, websocket fan-out, and a composable widget grid persisted per-user.",
    long: "One multiplexed websocket, a decode worker, and a selector store so only dirty widgets repaint. Backpressure drops stale frames instead of queueing them. The grid is a persisted layout AST — operators rearrange tiles, the schema survives reloads.",
    stack: ["React", "WebSocket", "Recharts", "Zustand"],
    url: "https://github.com/moekyawaung-tech/social-dashboard",
    year: "2025",
    cover: IMG.cop2,
    featured: true,
    metrics: [
      { k: "FRAME BUDGET", v: 96 },
      { k: "STREAM UPTIME", v: 99 },
      { k: "WIDGETS", v: 64 },
    ],
    x: 48,
    y: 10,
    links: ["admin", "stock"],
  },
  {
    id: "video",
    n: "03",
    title: "Video Player Engine",
    cat: "MEDIA RUNTIME",
    group: "media",
    desc: "Custom HLS-aware player: adaptive bitrate ladder, frame-accurate scrubbing, gesture layer and picture-in-picture orchestration.",
    long: "A player that treats the timeline as a data structure. HLS ladder switching, frame-accurate scrub via buffered keyframe index, MediaSession integration, and a gesture layer that never fights native controls. Picture-in-picture is a first-class scene, not an afterthought.",
    stack: ["TypeScript", "HLS.js", "Canvas", "MediaSession"],
    url: "https://github.com/moekyawaung-tech/video-player",
    year: "2025",
    cover: IMG.cop3,
    metrics: [
      { k: "STARTUP MS", v: 88 },
      { k: "REBUFFER", v: 94 },
      { k: "CODECS", v: 71 },
    ],
    x: 79,
    y: 24,
    links: ["game", "social"],
  },
  {
    id: "game",
    n: "04",
    title: "Game Collection",
    cat: "CANVAS ENGINE",
    group: "engine",
    desc: "Twelve arcade titles on one deterministic game loop: fixed timestep physics, sprite atlas batching and a shared save-state kernel.",
    long: "One RAF loop, one physics step, twelve personalities. Sprite atlases batch into a single draw call where possible; audio is a tiny graph of oscillators + buffers. Save-state is a serialisable world snapshot, not twelve ad-hoc localStorage keys.",
    stack: ["Canvas2D", "RAF Loop", "Web Audio", "LocalStorage"],
    url: "https://github.com/moekyawaung-tech/game-collection",
    year: "2024",
    cover: IMG.cop4,
    metrics: [
      { k: "FPS LOCK", v: 98 },
      { k: "BUNDLE KB", v: 83 },
      { k: "TITLES", v: 60 },
    ],
    x: 86,
    y: 58,
    links: ["pwa"],
  },
  {
    id: "pwa",
    n: "05",
    title: "PWA App Shell",
    cat: "EDGE RUNTIME",
    group: "edge",
    desc: "Installable app shell with stale-while-revalidate routing, background sync, push channel and a 14 kB critical path.",
    long: "The shell is the product. Precache the chrome, SWR the data, background-sync the writes, push-wake the worker. Critical path holds at 14 kB gzipped. Install prompts fire only after a meaningful gesture — never as a banner.",
    stack: ["Workbox", "Vite", "Push API", "Manifest"],
    url: "https://github.com/moekyawaung-tech/pwa-app",
    year: "2025",
    cover: IMG.cloud,
    metrics: [
      { k: "TTI SCORE", v: 97 },
      { k: "CACHE HIT", v: 91 },
      { k: "INSTALLS", v: 55 },
    ],
    x: 60,
    y: 74,
    links: ["job", "weather"],
  },
  {
    id: "job",
    n: "06",
    title: "Job Portal App",
    cat: "MARKETPLACE",
    group: "market",
    desc: "Two-sided hiring marketplace: faceted search over a worker-side index, resume parser and applicant funnel state machine.",
    long: "Search runs in a worker over a Fuse/inverted index so the UI thread never stutters. The funnel is an XState machine — applied, screening, offer, hired — with time-travel for support. Resume parsing is a pipeline of heuristics, not a black box.",
    stack: ["React", "Web Worker", "Fuse.js", "XState"],
    url: "https://github.com/moekyawaung-tech/Job-Portal-App",
    year: "2025",
    cover: IMG.cop5,
    metrics: [
      { k: "SEARCH MS", v: 90 },
      { k: "FUNNEL CVR", v: 68 },
      { k: "FACETS", v: 74 },
    ],
    x: 30,
    y: 68,
    links: ["admin"],
  },
  {
    id: "weather",
    n: "07",
    title: "Weather + Planner",
    cat: "AMBIENT DATA",
    group: "edge",
    desc: "Geo-aware forecast client with animated pressure fields, offline cache tiers and a daily planner fused to the forecast timeline.",
    long: "Forecast as a timeline, planner as a sibling track. Pressure fields animate as SVG vector fields. Cache tiers keep yesterday's sky when the radio dies. The two surfaces share a clock so a meeting never lands in a storm without a warning.",
    stack: ["OpenWeather", "SVG Anim", "Cache API"],
    url: "https://github.com/moekyawaung-tech/Weather-app",
    year: "2024",
    cover: IMG.cop6,
    metrics: [
      { k: "COLD START", v: 89 },
      { k: "ACCURACY", v: 86 },
      { k: "CITIES", v: 93 },
    ],
    x: 12,
    y: 52,
    links: ["stock"],
  },
  {
    id: "stock",
    n: "08",
    title: "Stock & Crypto Deck",
    cat: "FINANCE STREAM",
    group: "realtime",
    desc: "Multi-symbol tape with candle aggregation in a worker, drawn on an offscreen canvas at 60 fps with 10k-point windows.",
    long: "Ticks arrive faster than paint. Aggregation happens in a worker; an OffscreenCanvas commits candles at 60 fps with a 10k-point sliding window. Scales are d3; hit-testing is a binary search over time, not pixel scanning.",
    stack: ["OffscreenCanvas", "WS", "D3-scale"],
    url: "https://github.com/moekyawaung-tech/javascript-todo",
    year: "2024",
    cover: IMG.art,
    metrics: [
      { k: "DRAW COST", v: 95 },
      { k: "SYMBOLS", v: 80 },
      { k: "TICK RATE", v: 87 },
    ],
    x: 42,
    y: 42,
    links: ["admin"],
  },
  {
    id: "admin",
    n: "09",
    title: "Admin Control Deck",
    cat: "OPS CONSOLE",
    group: "ops",
    desc: "RBAC console wired to the POS + portal cores: live table virtualisation, bulk mutation queue and exportable audit ledgers.",
    long: "The ops surface that sits above the POS and portal. TanStack virtualisation for ledgers that refuse to paginate poorly. Bulk mutations enqueue, preview, then commit. Every action is an exportable audit row — because trust is a log, not a promise.",
    stack: ["React", "TanStack", "RBAC", "CSV Stream"],
    url: "https://github.com/Moekyawaung-cyber/Hospital-Lists",
    year: "2025",
    cover: IMG.mka25,
    metrics: [
      { k: "ROWS/SEC", v: 94 },
      { k: "ROLE DEPTH", v: 72 },
      { k: "AUDIT", v: 99 },
    ],
    x: 68,
    y: 46,
    links: [],
  },
  {
    id: "shop",
    n: "10",
    title: "Thailand Travel / Lens Lite",
    cat: "EXPERIENCE",
    group: "media",
    desc: "Editorial travel surface + a lightweight in-browser photo lab: WASM filters, EXIF reader and progressive image pipeline.",
    long: "A travel narrative that loads like a magazine and a photo lab that never leaves the tab. WASM filters, EXIF orientation, srcset ladders, LQIP. Intersection observers decide what earns a decode. The two products share an image pipeline.",
    stack: ["WASM", "Intersection API", "EXIF", "srcset"],
    url: "https://github.com/moekyawaung-tech/thailand-travel",
    year: "2024",
    cover: IMG.preview2,
    metrics: [
      { k: "LCP", v: 93 },
      { k: "CLS", v: 98 },
      { k: "FILTERS", v: 66 },
    ],
    x: 26,
    y: 90,
    links: ["pwa"],
  },
];

export const SKILLS = [
  { name: "React / TypeScript", v: 96, note: "hooks, suspense, RSC patterns" },
  { name: "Canvas / WebGL / SVG", v: 90, note: "60fps render loops" },
  { name: "PWA & Offline Sync", v: 93, note: "workbox, conflict merge" },
  { name: "State Architecture", v: 88, note: "xstate, zustand, signals" },
  { name: "Node / API Design", v: 84, note: "REST, WS, edge functions" },
  { name: "Performance Budgets", v: 92, note: "profiling, code-split" },
];

export const TIMELINE = [
  {
    y: "2026",
    t: "Senior Frontend Architect",
    d: "Leading POS Ultimate line — multi-tenant, offline-first retail platform shipped to live stores.",
  },
  {
    y: "2024",
    t: "Full-Stack Product Engineer",
    d: "Realtime dashboards, job marketplace and media runtimes across 40+ deployed GitHub Pages surfaces.",
  },
  {
    y: "2022",
    t: "Frontend Engineer",
    d: "PWA conversions, Lighthouse rescue work, design-system authoring for SME clients.",
  },
  {
    y: "2019",
    t: "Self-taught → Shipping",
    d: "Started with vanilla JS games and todo engines; never stopped shipping since.",
  },
];

export const PRINCIPLES = [
  {
    n: "01",
    t: "OFFLINE IS THE HAPPY PATH",
    d: "If it doesn't work in a basement with no radio, it isn't finished. Queues, clocks, merge policies.",
  },
  {
    n: "02",
    t: "EIGHT MILLISECONDS",
    d: "Paint budget is sacred. Workers get the math; the main thread gets the feeling.",
  },
  {
    n: "03",
    t: "STATE AS A MACHINE",
    d: "If a flow has more than two rooms, it gets a graph. Time-travel is a feature, not a debugger.",
  },
  {
    n: "04",
    t: "SHIP THE TEMPERATURE",
    d: "Interfaces should feel like instruments. Motion is load-bearing, not decoration.",
  },
];

export const METHOD = [
  { n: "01", t: "DISCOVER", d: "Constraints first. Devices, networks, operators, failure modes." },
  { n: "02", t: "ARCHITECT", d: "Topology on paper. Sync, cache, ownership, observability." },
  { n: "03", t: "BUILD", d: "Vertical slices. The first commit already runs offline." },
  { n: "04", t: "CALIBRATE", d: "Profiles, budgets, field notes. Then we turn the lights up." },
];

export const TECH = [
  "React",
  "TypeScript",
  "Canvas",
  "WebGL",
  "PWA",
  "IndexedDB",
  "WebSocket",
  "XState",
  "Workbox",
  "HLS.js",
  "WASM",
  "Vite",
  "TanStack",
  "OffscreenCanvas",
  "Service Worker",
  "Web Audio",
];

export const REELS = [
  {
    src: `${V}/v1779052711/Javier_Black-Dark-Ring.mp4`,
    title: "DARK RING",
    tag: "KINETIC 01",
    note: "orbital mass · exposure study",
  },
  {
    src: `${V}/v1779052732/Javier_Pardina_2_l1mtud.mp4`,
    title: "VECTOR CUT",
    tag: "KINETIC 02",
    note: "editorial tempo · hard light",
  },
  {
    src: `${V}/v1779031657/COACH_-_Javier_Pardina_gdjsjg.mp4`,
    title: "COACH SIGNAL",
    tag: "KINETIC 03",
    note: "brand grammar · hold frames",
  },
  {
    src: `${V}/v1779052708/AUDI_-_Javier_Pardina_1_gavyon.mp4`,
    title: "LINE VELOCITY",
    tag: "KINETIC 04",
    note: "machine lyric · chrome + night",
  },
];

export const PAGES = [
  { name: "moekyawaung-tech", url: "https://moekyawaung-tech.github.io/" },
  { name: "moekyawaung-senior", url: "https://moekyawaung-senior.github.io/" },
  { name: "Moekyawaung-Development", url: "https://Moekyawaung-Development.github.io/" },
  { name: "moekyawaung-developer", url: "https://moekyawaung-developer.github.io/" },
  { name: "moekyawaung-designer", url: "https://moekyawaung-designer.github.io/" },
  { name: "Moekyawaung-coder", url: "https://Moekyawaung-coder.github.io/" },
  { name: "Moekyawaung-Linux", url: "https://Moekyawaung-Linux.github.io/" },
  { name: "moekyawaung-hack", url: "https://moekyawaung-hack.github.io/" },
  { name: "moekyawaung-graduate", url: "https://moekyawaung-graduate.github.io/" },
  { name: "moekyawaung-edu", url: "https://moekyawaung-edu.github.io/" },
  { name: "moekyawaung-google", url: "https://moekyawaung-google.github.io/" },
  { name: "moekyawaung-microsoft", url: "https://moekyawaung-microsoft.github.io/" },
  { name: "moekyawaung-china", url: "https://moekyawaung-china.github.io/" },
  { name: "moekyawaung-bangkok", url: "https://moekyawaung-bangkok.github.io/" },
  { name: "moekyawaung-cyber", url: "https://moekyawaung-cyber.github.io/" },
  { name: "Moe-KyawAung", url: "https://Moe-KyawAung.github.io/" },
  { name: "Moekyawaung2026", url: "https://Moekyawaung2026.github.io/" },
  { name: "moekyawaung-creator", url: "https://moekyawaung-creator.github.io/" },
  { name: "moekyawaung-webdeveloper", url: "https://moekyawaung-webdeveloper.github.io/" },
  { name: "MoeKyawAung-code", url: "https://MoeKyawAung-code.github.io/" },
];

export const LOVABLE = [
  { name: "happy-cv-creator", url: "https://happy-cv-creator.lovable.app" },
  { name: "moekyawaung", url: "https://moekyawaung.lovable.app" },
  { name: "moekyawaungmybio", url: "https://moekyawaungmybio.lovable.app/" },
  { name: "the-cv-palette", url: "https://the-cv-palette.lovable.app" },
  { name: "cv-beacon", url: "https://cv-beacon.lovable.app/" },
  { name: "profile-persuasion-hub", url: "https://profile-persuasion-hub.lovable.app" },
  { name: "pixel-perfect-snap", url: "https://pixel-perfect-snap-39.lovable.app" },
  { name: "joy-codify-life", url: "https://joy-codify-life.lovable.app/" },
  { name: "moe-kyaw-aung", url: "https://moe-kyaw-aung.lovable.app" },
  { name: "dev-moekyawaung", url: "https://dev-moekyawaung.lovable.app" },
];

export const GALLERY = [
  { src: IMG.avatar, cap: "OPERATOR / PRIMARY" },
  { src: IMG.mka25, cap: "STUDIO 25" },
  { src: IMG.mka12, cap: "STUDIO 12" },
  { src: IMG.mka3, cap: "STUDIO 03" },
  { src: IMG.mka11, cap: "STUDIO 11" },
  { src: IMG.mka13, cap: "STUDIO 13" },
  { src: IMG.still20, cap: "FIELD 20" },
  { src: IMG.still18, cap: "FIELD 18" },
  { src: IMG.content, cap: "EDITORIAL 65" },
  { src: IMG.fireworks, cap: "COMPOSER / BURST" },
];

export const APPS = [
  "Social Dashboard",
  "PWA App",
  "Admin Dashboard",
  "Stock Market",
  "Game Collection",
  "Music Player",
  "Chat App",
  "World Cup",
  "E-commerce",
  "Portfolio",
  "Money Tracker",
  "Weather",
  "Crypto",
  "Todo",
  "Video Player",
  "LEGEND!",
];

export type AiAnswer = {
  match: string[];
  title: string;
  lines: string[];
  nodes: { id: string; label: string; x: number; y: number; kind: string }[];
  edges: [number, number][];
};

export const AI_ANSWERS: AiAnswer[] = [
  {
    match: ["pos", "offline", "sync", "retail", "commerce"],
    title: "OFFLINE-FIRST POS TOPOLOGY",
    lines: [
      "Writes hit IndexedDB first; a durable mutation queue replays on reconnect.",
      "Conflicts resolve via per-terminal Lamport clock + server merge policy.",
      "Receipts render to an offscreen canvas then stream to ESC/POS bytes.",
    ],
    nodes: [
      { id: "ui", label: "POS TERMINAL UI", x: 14, y: 22, kind: "client" },
      { id: "q", label: "MUTATION QUEUE", x: 50, y: 14, kind: "core" },
      { id: "idb", label: "INDEXEDDB STORE", x: 14, y: 66, kind: "store" },
      { id: "sw", label: "SERVICE WORKER", x: 50, y: 50, kind: "core" },
      { id: "api", label: "SYNC API / EDGE", x: 86, y: 30, kind: "api" },
      { id: "db", label: "PRIMARY LEDGER", x: 86, y: 76, kind: "store" },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
  },
  {
    match: ["realtime", "socket", "dashboard", "stream", "analytics", "social"],
    title: "REALTIME STREAM FAN-OUT",
    lines: [
      "Single websocket multiplexes topics; a worker decodes + aggregates frames.",
      "UI subscribes through a selector store so only dirty widgets repaint.",
      "Backpressure drops stale frames instead of queueing them.",
    ],
    nodes: [
      { id: "ws", label: "WS GATEWAY", x: 14, y: 26, kind: "api" },
      { id: "w", label: "DECODE WORKER", x: 48, y: 18, kind: "core" },
      { id: "agg", label: "AGGREGATOR", x: 48, y: 56, kind: "core" },
      { id: "st", label: "SELECTOR STORE", x: 80, y: 32, kind: "store" },
      { id: "ui", label: "WIDGET GRID", x: 80, y: 74, kind: "client" },
      { id: "bp", label: "BACKPRESSURE", x: 14, y: 70, kind: "client" },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [0, 5],
      [5, 2],
    ],
  },
  {
    match: ["perf", "performance", "speed", "lighthouse", "optimi", "fast"],
    title: "PERFORMANCE BUDGET CIRCUIT",
    lines: [
      "Critical path capped at 14 kB; everything else is route-split and prefetched on intent.",
      "Heavy math is pushed to workers; paint work stays under 8 ms/frame.",
      "Images ship as AVIF with srcset ladders and LQIP placeholders.",
    ],
    nodes: [
      { id: "e", label: "EDGE CDN", x: 12, y: 22, kind: "api" },
      { id: "sh", label: "APP SHELL 14kB", x: 44, y: 16, kind: "core" },
      { id: "rt", label: "ROUTE SPLIT", x: 44, y: 58, kind: "core" },
      { id: "wk", label: "WORKER POOL", x: 78, y: 26, kind: "store" },
      { id: "px", label: "PAINT <8ms", x: 78, y: 70, kind: "client" },
      { id: "im", label: "AVIF LADDER", x: 12, y: 70, kind: "store" },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 4],
      [1, 3],
      [3, 4],
      [0, 5],
      [5, 2],
    ],
  },
  {
    match: ["pwa", "install", "worker", "cache", "push"],
    title: "PWA SHELL & CACHE TIERS",
    lines: [
      "Shell is precached; data uses stale-while-revalidate with TTL tiers.",
      "Background sync flushes deferred writes when the radio returns.",
      "Push channel wakes the SW to hydrate notification payloads.",
    ],
    nodes: [
      { id: "m", label: "MANIFEST", x: 14, y: 20, kind: "client" },
      { id: "sw", label: "SERVICE WORKER", x: 48, y: 22, kind: "core" },
      { id: "pc", label: "PRECACHE SHELL", x: 48, y: 62, kind: "store" },
      { id: "sr", label: "SWR DATA TIER", x: 82, y: 24, kind: "store" },
      { id: "bs", label: "BG SYNC QUEUE", x: 82, y: 66, kind: "core" },
      { id: "ps", label: "PUSH CHANNEL", x: 14, y: 64, kind: "api" },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 4],
      [5, 1],
      [2, 4],
    ],
  },
  {
    match: ["video", "player", "hls", "media"],
    title: "MEDIA RUNTIME GRAPH",
    lines: [
      "Manifest → ladder selector → MSE buffer → render clock.",
      "Scrub targets the nearest keyframe; gestures never starve the decoder.",
      "MediaSession and PiP are peer scenes of the same controller.",
    ],
    nodes: [
      { id: "m", label: "HLS MANIFEST", x: 14, y: 24, kind: "api" },
      { id: "l", label: "ABR LADDER", x: 46, y: 18, kind: "core" },
      { id: "b", label: "MSE BUFFER", x: 46, y: 62, kind: "store" },
      { id: "c", label: "RENDER CLOCK", x: 80, y: 30, kind: "core" },
      { id: "p", label: "PiP SCENE", x: 80, y: 72, kind: "client" },
      { id: "g", label: "GESTURE LAYER", x: 14, y: 68, kind: "client" },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [5, 3],
      [5, 1],
    ],
  },
  {
    match: ["hire", "contact", "work", "available", "who", "about", "you"],
    title: "ENGAGEMENT PIPELINE",
    lines: [
      "Moe Kyaw Aung — senior frontend/full-stack, 8 years shipping, remote GMT+6:30.",
      "Best fit: complex client-side systems, offline sync, realtime data surfaces.",
      "Reach out at +95 9 889 000 889 or via GitHub.",
    ],
    nodes: [
      { id: "y", label: "YOUR BRIEF", x: 14, y: 24, kind: "client" },
      { id: "d", label: "DISCOVERY", x: 46, y: 18, kind: "core" },
      { id: "a", label: "ARCHITECTURE", x: 46, y: 60, kind: "core" },
      { id: "b", label: "BUILD SPRINTS", x: 80, y: 28, kind: "api" },
      { id: "s", label: "SHIP + MONITOR", x: 80, y: 70, kind: "store" },
      { id: "h", label: "HANDOVER DOCS", x: 14, y: 66, kind: "store" },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
    ],
  },
];

export const AI_FALLBACK: AiAnswer = {
  match: [],
  title: "GENERIC SYSTEM MAP",
  lines: [
    "Rendering a default layered architecture for that query.",
    "Client shell → transport → domain core → persistence, with observability across all tiers.",
    "Ask about POS, realtime, PWA, performance, video or hiring for a deeper schematic.",
  ],
  nodes: [
    { id: "c", label: "CLIENT SHELL", x: 14, y: 24, kind: "client" },
    { id: "t", label: "TRANSPORT", x: 46, y: 20, kind: "api" },
    { id: "k", label: "DOMAIN CORE", x: 46, y: 62, kind: "core" },
    { id: "p", label: "PERSISTENCE", x: 80, y: 30, kind: "store" },
    { id: "o", label: "OBSERVABILITY", x: 80, y: 72, kind: "core" },
    { id: "u", label: "USER", x: 14, y: 68, kind: "client" },
  ],
  edges: [
    [5, 0],
    [0, 1],
    [1, 2],
    [2, 3],
    [2, 4],
    [3, 4],
  ],
};

export const AI_PROMPTS = [
  "How does the POS sync offline?",
  "Show realtime dashboard architecture",
  "What's your performance strategy?",
  "Map the PWA cache tiers",
  "Are you available for hire?",
];

/* ---------- ULTRA PRO MAX layer ---------- */

export const SERVICES = [
  {
    n: "01",
    icon: "◈",
    title: "PRODUCT ENGINEERING",
    d: "End-to-end web apps: architecture, build, ship. POS, dashboards, marketplaces.",
    tags: ["React", "TypeScript", "Node"],
    price: "FLAGSHIP",
  },
  {
    n: "02",
    icon: "⟟",
    title: "OFFLINE / PWA SYSTEMS",
    d: "Installable, sync-resilient apps that survive dead radios and flaky networks.",
    tags: ["Workbox", "IndexedDB", "Sync"],
    price: "SPECIALIST",
  },
  {
    n: "03",
    icon: "◉",
    title: "REALTIME & DATAVIZ",
    d: "Websocket fan-out, canvas/WebGL charts, 60fps streaming surfaces.",
    tags: ["WebSocket", "Canvas", "D3"],
    price: "SPECIALIST",
  },
  {
    n: "04",
    icon: "⚡",
    title: "PERFORMANCE RESCUE",
    d: "Lighthouse recovery, bundle surgery, paint-budget enforcement, profiling.",
    tags: ["Profiling", "Code-split", "AVIF"],
    price: "SPRINT",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Moe rebuilt our POS to run fully offline. Stores stopped losing sales during outages — the sync just catches up. Rare blend of speed and rigor.",
    name: "Retail Ops Lead",
    role: "Multi-store client · Yangon",
  },
  {
    quote:
      "Our dashboard went from janky to buttery. He moved the heavy work off the main thread and the whole team noticed within a day.",
    name: "Product Manager",
    role: "Analytics platform",
  },
  {
    quote:
      "He treats performance like a feature, not an afterthought. Shipped a 14kB critical path and a Lighthouse score we didn't think possible.",
    name: "Founding Engineer",
    role: "SaaS startup",
  },
  {
    quote:
      "Clean state machines, documented handover, zero drama. The kind of senior engineer you keep on speed dial.",
    name: "CTO",
    role: "Marketplace",
  },
];

export const FAQ = [
  {
    q: "What kind of work fits best?",
    a: "Complex client-side systems — offline-first apps, realtime dashboards, media runtimes, and performance rescue. If it has to feel instant and never lose data, that's my lane.",
  },
  {
    q: "How do you engage?",
    a: "Fixed-scope sprints or ongoing retainer. Discovery first, architecture on paper, vertical slices that run offline from commit one. Remote, async-friendly, GMT+6:30.",
  },
  {
    q: "What's your stack?",
    a: "React + TypeScript at the core, Canvas/WebGL/SVG for visuals, Workbox/IndexedDB for offline, XState for flows, Node/edge for APIs. I pick tools per constraint, not per hype.",
  },
  {
    q: "Can you rescue an existing codebase?",
    a: "Yes — that's a lot of my work. Profiling, bundle surgery, incremental refactors, and a paint budget you can actually keep. No big-bang rewrites unless truly warranted.",
  },
  {
    q: "How fast can you start?",
    a: "Typically within a week for sprints. Reach out via GitHub or phone and we'll scope it in a short call.",
  },
];

export const ACHIEVEMENTS = [
  { k: "OPEN-SOURCE REPOS", v: 120, s: "+", note: "public GitHub surface" },
  { k: "LIVE DEPLOYMENTS", v: 43, s: "", note: "pages + lovable apps" },
  { k: "AVG LIGHTHOUSE", v: 97, s: "", note: "across shipped builds" },
  { k: "YEARS SHIPPING", v: 8, s: "", note: "never stopped" },
  { k: "OFFLINE COVERAGE", v: 100, s: "%", note: "POS Ultimate line" },
  { k: "FRAME BUDGET", v: 8, s: "ms", note: "paint ceiling" },
];

export const STACK_ORBIT = [
  { name: "React", ring: 0 },
  { name: "TypeScript", ring: 0 },
  { name: "Vite", ring: 0 },
  { name: "Canvas", ring: 1 },
  { name: "WebGL", ring: 1 },
  { name: "SVG", ring: 1 },
  { name: "IndexedDB", ring: 2 },
  { name: "Workbox", ring: 2 },
  { name: "XState", ring: 2 },
  { name: "Node", ring: 3 },
  { name: "WebSocket", ring: 3 },
  { name: "WASM", ring: 3 },
];
