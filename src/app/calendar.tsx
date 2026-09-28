import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { BackIcon } from "../components/icons/BackIcon";
import { colors } from "../constants/colors";
import { radius, spacing } from "../constants/spacing";
import { typography } from "../constants/typography";
import { useTasks } from "../context/TaskContext";
import {
  formatMonth,
  formatScheduleDate,
  formatScheduledTime,
  getMonthDays,
  isBeforeToday,
  isSameDay,
} from "../services/scheduling";

function startOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function getTaskTime(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return formatScheduledTime(date);
}

function getTaskDate(task: { scheduledAt?: string; deadline: string }) {
  if (task.scheduledAt) {
    const date = new Date(task.scheduledAt);

    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }

  const deadline = new Date(task.deadline);

  return Number.isNaN(deadline.getTime()) ? null : deadline;
}

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const { tasks } = useTasks();

  const today = useMemo(() => startOfDay(new Date()), []);

  const [selectedDate, setSelectedDate] = useState(today);
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const monthDays = useMemo(() => getMonthDays(visibleMonth), [visibleMonth]);

  const scheduledTasks = useMemo(
    () =>
      tasks
        .filter((task) => task.scheduledAt)
        .sort((first, second) => {
          const firstTime = new Date(first.scheduledAt ?? "").getTime();
          const secondTime = new Date(second.scheduledAt ?? "").getTime();

          return firstTime - secondTime;
        }),
    [tasks],
  );

  const selectedTasks = useMemo(
    () =>
      scheduledTasks.filter((task) => {
        if (!task.scheduledAt) {
          return false;
        }

        const scheduledDate = new Date(task.scheduledAt);

        return (
          !Number.isNaN(scheduledDate.getTime()) &&
          isSameDay(scheduledDate, selectedDate)
        );
      }),
    [scheduledTasks, selectedDate],
  );

  const tasksWithDeadlines = useMemo(
    () =>
      tasks.filter((task) => {
        const deadline = new Date(task.deadline);

        return (
          !Number.isNaN(deadline.getTime()) && isSameDay(deadline, selectedDate)
        );
      }),
    [tasks, selectedDate],
  );

  const moveMonth = (amount: number) => {
    setVisibleMonth(
      (currentMonth) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + amount,
          1,
        ),
    );
  };

  const handleSelectDate = (date: Date) => {
    if (isBeforeToday(date)) {
      return;
    }

    setSelectedDate(startOfDay(date));
  };

  const openTask = (taskId: string) => {
    router.push({
      pathname: "/task-details",
      params: {
        taskId,
      },
    });
  };

  const selectedDateLabel = formatScheduleDate(selectedDate);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      edges={["top"]}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: spacing.xl,
            paddingTop: spacing.lg,
            paddingBottom: spacing.xxxl + Math.max(insets.bottom, 8),
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: spacing.xxl,
            }}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={() => router.back()}
              style={({ pressed }) => ({
                width: 36,
                height: 36,
                borderRadius: radius.full,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: "center",
                justifyContent: "center",
                marginRight: spacing.md,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <BackIcon />
            </Pressable>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.accent,
                  fontSize: typography.sizes.xs,
                  fontWeight: typography.weights.semibold,
                  marginBottom: spacing.xs,
                }}
              >
                CALENDAR
              </Text>

              <Text
                style={{
                  color: colors.text,
                  fontSize: typography.sizes.xxl,
                  lineHeight: 30,
                  fontWeight: typography.weights.semibold,
                }}
              >
                Your schedule
              </Text>

              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: typography.sizes.sm,
                  lineHeight: 20,
                  marginTop: spacing.xs,
                }}
              >
                Keep track of when you plan to work.
              </Text>
            </View>
          </View>

          {/* Calendar */}
          <View
            style={{
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: radius.md,
              padding: spacing.lg,
              marginBottom: spacing.xxl,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: spacing.lg,
              }}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Previous month"
                onPress={() => moveMonth(-1)}
                style={({ pressed }) => ({
                  width: 36,
                  height: 36,
                  borderRadius: radius.full,
                  backgroundColor: colors.surfaceElevated,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 22,
                    lineHeight: 24,
                  }}
                >
                  ‹
                </Text>
              </Pressable>

              <Text
                style={{
                  color: colors.text,
                  fontSize: typography.sizes.md,
                  fontWeight: typography.weights.semibold,
                }}
              >
                {formatMonth(visibleMonth)}
              </Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Next month"
                onPress={() => moveMonth(1)}
                style={({ pressed }) => ({
                  width: 36,
                  height: 36,
                  borderRadius: radius.full,
                  backgroundColor: colors.surfaceElevated,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 22,
                    lineHeight: 24,
                  }}
                >
                  ›
                </Text>
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginBottom: spacing.sm,
              }}
            >
              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <Text
                  key={`${day}-${index}`}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    color: colors.textMuted,
                    fontSize: typography.sizes.xs,
                    fontWeight: typography.weights.semibold,
                  }}
                >
                  {day}
                </Text>
              ))}
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {monthDays.map((date, index) => {
                if (!date) {
                  return (
                    <View
                      key={`empty-${index}`}
                      style={{
                        width: "14.2857%",
                        aspectRatio: 1,
                      }}
                    />
                  );
                }

                const past = isBeforeToday(date);
                const selected = isSameDay(date, selectedDate);
                const todayDate = isSameDay(date, today);

                const hasScheduledTask = scheduledTasks.some((task) => {
                  if (!task.scheduledAt) {
                    return false;
                  }

                  return isSameDay(new Date(task.scheduledAt), date);
                });

                const hasDeadline = tasks.some((task) => {
                  const deadline = new Date(task.deadline);

                  return (
                    !Number.isNaN(deadline.getTime()) &&
                    isSameDay(deadline, date)
                  );
                });

                return (
                  <Pressable
                    key={date.toISOString()}
                    disabled={past}
                    accessibilityRole="button"
                    accessibilityLabel={date.toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    onPress={() => handleSelectDate(date)}
                    style={({ pressed }) => ({
                      width: "14.2857%",
                      aspectRatio: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: pressed && !past ? 0.7 : past ? 0.35 : 1,
                    })}
                  >
                    <View
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: radius.full,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: selected
                          ? colors.accent
                          : "transparent",
                      }}
                    >
                      <Text
                        style={{
                          color: selected ? colors.white : colors.text,
                          fontSize: typography.sizes.sm,
                          fontWeight:
                            selected || todayDate
                              ? typography.weights.semibold
                              : typography.weights.regular,
                        }}
                      >
                        {date.getDate()}
                      </Text>
                    </View>

                    {(hasScheduledTask || hasDeadline) && !selected && (
                      <View
                        style={{
                          position: "absolute",
                          bottom: 5,
                          flexDirection: "row",
                          gap: 3,
                        }}
                      >
                        {hasScheduledTask && (
                          <View
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: radius.full,
                              backgroundColor: colors.accent,
                            }}
                          />
                        )}

                        {hasDeadline && (
                          <View
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: radius.full,
                              backgroundColor: colors.warning,
                            }}
                          />
                        )}
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Selected date */}
          <View
            style={{
              marginBottom: spacing.lg,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
              }}
            >
              {selectedDateLabel}
            </Text>

            <Text
              style={{
                color: colors.textSecondary,
                fontSize: typography.sizes.sm,
                marginTop: spacing.xs,
              }}
            >
              {selectedTasks.length === 0
                ? "Nothing scheduled"
                : `${selectedTasks.length} scheduled ${
                    selectedTasks.length === 1 ? "task" : "tasks"
                  }`}
            </Text>
          </View>

          {/* Scheduled tasks */}
          {selectedTasks.length > 0 && (
            <View style={{ marginBottom: spacing.xxl }}>
              {selectedTasks.map((task) => (
                <Pressable
                  key={task.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Open ${task.goal}`}
                  onPress={() => openTask(task.id)}
                  style={({ pressed }) => ({
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: radius.md,
                    padding: spacing.lg,
                    marginBottom: spacing.sm,
                    opacity: pressed ? 0.75 : 1,
                  })}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: radius.full,
                        backgroundColor:
                          task.status === "completed"
                            ? colors.success
                            : task.status === "in-progress"
                              ? colors.accent
                              : colors.textMuted,
                        marginTop: 6,
                        marginRight: spacing.md,
                      }}
                    />

                    <View style={{ flex: 1 }}>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: colors.text,
                          fontSize: typography.sizes.md,
                          fontWeight: typography.weights.semibold,
                          lineHeight: 22,
                        }}
                      >
                        {task.goal}
                      </Text>

                      <Text
                        style={{
                          color: colors.textSecondary,
                          fontSize: typography.sizes.sm,
                          marginTop: spacing.xs,
                        }}
                      >
                        {getTaskTime(task.scheduledAt)}
                      </Text>

                      {task.plan && (
                        <Text
                          style={{
                            color: colors.textMuted,
                            fontSize: typography.sizes.xs,
                            marginTop: spacing.xs,
                          }}
                        >
                          {
                            task.plan.subtasks.filter(
                              (subtask) => subtask.status === "completed",
                            ).length
                          }{" "}
                          of {task.plan.subtasks.length} steps complete
                        </Text>
                      )}
                    </View>

                    <Text
                      style={{
                        color: colors.textMuted,
                        fontSize: 22,
                        marginLeft: spacing.sm,
                      }}
                    >
                      ›
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}

          {/* Deadlines */}
          {tasksWithDeadlines.length > 0 && (
            <View>
              <Text
                style={{
                  color: colors.text,
                  fontSize: typography.sizes.md,
                  fontWeight: typography.weights.semibold,
                  marginBottom: spacing.md,
                }}
              >
                Deadlines
              </Text>

              {tasksWithDeadlines.map((task) => (
                <Pressable
                  key={`deadline-${task.id}`}
                  accessibilityRole="button"
                  onPress={() => openTask(task.id)}
                  style={({ pressed }) => ({
                    backgroundColor: colors.surfaceElevated,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: radius.md,
                    padding: spacing.lg,
                    marginBottom: spacing.sm,
                    opacity: pressed ? 0.75 : 1,
                  })}
                >
                  <Text
                    numberOfLines={2}
                    style={{
                      color: colors.text,
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.semibold,
                    }}
                  >
                    {task.goal}
                  </Text>

                  <Text
                    style={{
                      color:
                        task.status === "completed"
                          ? colors.success
                          : colors.warning,
                      fontSize: typography.sizes.xs,
                      marginTop: spacing.xs,
                    }}
                  >
                    {task.status === "completed"
                      ? "Completed"
                      : `Due ${formatScheduleDate(new Date(task.deadline))}`}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          {selectedTasks.length === 0 && tasksWithDeadlines.length === 0 && (
            <View
              style={{
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: radius.md,
                padding: spacing.xl,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: typography.sizes.md,
                  fontWeight: typography.weights.semibold,
                  textAlign: "center",
                }}
              >
                Nothing planned for this day
              </Text>

              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: typography.sizes.sm,
                  lineHeight: 20,
                  textAlign: "center",
                  marginTop: spacing.xs,
                }}
              >
                Schedule a task before its deadline and it will appear here.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
