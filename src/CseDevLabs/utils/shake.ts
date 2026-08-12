// Short decaying screen-shake used as the visual stand-in for the script's
// "hard stamp/thud sound synced to text landing" impact beats.
export function shakeOffset(frame: number, impactFrame: number, magnitude = 10, duration = 10) {
  const t = frame - impactFrame;
  if (t < 0 || t > duration) return { x: 0, y: 0 };
  const decay = 1 - t / duration;
  const x = Math.sin(t * 3.1) * magnitude * decay;
  const y = Math.cos(t * 2.3) * magnitude * decay * 0.6;
  return { x, y };
}

export function flashOpacity(frame: number, impactFrame: number, duration = 6) {
  const t = frame - impactFrame;
  if (t < 0 || t > duration) return 0;
  return (1 - t / duration) * 0.55;
}
