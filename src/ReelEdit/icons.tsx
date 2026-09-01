type IconProps = { size?: number; color?: string };

export const XIcon: React.FC<IconProps> = ({ size = 90, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <line x1="20" y1="20" x2="80" y2="80" stroke={color} strokeWidth="14" strokeLinecap="round" />
    <line x1="80" y1="20" x2="20" y2="80" stroke={color} strokeWidth="14" strokeLinecap="round" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 90, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <polyline
      points="18,52 40,76 84,24"
      fill="none"
      stroke={color}
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FireIcon: React.FC<IconProps> = ({ size = 90, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M50 8 C40 28 24 34 24 56 C24 76 36 90 50 90 C64 90 76 76 76 56 C76 44 68 40 66 30 C62 42 54 42 54 32 C54 22 58 16 50 8 Z"
      fill={color}
    />
    <path
      d="M50 40 C46 50 40 54 40 64 C40 74 44 80 50 80 C56 80 60 74 60 64 C60 58 56 56 55 50 C52 56 48 54 48 48 C48 44 50 44 50 40 Z"
      fill="rgba(0,0,0,0.35)"
    />
  </svg>
);

export const DumbbellIcon: React.FC<IconProps> = ({ size = 90, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x="8" y="40" width="14" height="20" rx="3" fill={color} />
    <rect x="78" y="40" width="14" height="20" rx="3" fill={color} />
    <rect x="26" y="46" width="10" height="8" fill={color} />
    <rect x="64" y="46" width="10" height="8" fill={color} />
    <rect x="34" y="47" width="32" height="6" fill={color} />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ size = 90, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M64 12 A38 38 0 1 0 64 88 A30 30 0 0 1 64 12 Z" fill={color} />
  </svg>
);

export const AppleIcon: React.FC<IconProps> = ({ size = 90, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M50 30 C34 30 22 44 22 62 C22 78 32 90 44 90 C48 90 48 87 50 87 C52 87 52 90 56 90 C68 90 78 76 78 60 C78 46 68 36 56 38 C54 38 52 32 50 30 Z"
      fill={color}
    />
    <path d="M50 30 C50 20 58 14 66 14 C66 24 58 30 50 30 Z" fill={color} />
  </svg>
);

export const WaterIcon: React.FC<IconProps> = ({ size = 90, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 10 C50 10 22 46 22 66 C22 82 34 92 50 92 C66 92 78 82 78 66 C78 46 50 10 50 10 Z" fill={color} />
  </svg>
);

export const RunIcon: React.FC<IconProps> = ({ size = 90, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="62" cy="18" r="10" fill={color} />
    <path
      d="M56 32 L44 50 L58 58 L52 84 M44 50 L24 44 M58 58 L76 66 L84 84 M52 60 L34 76"
      fill="none"
      stroke={color}
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BookmarkIcon: React.FC<IconProps> = ({ size = 90, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M26 10 H74 V92 L50 72 L26 92 Z" fill={color} />
  </svg>
);
