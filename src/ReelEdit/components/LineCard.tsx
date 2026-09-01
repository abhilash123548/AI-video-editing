import { AbsoluteFill } from "remotion";
import { Backdrop } from "./Backdrop";
import { KineticLine } from "../../GymTeaser/KineticLine";
import { headlineFont } from "../../GymTeaser/fonts";

export const LineCard: React.FC<{ text: string; fontSize?: number }> = ({ text, fontSize = 76 }) => {
  return (
    <AbsoluteFill>
      <Backdrop opacity={0.68} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 80px",
          fontFamily: headlineFont,
        }}
      >
        <KineticLine text={text} delay={4} fontSize={fontSize} color="#ffffff" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
