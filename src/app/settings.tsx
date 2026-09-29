import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SettingsRowIcon } from "../components/icons/SettingsRowIcon";
import { BottomNav } from "../components/navigation/BottomNav";

import { settingsStyles } from "@/features/settings/settings.styles";

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
  const handleSettingPress = (item: SettingItem) => {
    if (item.route) {
      router.push(item.route);
    }
  };

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
              <View style={settingsStyles.appearanceOption}>
                <Text style={settingsStyles.appearanceText}>Light</Text>
              </View>

              <View
                style={[
                  settingsStyles.appearanceOption,
                  settingsStyles.appearanceOptionActive,
                ]}
              >
                <Text
                  style={[
                    settingsStyles.appearanceText,
                    settingsStyles.appearanceTextActive,
                  ]}
                >
                  Dark
                </Text>
              </View>
            </View>
          </View>

          <View style={settingsStyles.menu}>
            {settingsItems.map((item, index) => {
              const isLast = index === settingsItems.length - 1;
              const interactive = Boolean(item.route);

              return (
                <Pressable
                  key={item.label}
                  style={({ pressed }) => [
                    settingsStyles.menuItem,
                    !isLast && settingsStyles.menuItemBorder,
                    pressed && interactive && settingsStyles.pressed,
                  ]}
                  onPress={() => handleSettingPress(item)}
                  disabled={!interactive}
                  accessibilityRole={interactive ? "button" : undefined}
                  accessibilityLabel={item.label}
                >
                  <View style={settingsStyles.iconContainer}>
                    <SettingsRowIcon type={item.icon} />
                  </View>

                  <Text style={settingsStyles.menuText}>{item.label}</Text>

                  <Text style={settingsStyles.chevron}>›</Text>
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
