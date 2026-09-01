import { AbsoluteFill } from "remotion";
import { KineticLine } from "../../GymTeaser/KineticLine";
import { headlineFont } from "../../GymTeaser/fonts";

type Line = { text: string; delay: number; fontSize?: number; color?: string };

export const AvatarCaption: React.FC<{ lines: Line[] }> = ({ lines }) => {
  return (
    <AbsoluteFill
      style={{
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 70px",
        paddingBottom: 220,
        gap: 12,
        fontFamily: headlineFont,
      }}
    >
      <AbsoluteFill
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 45%)",
        }}
      />
      {lines.map((line, i) => (
        <KineticLine
          key={i}
          text={line.text}
          delay={line.delay}
          fontSize={line.fontSize ?? 60}
          color={line.color ?? "#ffffff"}
        />
      ))}
    </AbsoluteFill>
  );
};
