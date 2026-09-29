import { Text, View } from "react-native";

import { useMemo } from "react";

import { useTheme } from "../../context/ThemeContext";
import { createDashboardHeaderStyles } from "./dashboard-header.styles";

export function DashboardHeader() {
  const { colors } = useTheme();
  const dashboardHeaderStyles = useMemo(
    () => createDashboardHeaderStyles(colors),
    [colors],
  );
  return (
    <View style={dashboardHeaderStyles.container}>
      <View>
        <Text style={dashboardHeaderStyles.greeting}>Good morning</Text>
        <Text style={dashboardHeaderStyles.title}>Let’s get things done.</Text>
      </View>

      <View style={dashboardHeaderStyles.avatar}>
        <Text style={dashboardHeaderStyles.avatarText}>FP</Text>
      </View>
    </View>
  );
}
