import { Composition } from "remotion";
import { GymTeaser, GYM_TEASER_DURATION } from "./GymTeaser/GymTeaser";
import { ReelEdit } from "./ReelEdit/ReelEdit";
import { TOTAL_FRAMES as REEL_TOTAL_FRAMES } from "./ReelEdit/timeline";

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="DeadliftGymTeaser"
        component={GymTeaser}
        durationInFrames={GYM_TEASER_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DeadliftBadGoodExcellentReel"
        component={ReelEdit}
        durationInFrames={REEL_TOTAL_FRAMES}
        fps={25}
        width={1080}
        height={1920}
      />
    </>
  );
};
