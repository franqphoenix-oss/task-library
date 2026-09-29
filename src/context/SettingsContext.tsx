import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import {
  cancelAllTaskNotifications,
  requestNotificationPermission,
} from "@/services/notifications";

export type ThemeMode = "light" | "dark";

type SettingsState = {
  theme: ThemeMode;
  notificationsEnabled: boolean;
};

type SettingsContextValue = SettingsState & {
  isLoading: boolean;
  setTheme: (theme: ThemeMode) => void;
  setNotificationsEnabled: (enabled: boolean) => Promise<void>;
};

const SETTINGS_STORAGE_KEY = "@task-library/settings";

const defaultSettings: SettingsState = {
  theme: "dark",
  notificationsEnabled: true,
};

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined,
);

export function SettingsProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);

        if (!stored) {
          return;
        }

        const parsed = JSON.parse(stored) as Partial<SettingsState>;

        if (!mounted) {
          return;
        }

        setSettings({
          theme:
            parsed.theme === "light" || parsed.theme === "dark"
              ? parsed.theme
              : defaultSettings.theme,
          notificationsEnabled:
            typeof parsed.notificationsEnabled === "boolean"
              ? parsed.notificationsEnabled
              : defaultSettings.notificationsEnabled,
        });
      } catch {
        // Fall back to default settings if stored data is invalid.
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    void AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [isLoading, settings]);

  const setTheme = useCallback((theme: ThemeMode) => {
    setSettings((current) => ({
      ...current,
      theme,
    }));
  }, []);

  const setNotificationsEnabled = useCallback(async (enabled: boolean) => {
    if (!enabled) {
      await cancelAllTaskNotifications();

      setSettings((current) => ({
        ...current,
        notificationsEnabled: false,
      }));

      return;
    }

    const granted = await requestNotificationPermission();

    setSettings((current) => ({
      ...current,
      notificationsEnabled: granted,
    }));
  }, []);

  const value = useMemo(
    () => ({
      ...settings,
      isLoading,
      setTheme,
      setNotificationsEnabled,
    }),
    [settings, isLoading, setTheme, setNotificationsEnabled],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  return context;
}
