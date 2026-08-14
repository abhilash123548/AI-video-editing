import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTIONS, s } from "../data/timeline";
import { sans, tricolor } from "../fonts";

const EMPHASIS_COLORS = [tricolor.saffron, tricolor.green];

// Clean cinematic subtitles — NOT the big karaoke-style captions used on the
// CSE DevLabs project. Fade + slight rise + gentle scale only. Selective
// saffron/green word emphasis, never the whole line.
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const active = CAPTIONS.find((c) => frame >= s(c.startSec) && frame < s(c.endSec));
  if (!active) return null;

  const local = frame - s(active.startSec);
  const progress = spring({ frame: local, fps, config: { damping: 18, stiffness: 140 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [14, 0]);
  const scale = interpolate(progress, [0, 1], [0.97, 1]);

  const segments = splitEmphasis(active.text, active.emphasis ?? []);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 190,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${y}px) scale(${scale})`,
          maxWidth: 860,
          padding: "0 90px",
          textAlign: "center",
          fontFamily: sans,
          fontWeight: 700,
          fontSize: 40,
          lineHeight: 1.3,
          color: "#ffffff",
          textShadow: "0 2px 14px rgba(0,0,0,0.75)",
        }}
      >
        {segments.map((seg, i) => (
          <span key={i} style={{ color: seg.color }}>
            {seg.text}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

function splitEmphasis(text: string, emphasis: string[]): { text: string; color: string }[] {
  if (emphasis.length === 0) return [{ text, color: "#ffffff" }];

  let remaining = text;
  const segments: { text: string; color: string }[] = [];
  let colorIdx = 0;

  while (remaining.length > 0) {
    let earliestIdx = -1;
    let matchedPhrase = "";
    for (const phrase of emphasis) {
      const idx = remaining.toLowerCase().indexOf(phrase.toLowerCase());
      if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
        earliestIdx = idx;
        matchedPhrase = remaining.slice(idx, idx + phrase.length);
      }
    }
    if (earliestIdx === -1) {
      segments.push({ text: remaining, color: "#ffffff" });
      break;
    }
    if (earliestIdx > 0) segments.push({ text: remaining.slice(0, earliestIdx), color: "#ffffff" });
    segments.push({ text: matchedPhrase, color: EMPHASIS_COLORS[colorIdx % EMPHASIS_COLORS.length] });
    colorIdx += 1;
    remaining = remaining.slice(earliestIdx + matchedPhrase.length);
  }
  return segments;
}
