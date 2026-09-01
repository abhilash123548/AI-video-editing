import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "./Backdrop";
import { CheckIcon, FireIcon, XIcon } from "../icons";
import { bodyFont, headlineFont } from "../../GymTeaser/fonts";
import type { Tier } from "../timeline";

const TIER_STYLE: Record<Tier, { color: string; glow: string; Icon: React.FC<{ size?: number; color?: string }> }> = {
  low: { color: "#ff3b3b", glow: "rgba(255,59,59,0.45)", Icon: XIcon },
  mid: { color: "#ffb020", glow: "rgba(255,176,32,0.4)", Icon: CheckIcon },
  high: { color: "#22c55e", glow: "rgba(34,197,94,0.45)", Icon: FireIcon },
};

type Props = { tier: Tier; label: string; line: string; stat?: string };

export const RatingCard: React.FC<Props> = ({ tier, label, line, stat }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const style = TIER_STYLE[tier];

  const badgeProgress = spring({ frame, fps, config: { damping: 9, stiffness: 200, mass: 0.6 } });
  const badgeScale = interpolate(badgeProgress, [0, 0.6, 1], [0.3, 1.15, 1]);
  const lineProgress = spring({ frame: frame - 8, fps, config: { damping: 16 } });
  const statProgress = spring({ frame: frame - 14, fps, config: { damping: 10, stiffness: 220 } });

  return (
    <AbsoluteFill>
      <Backdrop />
      <AbsoluteFill
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 34,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            opacity: badgeProgress,
            transform: `scale(${badgeScale})`,
            display: "flex",
            alignItems: "center",
            gap: 18,
            backgroundColor: style.color,
            borderRadius: 100,
            padding: "18px 44px",
            boxShadow: `0 0 60px ${style.glow}`,
          }}
        >
          <style.Icon size={56} color="#0a0a0a" />
          <span
            style={{
              fontFamily: headlineFont,
              fontSize: 60,
              color: "#0a0a0a",
              letterSpacing: "0.02em",
            }}
          >
            {label}
          </span>
        </div>

        <div
          style={{
            opacity: lineProgress,
            transform: `translateY(${interpolate(lineProgress, [0, 1], [24, 0])}px)`,
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 42,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.3,
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        >
          {line}
        </div>

        {stat ? (
          <div
            style={{
              opacity: statProgress,
              transform: `scale(${interpolate(statProgress, [0, 1], [0.5, 1])})`,
              fontFamily: headlineFont,
              fontSize: 76,
              color: style.color,
              letterSpacing: "0.03em",
              textShadow: `0 0 30px ${style.glow}`,
            }}
          >
            {stat}
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
