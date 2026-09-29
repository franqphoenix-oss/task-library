export type ThemeMode = "light" | "dark";

export const darkColors = {
  background: "#050B14",
  surface: "#0B1422",
  surfaceElevated: "#101C2D",

  border: "#1B2A3D",
  notificationBorder: "#263852",

  text: "#F8FAFC",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",

  accent: "#6366F1",
  accentSecondary: "#8B5CF6",

  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",

  white: "#FFFFFF",
  black: "#000000",
} as const;

export const lightColors = {
  background: "#F6F7FB",
  surface: "#FFFFFF",
  surfaceElevated: "#EEF1F7",

  border: "#E2E8F0",
  notificationBorder: "#E2E8F0",

  text: "#000000",
  textSecondary: "#334155",
  textMuted: "#475569",

  accent: "#6366F1",
  accentSecondary: "#8B5CF6",

  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",

  white: "#FFFFFF",
  black: "#000000",
} as const;

export type AppColors = {
  [ColorName in keyof typeof darkColors]: string;
};

export function getColors(theme: ThemeMode): AppColors {
  return theme === "light" ? lightColors : darkColors;
}
