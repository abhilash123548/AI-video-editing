import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { bodyFont } from "../fonts";

type Side = { label: string; color: string; sub?: string };

type Props = {
  left: Side;
  right: Side;
  revealDelay?: number;
  revealDuration?: number;
};

// Reused for every "before vs after" beat: messy-vs-clean workspace,
// college-project vs production-grade, small-mentored-group vs faceless crowd.
// Left side is present from the start; the right side wipes/reveals in,
// selling the "upgrade" moment described in the script.
export const SplitScreen: React.FC<Props> = ({ left, right, revealDelay = 8, revealDuration = 18 }) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [revealDelay, revealDelay + revealDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shine = interpolate(
    frame,
    [revealDelay + revealDuration, revealDelay + revealDuration + 10, revealDelay + revealDuration + 24],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const panel = (side: Side, dim: boolean): React.ReactNode => (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        background: `linear-gradient(180deg, ${side.color}22 0%, transparent 60%)`,
        filter: dim ? "grayscale(0.6) brightness(0.7)" : "none",
      }}
    >
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 800,
          fontSize: 30,
          color: side.color,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        {side.label}
      </div>
      {side.sub ? (
        <div style={{ fontFamily: bodyFont, color: "#cfcfe0", fontSize: 20, textAlign: "center", padding: "0 20px" }}>
          {side.sub}
        </div>
      ) : null}
    </div>
  );

  return (
    <AbsoluteFill style={{ flexDirection: "row" }}>
      {panel(left, false)}
      <div
        style={{
          flex: 1,
          position: "relative",
          transform: `scale(${interpolate(reveal, [0, 1], [0.94, 1])})`,
          boxShadow: shine ? `inset 0 0 ${100 * shine}px ${right.color}88` : "none",
        }}
      >
        {panel(right, false)}
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 2,
          height: "70%",
          background: "rgba(255,255,255,0.25)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </AbsoluteFill>
  );
};
