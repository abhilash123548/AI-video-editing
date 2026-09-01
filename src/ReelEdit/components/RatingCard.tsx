import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "./Backdrop";
import { CountUpStat } from "./CountUpStat";
import { CheckIcon, FireIcon, XIcon } from "../icons";
import { bodyFont, headlineFont } from "../../GymTeaser/fonts";
import type { Tier } from "../timeline";

const TIER_STYLE: Record<
  Tier,
  { color: string; glow: string; tint: string; Icon: React.FC<{ size?: number; color?: string; progress?: number }> }
> = {
  low: { color: "#ff3b3b", glow: "rgba(255,59,59,0.45)", tint: "255,59,59", Icon: XIcon },
  mid: { color: "#ffb020", glow: "rgba(255,176,32,0.4)", tint: "255,176,32", Icon: CheckIcon },
  high: { color: "#22c55e", glow: "rgba(34,197,94,0.45)", tint: "34,197,94", Icon: FireIcon },
};

type Props = { tier: Tier; label: string; line: string; stat?: string };

export const RatingCard: React.FC<Props> = ({ tier, label, line, stat }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const style = TIER_STYLE[tier];

  const badgeProgress = spring({ frame, fps, config: { damping: 9, stiffness: 200, mass: 0.6 } });
  const iconDraw = interpolate(spring({ frame: frame - 3, fps, config: { damping: 14 } }), [0, 1], [0, 1]);
  const badgeScale = interpolate(badgeProgress, [0, 0.6, 1], [0.3, 1.15, 1]);

  // Tier-specific micro-motion once the badge has landed
  const settled = Math.max(0, frame - 16);
  const shake = tier === "low" ? Math.sin(settled / 2.2) * interpolate(settled, [0, 10], [4, 0], { extrapolateRight: "clamp" }) : 0;
  const pulse = tier === "high" ? 1 + Math.sin(settled / 9) * 0.035 : 1;

  const lineProgress = spring({ frame: frame - 8, fps, config: { damping: 16 } });

  return (
    <AbsoluteFill>
      <Backdrop tint={style.tint} />
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
            transform: `scale(${badgeScale * pulse}) translateX(${shake}px)`,
            display: "flex",
            alignItems: "center",
            gap: 18,
            backgroundColor: style.color,
            borderRadius: 100,
            padding: "18px 44px",
            boxShadow: `0 0 60px ${style.glow}`,
          }}
        >
          <style.Icon size={56} color="#0a0a0a" progress={iconDraw} />
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
          <div style={{ fontFamily: headlineFont }}>
            <CountUpStat text={stat} color={style.color} fontSize={76} />
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
