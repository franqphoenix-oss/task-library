import Svg, { Circle, Path, Rect } from "react-native-svg";

type SettingsRowIconProps = {
  type:
    | "appearance"
    | "notifications"
    | "calendar"
    | "ai"
    | "subscription"
    | "account"
    | "privacy"
    | "help";
  size?: number;
  color?: string;
};

export function SettingsRowIcon({
  type,
  size = 18,
  color = "#94A3B8",
}: SettingsRowIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {type === "appearance" && (
        <>
          <Path
            d="M12 3v2M12 19v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M3 12h2M19 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            stroke={color}
            strokeWidth={1.7}
            strokeLinecap="round"
          />
          <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth={1.7} />
        </>
      )}

      {type === "notifications" && (
        <>
          <Path
            d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
            stroke={color}
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M10 21h4"
            stroke={color}
            strokeWidth={1.7}
            strokeLinecap="round"
          />
        </>
      )}

      {type === "calendar" && (
        <>
          <Rect
            x="4"
            y="5"
            width="16"
            height="15"
            rx="2"
            stroke={color}
            strokeWidth={1.7}
          />
          <Path
            d="M8 3v4M16 3v4M4 9h16"
            stroke={color}
            strokeWidth={1.7}
            strokeLinecap="round"
          />
        </>
      )}

      {type === "ai" && (
        <>
          <Path
            d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <Path
            d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        </>
      )}

      {type === "subscription" && (
        <>
          <Rect
            x="3"
            y="6"
            width="18"
            height="13"
            rx="2"
            stroke={color}
            strokeWidth={1.7}
          />
          <Path
            d="M3 10h18M7 15h3"
            stroke={color}
            strokeWidth={1.7}
            strokeLinecap="round"
          />
        </>
      )}

      {type === "account" && (
        <>
          <Circle cx="12" cy="8" r="3.5" stroke={color} strokeWidth={1.7} />
          <Path
            d="M5.5 20c.7-3.4 3.1-5 6.5-5s5.8 1.6 6.5 5"
            stroke={color}
            strokeWidth={1.7}
            strokeLinecap="round"
          />
        </>
      )}

      {type === "privacy" && (
        <Path
          d="M12 3 19 6v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3Z"
          stroke={color}
          strokeWidth={1.7}
          strokeLinejoin="round"
        />
      )}

      {type === "help" && (
        <>
          <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.7} />
          <Path
            d="M9.5 9a2.5 2.5 0 1 1 4.1 1.9c-.9.7-1.6 1.1-1.6 2.6"
            stroke={color}
            strokeWidth={1.7}
            strokeLinecap="round"
          />
          <Circle cx="12" cy="16.5" r=".8" fill={color} />
        </>
      )}
    </Svg>
  );
}
