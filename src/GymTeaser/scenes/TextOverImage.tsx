import { AbsoluteFill } from "remotion";
import { KenBurnsImage } from "../KenBurnsImage";
import { KineticLine } from "../KineticLine";
import { headlineFont } from "../fonts";

type Line = { text: string; delay: number; fontSize?: number; color?: string };

type Props = {
  image: string;
  durationInFrames: number;
  direction?: "in" | "out";
  focalPosition?: string;
  lines: Line[];
  verticalAlign?: "center" | "end";
};

export const TextOverImage: React.FC<Props> = ({
  image,
  durationInFrames,
  direction = "in",
  focalPosition,
  lines,
  verticalAlign = "center",
}) => {
  return (
    <AbsoluteFill>
      <KenBurnsImage
        src={image}
        durationInFrames={durationInFrames}
        direction={direction}
        focalPosition={focalPosition}
      />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: verticalAlign === "center" ? "center" : "flex-end",
          alignItems: "center",
          padding: "0 90px",
          paddingBottom: verticalAlign === "end" ? 170 : 0,
          gap: 16,
          fontFamily: headlineFont,
        }}
      >
        {lines.map((line, i) => (
          <KineticLine
            key={i}
            text={line.text}
            delay={line.delay}
            fontSize={line.fontSize ?? 92}
            color={line.color ?? "#ffffff"}
          />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
