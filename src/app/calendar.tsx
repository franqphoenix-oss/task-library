import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { BackIcon } from "../components/icons/BackIcon";
import { BottomNav } from "../components/navigation/BottomNav";
import { useTasks } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";
import { createCalendarStyles } from "../features/calendar/calendar.styles";
import {
  addDays,
  formatScheduleHeaderDate,
  formatScheduledTime,
  getScheduledTasksForDate,
  startOfDay,
} from "../services/scheduling";

export default function CalendarScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { tasks } = useTasks();

  const calendarStyles = useMemo(() => createCalendarStyles(colors), [colors]);

  const today = useMemo(() => startOfDay(new Date()), []);

  const [selectedDate, setSelectedDate] = useState(today);

  const scheduledTasks = useMemo(
    () => getScheduledTasksForDate(tasks, selectedDate),
    [tasks, selectedDate],
  );

  const moveDate = (amount: number) => {
    setSelectedDate((currentDate) => addDays(currentDate, amount));
  };

  const openTask = (taskId: string) => {
    router.push({
      pathname: "/task-details",
      params: {
        taskId,
      },
    });
  };

  return (
    <SafeAreaView style={calendarStyles.safeArea} edges={["top"]}>
      <View style={calendarStyles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            calendarStyles.content,
            {
              paddingBottom:
                calendarStyles.content.paddingBottom +
                Math.max(insets.bottom, 8),
            },
          ]}
        >
          <View style={calendarStyles.header}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={() => router.back()}
              style={({ pressed }) => [
                calendarStyles.backButton,
                pressed && calendarStyles.backButtonPressed,
              ]}
            >
              <BackIcon />
            </Pressable>

            <Text style={calendarStyles.title}>Schedule</Text>
          </View>

          <View style={calendarStyles.dateNavigation}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Previous day"
              onPress={() => moveDate(-1)}
              style={({ pressed }) => [
                calendarStyles.dateButton,
                pressed && calendarStyles.dateButtonPressed,
              ]}
            >
              <Text style={calendarStyles.dateButtonText}>‹</Text>
            </Pressable>

            <Text style={calendarStyles.dateLabel}>
              {formatScheduleHeaderDate(selectedDate)}
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Next day"
              onPress={() => moveDate(1)}
              style={({ pressed }) => [
                calendarStyles.dateButton,
                pressed && calendarStyles.dateButtonPressed,
              ]}
            >
              <Text style={calendarStyles.dateButtonText}>›</Text>
            </Pressable>
          </View>

          {scheduledTasks.length > 0 ? (
            <View style={calendarStyles.timeline}>
              {scheduledTasks.map((task) => {
                const scheduledDate = new Date(task.scheduledAt!);

                return (
                  <View key={task.id} style={calendarStyles.timelineRow}>
                    <View style={calendarStyles.timeColumn}>
                      <Text style={calendarStyles.timeText}>
                        {formatScheduledTime(scheduledDate)}
                      </Text>
                    </View>

                    <View style={calendarStyles.markerColumn}>
                      <View style={calendarStyles.markerRail} />
                      <View style={calendarStyles.marker} />
                    </View>

                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Open ${task.goal}`}
                      onPress={() => openTask(task.id)}
                      style={({ pressed }) => [
                        calendarStyles.taskButton,
                        pressed && calendarStyles.taskButtonPressed,
                      ]}
                    >
                      <Text numberOfLines={2} style={calendarStyles.taskTitle}>
                        {task.goal}
                      </Text>

                      <Text style={calendarStyles.taskSource}>
                        (Task Library)
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={calendarStyles.emptyState}>
              <Text style={calendarStyles.emptyTitle}>Nothing scheduled</Text>

              <Text style={calendarStyles.emptyText}>
                Tasks you schedule for this day will appear here.
              </Text>
            </View>
          )}
        </ScrollView>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
}
