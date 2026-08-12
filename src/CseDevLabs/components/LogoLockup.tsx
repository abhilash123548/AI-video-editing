import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { bodyFont, brand, headlineFont } from "../fonts";

type Props = {
  tagline?: string;
  taglineLines?: string[];
  bouncy?: boolean;
};

// No real logo asset exists yet for CSE DevLabs, so this is a type-based
// lockup (bracket mark + wordmark) standing in for the brand logo. Swap for
// the real logo file once available (see public/brand/).
export const LogoLockup: React.FC<Props> = ({ tagline, taglineLines, bouncy = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const markProgress = spring({
    frame,
    fps,
    config: bouncy ? { damping: 10, stiffness: 160 } : { damping: 20, stiffness: 120 },
  });
  const scale = bouncy ? interpolate(markProgress, [0, 0.7, 1], [0.5, 1.08, 1]) : interpolate(markProgress, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div
          style={{
            opacity: markProgress,
            transform: `scale(${scale})`,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 20,
              background: `linear-gradient(135deg, ${brand.warm.accent2}, ${brand.warm.accent})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: headlineFont,
              fontSize: 44,
              color: "#0c0b1a",
            }}
          >
            {"</>"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <div
              style={{
                fontFamily: headlineFont,
                fontSize: 66,
                color: "#ffffff",
                letterSpacing: "0.02em",
              }}
            >
              CSE DEVLABS
            </div>
          </div>
        </div>
        {tagline ? (
          <div
            style={{
              opacity: spring({ frame: frame - 18, fps, config: { damping: 18 } }),
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize: 28,
              color: brand.warm.dim,
              letterSpacing: "0.06em",
              textAlign: "center",
            }}
          >
            {tagline}
          </div>
        ) : null}
        {taglineLines ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginTop: 6 }}>
            {taglineLines.map((line, i) => {
              const p = spring({ frame: frame - 16 - i * 12, fps, config: { damping: 18 } });
              return (
                <div
                  key={i}
                  style={{
                    opacity: p,
                    transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px)`,
                    fontFamily: bodyFont,
                    fontWeight: 700,
                    fontSize: 34,
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  {line}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
