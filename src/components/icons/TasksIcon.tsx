import Svg, { Path, Rect } from "react-native-svg";

import { colors } from "../../constants/colors";

type TasksIconProps = {
  active?: boolean;
};

export function TasksIcon({ active = false }: TasksIconProps) {
  const color = active ? colors.accent : colors.textMuted;

  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Rect
        x={5}
        y={3.5}
        width={14}
        height={17}
        rx={2}
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="m8 9 1.5 1.5L12 8m2 1h3m-9 6 1.5 1.5L12 14m2 1h3"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
