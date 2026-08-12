import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTION_WORDS } from "../data/transcript";
import { bodyFont } from "../fonts";

const WINDOW = 6; // words shown on screen at once, current word centered/highlighted

// Bold word-by-word karaoke captions, burned in for the full runtime. The
// active word gets a solid highlight chip behind it (not just a color
// change) so it reads as animated captions rather than static subtitles.
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
        paddingBottom: 200,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px 10px",
          maxWidth: 900,
          padding: "0 60px",
        }}
      >
        {group.map((w, i) => {
          const globalIndex = groupStart + i;
          const isActive = globalIndex === activeIndex;
          const local = frame - w.startFrame;
          const pop = spring({
            frame: local,
            fps,
            config: { damping: 11, stiffness: 320, mass: 0.5 },
          });
          const scale = isActive ? interpolate(pop, [0, 0.6, 1], [0.6, 1.18, 1]) : 1;
          const chipScale = isActive ? interpolate(pop, [0, 1], [0.5, 1]) : 0;
          const rotate = isActive ? interpolate(pop, [0, 1], [-4, 0]) : 0;

          return (
            <span
              key={globalIndex}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isActive ? (
                <span
                  style={{
                    position: "absolute",
                    inset: "-6px -12px",
                    background: "#ffe154",
                    borderRadius: 10,
                    transform: `scale(${chipScale}) rotate(${rotate}deg)`,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
                  }}
                />
              ) : null}
              <span
                style={{
                  position: "relative",
                  fontFamily: bodyFont,
                  fontWeight: 800,
                  fontSize: 46,
                  textTransform: "uppercase",
                  color: isActive ? "#0c0b1a" : "#ffffff",
                  opacity: isActive ? 1 : 0.7,
                  transform: `scale(${scale}) rotate(${isActive ? rotate : 0}deg)`,
                  textShadow: isActive ? "none" : "0 3px 0 rgba(0,0,0,0.9), 0 6px 18px rgba(0,0,0,0.6)",
                  WebkitTextStroke: isActive ? "none" : "1.5px rgba(0,0,0,0.4)",
                }}
              >
                {w.word}
              </span>
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
