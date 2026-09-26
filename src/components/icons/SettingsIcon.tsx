import Svg, { Circle, Path } from "react-native-svg";

import { colors } from "../../constants/colors";

type SettingsIconProps = {
  active?: boolean;
};

export function SettingsIcon({ active = false }: SettingsIconProps) {
  const color = active ? colors.accent : colors.textMuted;

  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3.5v2m0 13v2m8.5-8.5h-2m-13 0h-2m14.01-6.01-1.42 1.42M7.91 16.09l-1.42 1.42m11.02 0-1.42-1.42M7.91 7.91 6.49 6.49"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12} r={5} stroke={color} strokeWidth={2} />
    </Svg>
  );
}
