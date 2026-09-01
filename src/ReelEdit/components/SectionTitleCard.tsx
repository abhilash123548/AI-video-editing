import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "./Backdrop";
import { AppleIcon, DumbbellIcon, MoonIcon, RunIcon } from "../icons";
import { headlineFont } from "../../GymTeaser/fonts";

const ICONS: Record<string, React.FC<{ size?: number; color?: string }>> = {
  "Gym Frequency": DumbbellIcon,
  Sleep: MoonIcon,
  "Fat Loss Diet": AppleIcon,
  "Weight Gain Diet": AppleIcon,
  "Cardio & Weights": RunIcon,
};

export const SectionTitleCard: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const Icon = ICONS[title] ?? DumbbellIcon;

  const progress = spring({ frame, fps, config: { damping: 10, stiffness: 190, mass: 0.6 } });
  const scale = interpolate(progress, [0, 0.65, 1], [0.5, 1.1, 1]);
  const lineWidth = interpolate(
    spring({ frame: frame - 10, fps, config: { damping: 18 } }),
    [0, 1],
    [0, 260],
  );

  return (
    <AbsoluteFill>
      <Backdrop opacity={0.8} />
      <AbsoluteFill
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 26,
        }}
      >
        <div style={{ opacity: progress, transform: `scale(${scale})` }}>
          <Icon size={110} color="#ff3b3b" />
        </div>
        <div
          style={{
            opacity: progress,
            transform: `scale(${scale})`,
            fontFamily: headlineFont,
            fontSize: 76,
            color: "#ffffff",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            padding: "0 60px",
          }}
        >
          {title}
        </div>
        <div style={{ width: lineWidth, height: 5, backgroundColor: "#ff3b3b", borderRadius: 3 }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
