import Svg, { Circle, Path } from "react-native-svg";

import { useTheme } from "../../context/ThemeContext";

type ProfileIconProps = {
  size?: number;
  color?: string;
};

export function ProfileIcon({ size = 17, color }: ProfileIconProps) {
  const { colors } = useTheme();
  const iconColor = color ?? colors.text;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="3.5" stroke={iconColor} strokeWidth={1.7} />
      <Path
        d="M5.5 20c.7-3.4 3.1-5 6.5-5s5.8 1.6 6.5 5"
        stroke={iconColor}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
    </Svg>
  );
}
