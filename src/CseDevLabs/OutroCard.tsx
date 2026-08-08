import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { bodyFont, headlineFont, monoFont, palette } from "./fonts";

type Props = {
  durationInFrames: number;
};

const TAGS = ["AI/ML", "Blockchain", "Cybersecurity", "Big Data", "Mobile Apps"];

export const OutroCard: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 16, stiffness: 200 } });
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(entrance, [0, 1], [0.85, 1]);

  const tagOpacity = (i: number) =>
    interpolate(frame, [22 + i * 5, 32 + i * 5], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const ctaPulse = interpolate(
    frame % 40,
    [0, 20, 40],
    [1, 1.04, 1],
  );

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0.85],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: opacity * fadeOut,
        transform: `scale(${scale})`,
        gap: 28,
        padding: "0 80px",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 24,
          background: `linear-gradient(135deg, ${palette.blue} 0%, ${palette.violet} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: monoFont,
          fontWeight: 500,
          fontSize: 44,
          color: "#FFFFFF",
          boxShadow: "0 30px 60px -20px rgba(37,99,235,0.5)",
        }}
      >
        {"</>"}
      </div>

      <span
        style={{
          fontFamily: headlineFont,
          fontWeight: 700,
          fontSize: 96,
          color: palette.ink,
          letterSpacing: "-0.02em",
          textAlign: "center",
        }}
      >
        CSE DevLabs
      </span>

      <span
        style={{
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 34,
          color: palette.inkSoft,
          textAlign: "center",
        }}
      >
        Final-year projects. Industry-grade execution.
      </span>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          maxWidth: 820,
          marginTop: 8,
        }}
      >
        {TAGS.map((tag, i) => (
          <span
            key={tag}
            style={{
              opacity: tagOpacity(i),
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize: 24,
              color: palette.blue,
              background: palette.blueSoft,
              padding: "10px 22px",
              borderRadius: 999,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          transform: `scale(${ctaPulse})`,
          fontFamily: bodyFont,
          fontWeight: 700,
          fontSize: 32,
          color: "#FFFFFF",
          background: `linear-gradient(135deg, ${palette.blue} 0%, ${palette.violet} 100%)`,
          padding: "22px 48px",
          borderRadius: 999,
          boxShadow: "0 24px 50px -18px rgba(124,58,237,0.5)",
        }}
      >
        Fill the form · Contact us today
      </div>
    </div>
  );
};
