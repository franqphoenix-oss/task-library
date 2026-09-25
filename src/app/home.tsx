import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { ProgressCard } from "../components/dashboard/ProgressCard";
import { UpcomingTask } from "../components/dashboard/UpcomingTask";
import { colors } from "../constants/colors";
import { spacing } from "../constants/spacing";
import { typography } from "../constants/typography";
import { mockTasks } from "../data/mockTasks";

export default function HomeScreen() {
  const completedTasks = 1;
  const upcomingTasks = mockTasks.filter((task) => task.status !== "completed");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader />

        <ProgressCard completed={completedTasks} total={mockTasks.length} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming</Text>
            <Text style={styles.viewAll}>View all</Text>
          </View>

          {upcomingTasks.map((task) => (
            <UpcomingTask
              key={task.id}
              title={task.title}
              time={task.time}
              duration={task.duration}
              status={
                task.status === "in-progress" ? "in-progress" : "upcoming"
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  section: {
    marginTop: spacing.sm,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },

  viewAll: {
    color: colors.accent,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
});
