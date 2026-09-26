import Svg, { Path } from "react-native-svg";

import { colors } from "../../constants/colors";

type HomeIconProps = {
  active?: boolean;
};

export function HomeIcon({ active = false }: HomeIconProps) {
  const color = active ? colors.accent : colors.textMuted;

  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.5 10.5 12 3.75l8.5 6.75M5.5 9.5v10h13v-10M9.5 19.5v-6h5v6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
