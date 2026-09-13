let ctx: AudioContext | null = null;
let enabled = false;

export function setAudio(on: boolean) {
  enabled = on;
  if (on) {
    ctx ??= new AudioContext();
    void ctx.resume();
  }
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType,
  gain = 0.045,
  slide?: number
) {
  if (!enabled || !ctx) return;
  const t0 = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, slide), t0 + dur);
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.02);
}

export const sfx = {
  tick: () => tone(980, 0.045, "square", 0.025),
  open: () => {
    tone(180, 0.2, "sine", 0.05, 640);
    tone(360, 0.12, "triangle", 0.02);
  },
  close: () => tone(520, 0.12, "sine", 0.03, 140),
  switch: () => {
    tone(110, 0.28, "sawtooth", 0.03, 380);
    tone(440, 0.1, "square", 0.018);
  },
  burst: () => {
    tone(70, 0.32, "sawtooth", 0.04, 36);
    tone(880, 0.08, "square", 0.02);
  },
  hover: () => tone(1400, 0.03, "square", 0.012),
};
