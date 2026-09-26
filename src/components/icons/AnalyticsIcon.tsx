import Svg, { Path, Rect } from "react-native-svg";

import { colors } from "../../constants/colors";

type AnalyticsIconProps = {
  active?: boolean;
};

export function AnalyticsIcon({ active = false }: AnalyticsIconProps) {
  const color = active ? colors.accent : colors.textMuted;

  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 20.5h16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Rect x={6} y={12} width={3.5} height={7} rx={1} fill={color} />
      <Rect x={10.25} y={8} width={3.5} height={11} rx={1} fill={color} />
      <Rect x={14.5} y={4} width={3.5} height={15} rx={1} fill={color} />
    </Svg>
  );
}
