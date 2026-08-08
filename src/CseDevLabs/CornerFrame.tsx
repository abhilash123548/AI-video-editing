type Props = {
  color: string;
};

const SIZE = 30;
const MARGIN = 40;
const THICKNESS = 3;

const cornerStyle = (top?: number, bottom?: number, left?: number, right?: number) => ({
  position: "absolute" as const,
  top,
  bottom,
  left,
  right,
  width: SIZE,
  height: SIZE,
  borderTop: top !== undefined ? `${THICKNESS}px solid var(--corner-color)` : undefined,
  borderBottom: bottom !== undefined ? `${THICKNESS}px solid var(--corner-color)` : undefined,
  borderLeft: left !== undefined ? `${THICKNESS}px solid var(--corner-color)` : undefined,
  borderRight: right !== undefined ? `${THICKNESS}px solid var(--corner-color)` : undefined,
});

// Camera-viewfinder / trading-card style corner brackets, framing the whole video.
export const CornerFrame: React.FC<Props> = ({ color }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: MARGIN,
        opacity: 0.55,
        ["--corner-color" as string]: color,
      }}
    >
      <div style={cornerStyle(0, undefined, 0, undefined)} />
      <div style={cornerStyle(0, undefined, undefined, 0)} />
      <div style={cornerStyle(undefined, 0, 0, undefined)} />
      <div style={cornerStyle(undefined, 0, undefined, 0)} />
    </div>
  );
};
