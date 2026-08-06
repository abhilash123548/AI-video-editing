import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { headlineFont } from "../fonts";

export const IntroLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const glow = interpolate(frame, [0, 40, 100], [0, 1, 0.6], {
    extrapolateRight: "clamp",
  });
  const textOpacity = spring({
    frame: frame - 25,
    fps,
    config: { damping: 20 },
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#0a0a0a", justifyContent: "center", alignItems: "center" }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at center, rgba(200,20,20,${
            0.55 * glow
          }) 0%, rgba(10,10,10,0) 60%)`,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <Img
          src={staticFile("brand/logo.jpg")}
          style={{
            width: 340,
            transform: `scale(${logoScale})`,
            borderRadius: 24,
          }}
        />
        <div
          style={{
            opacity: textOpacity,
            fontFamily: headlineFont,
            color: "#ffffff",
            fontSize: 40,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          Fitness Studio
        </div>
      </div>
    </AbsoluteFill>
  );
};
