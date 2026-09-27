import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTasks } from "../context/TaskContext";

import { homeStyles } from "@/features/home/home.styles";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomNav } from "../components/navigation/BottomNav";

const dates = [
  { day: "Mon", date: "21" },
  { day: "Tue", date: "22" },
  { day: "Wed", date: "23" },
  { day: "Thu", date: "24" },
  { day: "Fri", date: "25" },
  { day: "Sat", date: "26" },
  { day: "Sun", date: "27" },
];

export default function HomeScreen() {
  const { tasks } = useTasks();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState("24");

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
            {dates.map((item) => {
              const active = item.date === selectedDate;

              return (
                <Pressable
                  key={item.date}
                  style={[
                    homeStyles.dateItem,
                    { width: dateItemWidth },
                    active && homeStyles.dateItemActive,
                  ]}
                  onPress={() => setSelectedDate(item.date)}
                >
                  <Text
                    style={[
                      homeStyles.dayText,
                      active && homeStyles.activeDateText,
                    ]}
                  >
                    {item.day}
                  </Text>

                  <Text
                    style={[
                      homeStyles.numberText,
                      active && homeStyles.activeDateText,
                    ]}
                  >
                    {item.date}
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

            <Text style={homeStyles.taskTitle}>
              {nextTask?.title || "No tasks scheduled"}
            </Text>

            <Text style={homeStyles.taskTime}>
              {nextTask
                ? `${nextTask.startTime} • ${nextTask.durationMinutes} min`
                : "You're all caught up"}
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
                      width: nextTask?.status === "completed" ? "100%" : "0%",
                    },
                  ]}
                />
              </View>

              <Text style={homeStyles.taskPercentage}>
                {nextTask?.status === "completed" ? "100%" : "—"}
              </Text>
            </View>
          </View>

          {/* Today's progress */}
          <View style={homeStyles.progressHeader}>
            <Text style={homeStyles.sectionTitle}>Today's progress</Text>

            <Text style={homeStyles.progressSummary}>
              {totalTasks} {totalTasks === 1 ? "task" : "tasks"}
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

          {/* Today's schedule */}
          <View style={homeStyles.scheduleSection}>
            <Text style={homeStyles.sectionTitle}>Today's schedule</Text>

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
                        {task.startTime}
                      </Text>

                      <View style={homeStyles.scheduleIcon}>
                        <Text style={homeStyles.scheduleIconText}>
                          {completed ? "✓" : "•"}
                        </Text>
                      </View>

                      <Text style={homeStyles.scheduleTitle}>{task.title}</Text>
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
            { width: Math.min(128, screenWidth * 0.36) },
            { bottom: insets.bottom + 66 },
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
