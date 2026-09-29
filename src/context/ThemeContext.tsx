import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";

import { getColors, type AppColors } from "@/constants/colors";
import { useSettings } from "@/context/SettingsContext";

type ThemeContextValue = {
  colors: AppColors;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const { theme } = useSettings();

  const value = useMemo(
    () => ({
      colors: getColors(theme),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
