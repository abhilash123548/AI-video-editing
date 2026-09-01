import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, interpolate, useCurrentFrame } from "remotion";
import { beats, TOTAL_FRAMES } from "./timeline";
import { sfxCues } from "./sfxCues";
import { AvatarCaption } from "./components/AvatarCaption";
import { SectionTitleCard } from "./components/SectionTitleCard";
import { RatingCard } from "./components/RatingCard";
import { LineCard } from "./components/LineCard";
import { CTACard } from "./components/CTACard";
import { EndCard } from "./components/EndCard";

const SFX_CUE_DURATION = 40;

const BaseVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, TOTAL_FRAMES], [1, 1.06], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <OffthreadVideo
        src={staticFile("videos/reel-source.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` }}
      />
    </AbsoluteFill>
  );
};

export const ReelEdit: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <BaseVideo />

      {beats.map((beat, i) => {
        const duration = beat.to - beat.from;
        return (
          <Sequence key={i} from={beat.from} durationInFrames={duration}>
            {beat.kind === "caption" && <AvatarCaption lines={beat.lines} />}
            {beat.kind === "section" && <SectionTitleCard title={beat.title} />}
            {beat.kind === "rating" && (
              <RatingCard tier={beat.tier} label={beat.label} line={beat.line} stat={beat.stat} />
            )}
            {beat.kind === "line" && <LineCard text={beat.text} fontSize={beat.fontSize} />}
            {beat.kind === "cta" && <CTACard />}
            {beat.kind === "end" && <EndCard />}
          </Sequence>
        );
      })}

      {sfxCues.map((cue, i) => (
        <Sequence key={`sfx-${i}`} from={cue.frame} durationInFrames={cue.durationFrames ?? SFX_CUE_DURATION}>
          <Audio src={staticFile(cue.src)} volume={cue.volume ?? 1} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export { TOTAL_FRAMES };
