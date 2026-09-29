import { router } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SettingsRowIcon } from "../components/icons/SettingsRowIcon";
import { BottomNav } from "../components/navigation/BottomNav";

import { useSettings } from "@/context/SettingsContext";
import { useTheme } from "@/context/ThemeContext";
import { createSettingsStyles } from "@/features/settings/settings.styles";

type SettingItem = {
  label: string;
  icon: Parameters<typeof SettingsRowIcon>[0]["type"];
  route?: "/notifications" | "/calendar";
};

const settingsItems: SettingItem[] = [
  {
    label: "Appearance",
    icon: "appearance",
  },
  {
    label: "Notifications",
    icon: "notifications",
    route: "/notifications",
  },
  {
    label: "Calendar",
    icon: "calendar",
    route: "/calendar",
  },
  {
    label: "AI preferences",
    icon: "ai",
  },
  {
    label: "Subscription",
    icon: "subscription",
  },
  {
    label: "Account",
    icon: "account",
  },
  {
    label: "Privacy",
    icon: "privacy",
  },
  {
    label: "Help",
    icon: "help",
  },
];

export default function SettingsScreen() {
  const { colors } = useTheme();
  const settingsStyles = useMemo(() => createSettingsStyles(colors), [colors]);

  const { theme, setTheme, notificationsEnabled, setNotificationsEnabled } =
    useSettings();

  return (
    <SafeAreaView style={settingsStyles.safeArea} edges={["top"]}>
      <View style={settingsStyles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={settingsStyles.content}
        >
          <View style={settingsStyles.header}>
            <Text style={settingsStyles.headerTitle}>Settings</Text>
          </View>

          <View style={settingsStyles.profileSection}>
            <View style={settingsStyles.profileInfo}>
              <View style={settingsStyles.avatar}>
                <Text style={settingsStyles.avatarText}>AJ</Text>
              </View>

              <View style={settingsStyles.profileText}>
                <Text style={settingsStyles.profileName}>Alex Johnson</Text>
                <Text style={settingsStyles.profileEmail}>
                  alex@example.com
                </Text>
              </View>
            </View>

            <View style={settingsStyles.appearanceToggle}>
              <Pressable
                style={[
                  settingsStyles.appearanceOption,
                  theme === "light" && settingsStyles.appearanceOptionActive,
                ]}
                onPress={() => setTheme("light")}
                accessibilityRole="button"
                accessibilityLabel="Use light mode"
              >
                <Text
                  style={[
                    settingsStyles.appearanceText,
                    theme === "light" && settingsStyles.appearanceTextActive,
                  ]}
                >
                  Light
                </Text>
              </Pressable>

              <Pressable
                style={[
                  settingsStyles.appearanceOption,
                  theme === "dark" && settingsStyles.appearanceOptionActive,
                ]}
                onPress={() => setTheme("dark")}
                accessibilityRole="button"
                accessibilityLabel="Use dark mode"
              >
                <Text
                  style={[
                    settingsStyles.appearanceText,
                    theme === "dark" && settingsStyles.appearanceTextActive,
                  ]}
                >
                  Dark
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={settingsStyles.menu}>
            {settingsItems.map((item, index) => {
              const isLast = index === settingsItems.length - 1;
              const isNotifications = item.label === "Notifications";
              const interactive = Boolean(item.route);

              const handlePress = () => {
                if (item.route) {
                  router.push(item.route);
                }
              };

              return (
                <Pressable
                  key={item.label}
                  style={({ pressed }) => [
                    settingsStyles.menuItem,
                    !isLast && settingsStyles.menuItemBorder,
                    pressed && interactive && settingsStyles.pressed,
                  ]}
                  onPress={handlePress}
                  disabled={!interactive}
                  accessibilityRole={interactive ? "button" : undefined}
                  accessibilityLabel={item.label}
                >
                  <View style={settingsStyles.iconContainer}>
                    <SettingsRowIcon type={item.icon} />
                  </View>

                  <Text style={settingsStyles.menuText}>{item.label}</Text>

                  {isNotifications ? (
                    <Switch
                      value={notificationsEnabled}
                      onValueChange={(enabled) => {
                        void setNotificationsEnabled(enabled);
                      }}
                      trackColor={{
                        false: colors.surfaceElevated,
                        true: colors.accent,
                      }}
                      thumbColor={colors.white}
                      accessibilityLabel="Enable notifications"
                    />
                  ) : (
                    <Text style={settingsStyles.chevron}>›</Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
}
