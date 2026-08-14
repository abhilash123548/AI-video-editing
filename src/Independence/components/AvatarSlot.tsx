import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { OnScreenText } from "./OnScreenText";
import { palette } from "../fonts";

// 0:25-0:28 — "the message" beat. No HeyGen avatar clip exists yet (avatar
// id c1673ddc227d440a95d40f7ea63b0fd7, group "Indipendence day" — read-only
// lookup only; generating the actual clip needs the account connection and
// wasn't done here). This builds the STAGE the avatar will stand in: dark
// gym-matched lighting (soft key + red rim), so the real clip drops in
// without a lighting mismatch. Swap the silhouette div below for an
// <OffthreadVideo src={staticFile("video/independence-avatar.mp4")}/>
// cropped to a medium close-up once the clip is generated.
export const AvatarSlot: React.FC = () => {
  const frame = useCurrentFrame();
  const keyLight = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const textP = interpolate(frame, [45, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: palette.gym.bg0, justifyContent: "center", alignItems: "center" }}>
      {/* soft key light */}
      <AbsoluteFill
        style={{
          opacity: keyLight,
          background: `radial-gradient(circle at 50% 38%, rgba(255,255,255,0.09) 0%, transparent 45%)`,
        }}
      />
      {/* subtle red rim light, camera-left */}
      <AbsoluteFill
        style={{
          opacity: keyLight * 0.7,
          background: `linear-gradient(100deg, ${palette.gym.red}22 0%, transparent 30%)`,
        }}
      />
      {/* presence silhouette — a soft blurred stand-in, not a fake face */}
      <div
        style={{
          opacity: keyLight * 0.5,
          width: 260,
          height: 380,
          borderRadius: "50% 50% 40% 40%",
          background: "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.10), transparent 70%)",
          filter: "blur(6px)",
        }}
      />
      {/* upper-third placement — the caption layer owns the bottom zone */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 240 }}>
        <div style={{ opacity: textP }}>
          <OnScreenText text={"STRONGER YOU.\nSTRONGER INDIA."} fontSize={48} delay={0} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
