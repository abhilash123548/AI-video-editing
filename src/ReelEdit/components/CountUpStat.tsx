import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props = { text: string; color: string; fontSize?: number };

// Counts up any leading integers found in the stat text (e.g. "3× / WEEK", "7–8 HOURS", "4 HOURS")
export const CountUpStat: React.FC<Props> = ({ text, color, fontSize = 76 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const countFrames = Math.round(fps * 0.5);
  const t = interpolate(frame, [0, countFrames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eased = 1 - Math.pow(1 - t, 3);

  const rendered = text.replace(/\d+/g, (match) => {
    const target = parseInt(match, 10);
    const current = Math.round(target * eased);
    return String(current);
  });

  return (
    <div
      style={{
        fontFamily: "inherit",
        fontSize,
        color,
        letterSpacing: "0.03em",
        textShadow: `0 0 30px ${color}66`,
      }}
    >
      {rendered}
    </div>
  );
};
