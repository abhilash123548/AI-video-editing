import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { KenBurnsImage } from "../../GymTeaser/KenBurnsImage";
import { OnScreenText } from "./OnScreenText";
import { ASSETS } from "../data/timeline";

// 0:21-0:25 — real Deadlift Fitness Studio footage only (the 3 strongest
// stills per FOOTAGE SELECTION RULE), cut hard on each phrase:
// "One workout." -> wide establishing / "One rep." -> tighter, mid-lift /
// "One more day of hard work." -> the strongest shot, held longest.
const SHOTS = [
  { asset: "gym-1", frames: 26, text: "ONE WORKOUT.", focal: "center 40%" },
  { asset: "gym-2", frames: 24, text: "ONE REP.", focal: "center 30%" },
  { asset: "gym-5", frames: 55, text: "ONE MORE DAY.", focal: "center 35%" },
] as const;

export const GymTraining: React.FC = () => {
  let cursor = 0;
  const ranges = SHOTS.map((shot) => {
    const from = cursor;
    cursor += shot.frames;
    return { ...shot, from };
  });

  return (
    <AbsoluteFill>
      {ranges.map((shot, i) => (
        <Sequence key={i} from={shot.from} durationInFrames={shot.frames}>
          <AbsoluteFill>
            <KenBurnsImage
              src={staticFile(ASSETS[shot.asset].file)}
              durationInFrames={shot.frames}
              direction={i % 2 === 0 ? "in" : "out"}
              focalPosition={shot.focal}
            />
            <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 210 }}>
              <OnScreenText text={shot.text} fontSize={44} delay={4} />
            </AbsoluteFill>
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
