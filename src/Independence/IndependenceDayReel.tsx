import { AbsoluteFill, Sequence } from "remotion";
import { SCENES, TOTAL_DURATION, s } from "./data/timeline";
import { ColorGrade } from "./components/ColorGrade";
import { FilmGrain } from "./components/FilmGrain";
import { Vignette } from "./components/Vignette";
import { Captions } from "./components/Captions";
import { HistoricalOpen } from "./components/HistoricalOpen";
import { JourneyMontage } from "./components/JourneyMontage";
import { ModernIndiaFast } from "./components/ModernIndiaFast";
import { PauseBeat } from "./components/PauseBeat";
import { MatchCutTransition } from "./components/MatchCutTransition";
import { GymTraining } from "./components/GymTraining";
import { AvatarSlot } from "./components/AvatarSlot";
import { FinalCard } from "./components/FinalCard";

export const INDEPENDENCE_DURATION = TOTAL_DURATION;

// Deadlift Fitness Studio — 79th Independence Day reel. Assembled entirely
// from SCENES (data/timeline.ts) so timing can be adjusted in one place.
//
// STATUS (see AGENT NOTE in data/timeline.ts for detail):
// - No VO audio, no HeyGen avatar clip, and no music track exist yet — this
//   renders silent. AvatarSlot is a lit, empty stage ready for the real clip.
// - Historical/journey/modern-India sections (0:00-0:15.5) are graphics-only:
//   no real archival or B-roll footage exists or could be fetched (no web
//   access in this environment), so rather than fabricate footage that
//   would look fake, this uses a restrained motion-graphics treatment.
// - Gym section (0:19.1 onward) uses the real Deadlift Fitness Studio stills
//   already in this repo — the only authentic asset available.
export const IndependenceDayReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <ColorGrade />

      {SCENES.map((scene) => {
        const from = s(scene.startSec);
        const durationInFrames = s(scene.endSec) - from;
        return (
          <Sequence key={scene.id} from={from} durationInFrames={durationInFrames}>
            <SceneSwitch id={scene.component} durationInFrames={durationInFrames} />
          </Sequence>
        );
      })}

      <FilmGrain />
      <Vignette />
      <Captions />
    </AbsoluteFill>
  );
};

const SceneSwitch: React.FC<{ id: string; durationInFrames: number }> = ({ id, durationInFrames }) => {
  switch (id) {
    case "HistoricalOpen":
      return <HistoricalOpen />;
    case "JourneyMontage":
      return <JourneyMontage />;
    case "ModernIndiaFast":
      return <ModernIndiaFast />;
    case "PauseBeat":
      return <PauseBeat />;
    case "MatchCutTransition":
      return <MatchCutTransition durationInFrames={durationInFrames} />;
    case "GymTraining":
      return <GymTraining />;
    case "AvatarSlot":
      return <AvatarSlot />;
    case "FinalCard":
      return <FinalCard durationInFrames={durationInFrames} />;
    default:
      return null;
  }
};
