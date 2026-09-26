import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTasks } from "../context/TaskContext";

import { homeStyles } from "@/features/home/home.styles";
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
    <SafeAreaView style={homeStyles.safeArea} edges={["top"]}>
      <View style={homeStyles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={homeStyles.content}
        >
          {/* Header */}
          <View style={homeStyles.header}>
            <View>
              <Text style={homeStyles.greeting}>Good morning, Alex 👋</Text>
              <Text style={homeStyles.dateText}>Thu, 24 Apr 2025</Text>
            </View>

            <Pressable
              style={homeStyles.profileButton}
              onPress={() => router.push("/settings")}
            >
              <Text style={homeStyles.profileIcon}>♙</Text>
            </Pressable>
          </View>

          {/* Date selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={homeStyles.dateRow}
          >
            {dates.map((item) => (
              <View
                key={item.date}
                style={[
                  homeStyles.dateItem,
                  item.active && homeStyles.dateItemActive,
                ]}
              >
                <Text
                  style={[
                    homeStyles.dayText,
                    item.active && homeStyles.activeDateText,
                  ]}
                >
                  {item.day}
                </Text>

                <Text
                  style={[
                    homeStyles.numberText,
                    item.active && homeStyles.activeDateText,
                  ]}
                >
                  {item.date}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Next up */}
          <View style={homeStyles.nextUpCard}>
            <View style={homeStyles.nextUpHeader}>
              <View style={homeStyles.nextUpTitleRow}>
                <View style={homeStyles.nextUpDot} />
                <Text style={homeStyles.nextUpLabel}>Next up</Text>
              </View>

              <Text style={homeStyles.moreIcon}>⋮</Text>
            </View>

            <Text style={homeStyles.taskTitle}>
              {nextTask?.title || "No tasks scheduled"}
            </Text>

            <Text style={homeStyles.taskTime}>{nextTask?.time || "N/A"}</Text>

            <View style={homeStyles.taskBottomRow}>
              <View style={homeStyles.taskStatus}>
                <Text style={homeStyles.checkText}>✓</Text>
              </View>

              <View style={homeStyles.taskProgressTrack}>
                <View
                  style={[
                    homeStyles.taskProgressFill,
                    {
                      width: `${progressPercentage}%`,
                    },
                  ]}
                />
              </View>

              <Text style={homeStyles.taskPercentage}>
                {progressPercentage}%
              </Text>
            </View>
          </View>

          {/* Today's progress */}
          <View style={homeStyles.progressHeader}>
            <Text style={homeStyles.sectionTitle}>Today's progress</Text>

            <Text style={homeStyles.progressSummary}>{totalTasks} tasks</Text>
          </View>

          <View style={homeStyles.progressRow}>
            <View style={homeStyles.progressTrack}>
              <View
                style={[
                  homeStyles.progressFill,
                  {
                    width: `${progressPercentage}%`,
                  },
                ]}
              />
            </View>

            <Text style={homeStyles.progressPercentage}>
              {progressPercentage}%
            </Text>
          </View>

          {/* Today's schedule */}
          <View style={homeStyles.scheduleSection}>
            <Text style={homeStyles.sectionTitle}>Today's schedule</Text>

            <View style={homeStyles.scheduleCard}>
              {schedule.map((item, index) => (
                <View
                  key={item.title}
                  style={[
                    homeStyles.scheduleItem,
                    index !== schedule.length - 1 &&
                      homeStyles.scheduleItemSpacing,
                  ]}
                >
                  <Text style={homeStyles.scheduleTime}>{item.time}</Text>

                  <View
                    style={[
                      homeStyles.scheduleIcon,
                      item.type === "break" && homeStyles.breakIcon,
                    ]}
                  >
                    <Text style={homeStyles.scheduleIconText}>{item.icon}</Text>
                  </View>

                  <Text
                    style={[
                      homeStyles.scheduleTitle,
                      item.type === "break" && homeStyles.breakTitle,
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
            homeStyles.createButton,
            pressed && homeStyles.buttonPressed,
          ]}
          onPress={() => router.push("/create-task")}
        >
          <Text style={homeStyles.createPlus}>+</Text>
          <Text style={homeStyles.createText}>Create Task</Text>
        </Pressable>

        {/* Bottom navigation */}
        <View style={homeStyles.bottomNav}>
          <Pressable style={homeStyles.navItem}>
            <HomeIcon active />

            <Text style={[homeStyles.navLabel, homeStyles.navActive]}>
              Home
            </Text>
          </Pressable>

          <Pressable style={homeStyles.navItem}>
            <TasksIcon />

            <Text style={homeStyles.navLabel}>Tasks</Text>
          </Pressable>

          <Pressable style={homeStyles.navItem}>
            <AnalyticsIcon />

            <Text style={homeStyles.navLabel}>Analytics</Text>
          </Pressable>

          <Pressable
            style={homeStyles.navItem}
            onPress={() => router.push("/settings")}
          >
            <SettingsIcon />

            <Text style={homeStyles.navLabel}>Settings</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
