import { router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnalyticsIcon } from "../icons/AnalyticsIcon";
import { HomeIcon } from "../icons/HomeIcon";
import { SettingsIcon } from "../icons/SettingsIcon";
import { TasksIcon } from "../icons/TasksIcon";

import { bottomNavStyles } from "./bottom-nav.styles";

type Tab = {
  label: string;
  route: "/home" | "/tasks" | "/analytics" | "/settings";
};

const tabs: Tab[] = [
  { label: "Home", route: "/home" },
  { label: "Tasks", route: "/tasks" },
  { label: "Analytics", route: "/analytics" },
  { label: "Settings", route: "/settings" },
];

export function BottomNav() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const renderIcon = (route: Tab["route"], active: boolean) => {
    switch (route) {
      case "/home":
        return <HomeIcon active={active} />;
      case "/tasks":
        return <TasksIcon active={active} />;
      case "/analytics":
        return <AnalyticsIcon active={active} />;
      case "/settings":
        return <SettingsIcon active={active} />;
    }
  };

  return (
    <View
      style={[
        bottomNavStyles.container,
        {
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >
      <View style={bottomNavStyles.items}>
        {tabs.map((tab) => {
          const active = pathname === tab.route;

          return (
            <Pressable
              key={tab.route}
              style={({ pressed }) => [
                bottomNavStyles.item,
                pressed && bottomNavStyles.itemPressed,
              ]}
              onPress={() => {
                if (!active) {
                  router.replace(tab.route);
                }
              }}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={tab.label}
            >
              <View
                style={[
                  bottomNavStyles.iconContainer,
                  active && bottomNavStyles.iconContainerActive,
                ]}
              >
                {renderIcon(tab.route, active)}
              </View>

              <Text
                style={[
                  bottomNavStyles.label,
                  active && bottomNavStyles.labelActive,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
