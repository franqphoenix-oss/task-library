import Svg, { Path } from "react-native-svg";

import { useTheme } from "../../context/ThemeContext";

type NotificationIconProps = {
  size?: number;
  color?: string;
};

export function NotificationIcon({ size = 18, color }: NotificationIconProps) {
  const { colors } = useTheme();
  const iconColor = color ?? colors.text;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
        stroke={iconColor}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 21h4"
        stroke={iconColor}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}
