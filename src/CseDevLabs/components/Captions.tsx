import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTION_WORDS } from "../data/transcript";
import { bodyFont } from "../fonts";

const WINDOW = 6; // words shown on screen at once, current word centered/highlighted

// Bold word-by-word karaoke captions, burned in for the full runtime.
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeIndex = CAPTION_WORDS.findIndex(
    (w) => frame >= w.startFrame && frame < w.endFrame,
  );
  if (activeIndex === -1) return null;

  const groupStart = Math.floor(activeIndex / WINDOW) * WINDOW;
  const group = CAPTION_WORDS.slice(groupStart, groupStart + WINDOW);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 210,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 0.4em",
          maxWidth: 900,
          padding: "0 60px",
        }}
      >
        {group.map((w, i) => {
          const globalIndex = groupStart + i;
          const isActive = globalIndex === activeIndex;
          const pop = spring({
            frame: frame - w.startFrame,
            fps,
            config: { damping: 14, stiffness: 260, mass: 0.5 },
          });
          const scale = isActive ? interpolate(pop, [0, 1], [0.85, 1.08]) : 1;
          return (
            <span
              key={globalIndex}
              style={{
                fontFamily: bodyFont,
                fontWeight: 800,
                fontSize: 46,
                textTransform: "uppercase",
                color: isActive ? "#ffe154" : "#ffffff",
                opacity: isActive ? 1 : 0.75,
                transform: `scale(${scale})`,
                textShadow: "0 3px 0 rgba(0,0,0,0.9), 0 6px 18px rgba(0,0,0,0.6)",
                WebkitTextStroke: isActive ? "2px rgba(0,0,0,0.35)" : "1.5px rgba(0,0,0,0.4)",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
