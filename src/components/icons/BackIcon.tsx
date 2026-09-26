import Svg, { Path } from "react-native-svg";

import { colors } from "../../constants/colors";

export function BackIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5m0 0 7-7m-7 7 7 7"
        stroke={colors.text}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
