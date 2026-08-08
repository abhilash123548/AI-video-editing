import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { GraphicVariant } from "./beats";
import { ConceptGraphic } from "./ConceptGraphic";
import { bodyFont, palette } from "./fonts";

type Props = {
  word: string;
  duration: number;
  emphasis: boolean;
  graphic: GraphicVariant | null;
  seed: number;
};

// Renders a single word as its own full-screen typographic beat, with an
// optional abstract animated glyph above it for key concept words.
// Meant to be mounted inside a <Sequence> so `frame` is local to the word's lifespan.
export const WordCard: React.FC<Props> = ({ word, duration, emphasis, graphic, seed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const inFrames = Math.min(8, Math.max(4, Math.floor(duration * 0.4)));
  const outFrames = Math.min(7, Math.max(3, Math.floor(duration * 0.3)));
  const outStart = Math.max(inFrames, duration - outFrames);

  const inProgress = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 260, mass: 0.6 },
    durationInFrames: inFrames,
  });

  const outProgress = interpolate(frame, [outStart, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = Math.min(inProgress, 1 - outProgress);
  const scale = interpolate(inProgress, [0, 0.7, 1], [0.55, 1.06, 1]) * (1 - outProgress * 0.12);
  const translateY = interpolate(inProgress, [0, 1], [34, 0]) + interpolate(outProgress, [0, 1], [0, -18]);
  const rotate = interpolate(inProgress, [0, 1], [emphasis ? -4 : 4, 0]);

  const cleanWord = word.replace(/[—–]$/, "");
  const isLong = cleanWord.length > 11;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      {graphic && (
        <ConceptGraphic variant={graphic} frame={frame} duration={duration} seed={seed} />
      )}
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
          padding: emphasis ? "28px 56px" : "0",
          borderRadius: 28,
          background: emphasis
            ? `linear-gradient(135deg, ${palette.blue} 0%, ${palette.violet} 100%)`
            : "transparent",
          boxShadow: emphasis ? "0 24px 60px -20px rgba(37,99,235,0.45)" : "none",
        }}
      >
        <span
          style={{
            fontFamily: bodyFont,
            fontWeight: emphasis ? 800 : 800,
            fontSize: graphic ? (isLong ? 68 : 96) : isLong ? 88 : 128,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: emphasis ? "#FFFFFF" : palette.ink,
            whiteSpace: "nowrap",
          }}
        >
          {cleanWord}
        </span>
      </div>
    </div>
  );
};
