import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Grade } from "./components/Grade";
import { Captions } from "./components/Captions";
import { PersistentPhoneStrip } from "./components/PersistentPhoneStrip";
import { Hook } from "./scenes/Hook";
import { Problem } from "./scenes/Problem";
import { Agitate } from "./scenes/Agitate";
import { Solution } from "./scenes/Solution";
import { Value } from "./scenes/Value";
import { Reassurance } from "./scenes/Reassurance";
import { Urgency } from "./scenes/Urgency";
import { Close } from "./scenes/Close";
import { sectionFrames } from "./data/timeline";
import { TOTAL_DURATION } from "./data/transcript";

export const CSE_DEVLABS_DURATION = TOTAL_DURATION;

// CSE DevLabs — full 1:00.6 vertical explainer, assembled per the edit
// script's section timings. Motion-graphics-only build: no stock b-roll or
// a real logo file exists in the repo yet, so visuals lean on typography,
// color, and shape (see LogoLockup.tsx for the placeholder wordmark).
export const CseDevLabsAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Audio src={staticFile("audio/cse-devlabs-vo.mp3")} />

      <Grade />

      <Sequence {...sectionFrames("hook")}>
        <Hook />
      </Sequence>
      <Sequence {...sectionFrames("problem")}>
        <Problem />
      </Sequence>
      <Sequence {...sectionFrames("agitate")}>
        <Agitate />
      </Sequence>
      <Sequence {...sectionFrames("solution")}>
        <Solution />
      </Sequence>
      <Sequence {...sectionFrames("value")}>
        <Value />
      </Sequence>
      <Sequence {...sectionFrames("reassurance")}>
        <Reassurance />
      </Sequence>
      <Sequence {...sectionFrames("urgency")}>
        <Urgency />
      </Sequence>
      <Sequence {...sectionFrames("close")}>
        <Close />
      </Sequence>

      <PersistentPhoneStrip />
      <Captions />
    </AbsoluteFill>
  );
};
