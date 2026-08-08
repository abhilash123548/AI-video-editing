import { interpolate, useCurrentFrame } from "remotion";
import { headlineFont, monoFont, palette } from "./fonts";

// Persistent small brand mark, top-left. Fades in over the first half second.
export const BrandBar: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(frame, [0, 15], [-10, 0], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        top: 56,
        left: 56,
        display: "flex",
        alignItems: "center",
        gap: 12,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: `linear-gradient(135deg, ${palette.blue} 0%, ${palette.violet} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: monoFont,
          fontWeight: 500,
          fontSize: 18,
          color: "#FFFFFF",
        }}
      >
        {"</>"}
      </div>
      <span
        style={{
          fontFamily: headlineFont,
          fontWeight: 700,
          fontSize: 26,
          color: palette.ink,
          letterSpacing: "-0.01em",
        }}
      >
        CSE DevLabs
      </span>
    </div>
  );
};
