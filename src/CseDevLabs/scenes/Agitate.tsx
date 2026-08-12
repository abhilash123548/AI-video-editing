import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KineticWords } from "../components/KineticWords";
import { StampImpact } from "../components/StampImpact";
import { bodyFont, brand, headlineFont } from "../fonts";

// 0:17-0:26 — AGITATE. Chaotic flashing, then a slow tense hold, then a
// countdown that slams into the "DEADLINE" stamp.
export const Agitate: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0:17-0:19 */}
      <Sequence  durationInFrames={60}>
        <ThumbnailChaos />
      </Sequence>

      {/* 0:19-0:23 */}
      <Sequence from={60} durationInFrames={120}>
        <LateNightClock />
      </Sequence>

      {/* 0:23-0:26 */}
      <Sequence from={180} durationInFrames={90}>
        <DeadlineCountdown />
      </Sequence>
    </AbsoluteFill>
  );
};

const THUMBS = ["#3fa9ff", "#7b8bab", "#ff3b3b", "#5c6fa8", "#3fa9ff", "#7b8bab"];

const ThumbnailChaos: React.FC = () => {
  const frame = useCurrentFrame();
  const errorAt = 34;
  const showError = frame >= errorAt;

  if (showError) {
    const shake = Math.sin(frame * 3) * 3;
    return (
      <AbsoluteFill style={{ backgroundColor: "#2a0505", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            transform: `translateX(${shake}px)`,
            fontFamily: bodyFont,
            fontWeight: 800,
            color: "#ff3b3b",
            fontSize: 30,
            textAlign: "center",
            padding: "0 60px",
            lineHeight: 1.5,
          }}
        >
          Traceback (most recent call last):
          <br />
          RuntimeError: build failed
        </div>
        <KineticWords
          lines={[{ text: "ERRORS YOU CAN'T FIX.", delay: 0, fontSize: 48, color: "#ffffff" }]}
        />
      </AbsoluteFill>
    );
  }

  const idx = Math.floor(frame / 5) % THUMBS.length;
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <div
        style={{
          width: 640,
          height: 360,
          borderRadius: 18,
          background: THUMBS[idx],
          opacity: 0.55,
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <KineticWords lines={[{ text: "RANDOM TUTORIALS.", delay: 0, fontSize: 52, color: "#ffffff" }]} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const LateNightClock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const flicker = 0.9 + Math.sin(frame / 6) * 0.05;
  const progress = spring({ frame, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        filter: `brightness(${flicker})`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div
          style={{
            fontFamily: headlineFont,
            fontSize: 96,
            color: brand.cool.text,
            opacity: progress,
            letterSpacing: "0.05em",
          }}
        >
          2:00 AM
        </div>
        <KineticWords
          lines={[
            { text: "STILL STUCK", delay: 14, fontSize: 46, color: "#ffffff" },
            { text: "ON STEP ONE.", delay: 24, fontSize: 46, color: brand.cool.danger },
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};

const DAYS = ["MON", "TUE", "WED", "THU", "FRI"];

const DeadlineCountdown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stampAt = 55;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {frame < stampAt ? (
        <div style={{ display: "flex", gap: 12 }}>
          {DAYS.map((d, i) => {
            const crossedAt = i * 9;
            const crossed = frame >= crossedAt;
            const p = spring({ frame: frame - crossedAt, fps, config: { damping: 12, stiffness: 300 } });
            return (
              <div
                key={d}
                style={{
                  position: "relative",
                  width: 76,
                  height: 90,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.08)",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: bodyFont,
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#ffffff",
                }}
              >
                {d}
                {crossed ? (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: brand.cool.danger,
                      fontSize: 40,
                      transform: `scale(${interpolate(p, [0, 1], [0.3, 1])})`,
                    }}
                  >
                    ✕
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <StampImpact text={"DEADLINE"} delay={stampAt} fontSize={90} color={brand.cool.danger} />
      )}
    </AbsoluteFill>
  );
};
