import { AbsoluteFill, useCurrentFrame } from "remotion";

// Very subtle drifting grain — the brief calls for "very subtle film grain",
// never a heavy texture.
export const FilmGrain: React.FC<{ intensity?: number }> = ({ intensity = 0.06 }) => {
  const frame = useCurrentFrame();
  const drift = (frame * 2.9) % 240;

  return (
    <AbsoluteFill
      style={{
        opacity: intensity,
        mixBlendMode: "overlay",
        backgroundImage:
          "repeating-radial-gradient(circle at 0 0, rgba(255,255,255,0.9) 0, rgba(255,255,255,0.9) 1px, transparent 1px, transparent 3px)",
        backgroundSize: "5px 5px",
        transform: `translate(${drift % 5}px, ${(drift * 1.3) % 5}px)`,
        pointerEvents: "none",
      }}
    />
  );
};
