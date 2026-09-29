import {
  formatHomeDate,
  getWeekDates,
  isSameDay,
  startOfDay,
} from "@/services/scheduling";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { spacing } from "../constants/spacing";

import { NotificationIcon } from "../components/icons/NotificationIcon";
import { ProfileIcon } from "../components/icons/ProfileIcon";
import { BottomNav } from "../components/navigation/BottomNav";
import { useTasks } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";

import { createHomeStyles } from "@/features/home/home.styles";

function formatDeadline(deadline: string) {
  const date = new Date(deadline);

  if (Number.isNaN(date.getTime())) {
    return "No deadline";
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function getTaskProgress(task: {
  plan?: {
    subtasks: {
      status: "pending" | "in-progress" | "completed";
    }[];
  };
}) {
  if (!task.plan || task.plan.subtasks.length === 0) {
    return 0;
  }

  const completed = task.plan.subtasks.filter(
    (subtask) => subtask.status === "completed",
  ).length;

  return Math.round((completed / task.plan.subtasks.length) * 100);
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const homeStyles = useMemo(() => createHomeStyles(colors), [colors]);
  const insets = useSafeAreaInsets();

  const bottomNavHeight = 64 + Math.max(insets.bottom, 8);
  const createButtonBottom = bottomNavHeight + spacing.md;

  const { tasks } = useTasks();
  const { width: screenWidth } = useWindowDimensions();

  const today = useMemo(() => startOfDay(new Date()), []);

  const weekDates = useMemo(() => getWeekDates(today), [today]);

  const [selectedDate, setSelectedDate] = useState(today);

  const horizontalPadding = 32;
  const dateGap = 6;

  const dateItemWidth = Math.max(
    38,
    (screenWidth - horizontalPadding - dateGap * 6) / 7,
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const totalTasks = tasks.length;

  const progressPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const nextTask =
    tasks.find(
      (task) =>
        task.status === "in-progress" &&
        (task.stage === "active" || task.stage === "scheduled"),
    ) ??
    tasks.find(
      (task) =>
        task.status === "upcoming" &&
        (task.stage === "scheduled" || task.stage === "planned"),
    );

  const nextTaskProgress = nextTask ? getTaskProgress(nextTask) : 0;

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

              <Text style={homeStyles.dateText}>{formatHomeDate(today)}</Text>
            </View>

            <View style={homeStyles.headerActions}>
              <Pressable
                style={({ pressed }) => [
                  homeStyles.headerIconButton,
                  pressed && homeStyles.buttonPressed,
                ]}
                onPress={() => router.push("/notifications")}
                accessibilityRole="button"
                accessibilityLabel="Notifications"
              >
                <NotificationIcon />
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  homeStyles.headerIconButton,
                  pressed && homeStyles.buttonPressed,
                ]}
                onPress={() => router.push("/settings")}
                accessibilityRole="button"
                accessibilityLabel="Settings"
              >
                <ProfileIcon />
              </Pressable>
            </View>
          </View>

          {/* Date selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={homeStyles.dateRow}
          >
            {weekDates.map((date) => {
              const active = isSameDay(date, selectedDate);

              return (
                <Pressable
                  key={date.toISOString()}
                  style={[
                    homeStyles.dateItem,
                    {
                      width: dateItemWidth,
                    },
                    active && homeStyles.dateItemActive,
                  ]}
                  onPress={() => setSelectedDate(date)}
                  accessibilityRole="button"
                  accessibilityLabel={date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                >
                  <Text
                    style={[
                      homeStyles.dayText,
                      active && homeStyles.activeDateText,
                    ]}
                  >
                    {date.toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </Text>

                  <Text
                    style={[
                      homeStyles.numberText,
                      active && homeStyles.activeDateText,
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                </Pressable>
              );
            })}
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

            <Text style={homeStyles.taskTitle} numberOfLines={2}>
              {nextTask?.goal || "No tasks scheduled"}
            </Text>

            <Text style={homeStyles.taskTime}>
              {nextTask
                ? `Deadline · ${formatDeadline(nextTask.deadline)}`
                : "You&apos;re all caught up"}
            </Text>

            <View style={homeStyles.taskBottomRow}>
              <View style={homeStyles.taskStatus}>
                <Text style={homeStyles.checkText}>
                  {nextTask?.status === "completed" ? "✓" : ""}
                </Text>
              </View>

              <View style={homeStyles.taskProgressTrack}>
                <View
                  style={[
                    homeStyles.taskProgressFill,
                    {
                      width: `${nextTaskProgress}%`,
                    },
                  ]}
                />
              </View>

              <Text style={homeStyles.taskPercentage}>
                {nextTask ? `${nextTaskProgress}%` : "—"}
              </Text>
            </View>
          </View>

          {/* Today's progress */}
          <View style={homeStyles.progressHeader}>
            <Text style={homeStyles.sectionTitle}>Today&apos;s progress</Text>

            <Text style={homeStyles.progressSummary}>
              {completedTasks} of {totalTasks}{" "}
              {totalTasks === 1 ? "task" : "tasks"}
            </Text>
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

          {/* Today&apos;s schedule */}
          <View style={homeStyles.scheduleSection}>
            <Text style={homeStyles.sectionTitle}>Today&apos;s schedule</Text>

            <View style={homeStyles.scheduleCard}>
              {tasks.length === 0 ? (
                <View style={homeStyles.scheduleItem}>
                  <Text style={homeStyles.scheduleTitle}>
                    No tasks scheduled
                  </Text>
                </View>
              ) : (
                tasks.map((task, index) => {
                  const completed = task.status === "completed";

                  return (
                    <View
                      key={task.id}
                      style={[
                        homeStyles.scheduleItem,
                        index !== tasks.length - 1 &&
                          homeStyles.scheduleItemSpacing,
                      ]}
                    >
                      <Text style={homeStyles.scheduleTime}>
                        {formatDeadline(task.deadline)}
                      </Text>

                      <View style={homeStyles.scheduleIcon}>
                        <Text style={homeStyles.scheduleIconText}>
                          {completed ? "✓" : "•"}
                        </Text>
                      </View>

                      <Text style={homeStyles.scheduleTitle} numberOfLines={1}>
                        {task.goal}
                      </Text>
                    </View>
                  );
                })
              )}
            </View>
          </View>
        </ScrollView>

        {/* Floating create button */}
        <Pressable
          style={({ pressed }) => [
            homeStyles.createButton,
            {
              width: Math.min(140, screenWidth * 0.38),
              bottom: createButtonBottom,
            },
            pressed && homeStyles.buttonPressed,
          ]}
          onPress={() => router.push("/create-task")}
        >
          <Text style={homeStyles.createPlus}>+</Text>

          <Text style={homeStyles.createText}>Create Task</Text>
        </Pressable>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
}
