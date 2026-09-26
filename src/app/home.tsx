import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTasks } from "../context/TaskContext";

import { colors } from "../constants/colors";
import { radius, spacing } from "../constants/spacing";
import { typography } from "../constants/typography";

const dates = [
  { day: "Mon", date: "21" },
  { day: "Tue", date: "22" },
  { day: "Wed", date: "23" },
  { day: "Thu", date: "24", active: true },
  { day: "Fri", date: "25" },
  { day: "Sat", date: "26" },
  { day: "Sun", date: "27" },
];

const schedule = [
  {
    time: "10:00 - 11:30 AM",
    title: "Design remaining sections",
    icon: "✓",
    type: "task",
  },
  {
    time: "12:30 - 1:30 PM",
    title: "Lunch break",
    icon: "•",
    type: "break",
  },
  {
    time: "2:00 - 4:00 PM",
    title: "Implement responsive layout",
    icon: "✓",
    type: "task",
  },
];

function HomeIcon({ active = false }: { active?: boolean }) {
  const color = active ? colors.accent : colors.textMuted;

  return (
    <View style={styles.iconBox}>
      <View
        style={[
          styles.houseRoof,
          {
            borderBottomColor: color,
          },
        ]}
      />
      <View
        style={[
          styles.houseBody,
          {
            borderColor: color,
          },
        ]}
      >
        <View
          style={[
            styles.houseDoor,
            {
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

function TasksIcon({ active = false }: { active?: boolean }) {
  const color = active ? colors.accent : colors.textMuted;

  return (
    <View
      style={[
        styles.taskIcon,
        {
          borderColor: color,
        },
      ]}
    >
      <View style={styles.taskIconLine}>
        <View
          style={[
            styles.taskCheck,
            {
              borderColor: color,
            },
          ]}
        />
        <View
          style={[
            styles.taskLine,
            {
              backgroundColor: color,
            },
          ]}
        />
      </View>

      <View style={styles.taskIconLine}>
        <View
          style={[
            styles.taskCheck,
            {
              borderColor: color,
            },
          ]}
        />
        <View
          style={[
            styles.taskLine,
            {
              backgroundColor: color,
            },
          ]}
        />
      </View>

      <View style={styles.taskIconLine}>
        <View
          style={[
            styles.taskCheck,
            {
              borderColor: color,
            },
          ]}
        />
        <View
          style={[
            styles.taskLine,
            {
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

function AnalyticsIcon({ active = false }: { active?: boolean }) {
  const color = active ? colors.accent : colors.textMuted;

  return (
    <View style={styles.analyticsIcon}>
      <View
        style={[
          styles.chartBar,
          styles.chartBarOne,
          { backgroundColor: color },
        ]}
      />
      <View
        style={[
          styles.chartBar,
          styles.chartBarTwo,
          { backgroundColor: color },
        ]}
      />
      <View
        style={[
          styles.chartBar,
          styles.chartBarThree,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
}

function SettingsIcon({ active = false }: { active?: boolean }) {
  const color = active ? colors.accent : colors.textMuted;

  return (
    <View
      style={[
        styles.settingsIcon,
        {
          borderColor: color,
        },
      ]}
    >
      <View
        style={[
          styles.settingsCenter,
          {
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

export default function HomeScreen() {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const totalTasks = tasks.length;

  const progressPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const nextTask =
    tasks.find((task) => task.status === "in-progress") ??
    tasks.find((task) => task.status === "upcoming");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good morning, Alex 👋</Text>
              <Text style={styles.dateText}>Thu, 24 Apr 2025</Text>
            </View>

            <Pressable
              style={styles.profileButton}
              onPress={() => router.push("/settings")}
            >
              <Text style={styles.profileIcon}>♙</Text>
            </Pressable>
          </View>

          {/* Date selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateRow}
          >
            {dates.map((item) => (
              <View
                key={item.date}
                style={[styles.dateItem, item.active && styles.dateItemActive]}
              >
                <Text
                  style={[styles.dayText, item.active && styles.activeDateText]}
                >
                  {item.day}
                </Text>

                <Text
                  style={[
                    styles.numberText,
                    item.active && styles.activeDateText,
                  ]}
                >
                  {item.date}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Next up */}
          <View style={styles.nextUpCard}>
            <View style={styles.nextUpHeader}>
              <View style={styles.nextUpTitleRow}>
                <View style={styles.nextUpDot} />
                <Text style={styles.nextUpLabel}>Next up</Text>
              </View>

              <Text style={styles.moreIcon}>⋮</Text>
            </View>

            <Text style={styles.taskTitle}>
              {nextTask?.title || "No tasks scheduled"}
            </Text>

            <Text style={styles.taskTime}>{nextTask?.time || "N/A"}</Text>

            <View style={styles.taskBottomRow}>
              <View style={styles.taskStatus}>
                <Text style={styles.checkText}>✓</Text>
              </View>

              <View style={styles.taskProgressTrack}>
                <View style={styles.taskProgressFill} />
              </View>

              <Text style={styles.taskPercentage}>{progressPercentage}%</Text>
            </View>
          </View>

          {/* Today's progress */}
          <View style={styles.progressHeader}>
            <Text style={styles.sectionTitle}>Today's progress</Text>

            <Text style={styles.progressSummary}>{totalTasks} tasks</Text>
          </View>

          <View style={styles.progressRow}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>

            <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
          </View>

          {/* Today's schedule */}
          <View style={styles.scheduleSection}>
            <Text style={styles.sectionTitle}>Today's schedule</Text>

            <View style={styles.scheduleCard}>
              {schedule.map((item, index) => (
                <View
                  key={item.title}
                  style={[
                    styles.scheduleItem,
                    index !== schedule.length - 1 && styles.scheduleItemSpacing,
                  ]}
                >
                  <Text style={styles.scheduleTime}>{item.time}</Text>

                  <View
                    style={[
                      styles.scheduleIcon,
                      item.type === "break" && styles.breakIcon,
                    ]}
                  >
                    <Text style={styles.scheduleIconText}>{item.icon}</Text>
                  </View>

                  <Text
                    style={[
                      styles.scheduleTitle,
                      item.type === "break" && styles.breakTitle,
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Floating create button */}
        <Pressable
          style={({ pressed }) => [
            styles.createButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/create-task")}
        >
          <Text style={styles.createPlus}>+</Text>
          <Text style={styles.createText}>Create Task</Text>
        </Pressable>

        {/* Bottom navigation */}
        <View style={styles.bottomNav}>
          <Pressable style={styles.navItem}>
            <HomeIcon active />

            <Text style={[styles.navLabel, styles.navActive]}>Home</Text>
          </Pressable>

          <Pressable style={styles.navItem}>
            <TasksIcon />

            <Text style={styles.navLabel}>Tasks</Text>
          </Pressable>

          <Pressable style={styles.navItem}>
            <AnalyticsIcon />

            <Text style={styles.navLabel}>Analytics</Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => router.push("/settings")}
          >
            <SettingsIcon />

            <Text style={styles.navLabel}>Settings</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: 105,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },

  greeting: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: 3,
  },

  dateText: {
    color: colors.textSecondary,
    fontSize: 10,
  },

  profileButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  profileIcon: {
    color: colors.text,
    fontSize: 14,
  },

  dateRow: {
    gap: 6,
    marginBottom: spacing.md,
  },

  dateItem: {
    width: 38,
    height: 46,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  dateItemActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },

  dayText: {
    color: colors.textSecondary,
    fontSize: 9,
    marginBottom: 3,
  },

  numberText: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },

  activeDateText: {
    color: colors.white,
  },

  nextUpCard: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },

  nextUpHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },

  nextUpTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  nextUpDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.danger,
    marginRight: 6,
  },

  nextUpLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: typography.weights.medium,
  },

  moreIcon: {
    color: colors.textSecondary,
    fontSize: 18,
  },

  taskTitle: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    marginBottom: 4,
  },

  taskTime: {
    color: colors.textSecondary,
    fontSize: 9,
    marginBottom: spacing.md,
  },

  taskBottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  taskStatus: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },

  checkText: {
    color: colors.textSecondary,
    fontSize: 9,
  },

  taskProgressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceElevated,
    overflow: "hidden",
  },

  taskProgressFill: {
    width: "0%",
    height: "100%",
    backgroundColor: colors.accent,
  },

  taskPercentage: {
    color: colors.textSecondary,
    fontSize: 9,
    marginLeft: spacing.sm,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },

  progressSummary: {
    color: colors.textSecondary,
    fontSize: 9,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceElevated,
    overflow: "hidden",
    marginRight: spacing.sm,
  },

  progressFill: {
    width: "50%",
    height: "100%",
    borderRadius: 3,
    backgroundColor: colors.accent,
  },

  progressPercentage: {
    color: colors.textSecondary,
    fontSize: 9,
  },

  scheduleSection: {
    marginTop: spacing.xs,
  },

  scheduleCard: {
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  scheduleItemSpacing: {
    marginBottom: spacing.md,
  },

  scheduleTime: {
    width: 76,
    color: colors.textSecondary,
    fontSize: 8,
  },

  scheduleIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },

  breakIcon: {
    backgroundColor: colors.surfaceElevated,
  },

  scheduleIconText: {
    color: colors.white,
    fontSize: 9,
  },

  scheduleTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 10,
  },

  breakTitle: {
    color: colors.textSecondary,
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 58,
    paddingHorizontal: spacing.lg,
    paddingBottom: 4,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  navItem: {
    width: 60,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },

  navLabel: {
    color: colors.textMuted,
    fontSize: 8,
    marginTop: 4,
  },

  navActive: {
    color: colors.accent,
  },

  createButton: {
    position: "absolute",
    right: spacing.lg,
    bottom: 66,
    height: 32,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.accent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  createPlus: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 16,
    marginRight: 4,
  },

  createText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: typography.weights.semibold,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  iconBox: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  houseRoof: {
    position: "absolute",
    top: 1,
    width: 10,
    height: 10,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    transform: [{ rotate: "45deg" }],
  },

  houseBody: {
    width: 11,
    height: 8,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderRadius: 2,
    position: "absolute",
    bottom: 1,
  },

  houseDoor: {
    position: "absolute",
    bottom: 0,
    left: 3,
    width: 3,
    height: 5,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },

  taskIcon: {
    width: 13,
    height: 15,
    borderWidth: 1.3,
    borderRadius: 2,
    paddingTop: 3,
    paddingHorizontal: 2,
    gap: 2,
  },

  taskIconLine: {
    flexDirection: "row",
    alignItems: "center",
    height: 2,
  },

  taskCheck: {
    width: 3,
    height: 3,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    transform: [{ rotate: "-45deg" }],
    marginRight: 2,
  },

  taskLine: {
    flex: 1,
    height: 1,
    borderRadius: 1,
  },

  analyticsIcon: {
    width: 15,
    height: 15,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 2,
  },

  chartBar: {
    width: 3,
    borderRadius: 1,
  },

  chartBarOne: {
    height: 6,
  },

  chartBarTwo: {
    height: 10,
  },

  chartBarThree: {
    height: 14,
  },

  settingsIcon: {
    width: 15,
    height: 15,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  settingsCenter: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
