import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackIcon } from "../components/icons/BackIcon";
import { useTasks } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";
import { createCreateTaskStyles } from "../features/tasks/create-task.styles";
import { AvailableTime, TaskPriority } from "../types/task";

const MAX_GOAL_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 500;

const priorityOptions: {
  label: string;
  value: TaskPriority;
}[] = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
];

const availableTimeOptions: {
  label: string;
  value: AvailableTime;
}[] = [
  {
    label: "15–30 minutes",
    value: "15-30",
  },
  {
    label: "30–60 minutes",
    value: "30-60",
  },
  {
    label: "1–2 hours",
    value: "60-120",
  },
  {
    label: "2–4 hours",
    value: "120-240",
  },
  {
    label: "4+ hours",
    value: "240+",
  },
];

type SelectType = "priority" | "availableTime" | null;

function startOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function formatDeadline(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatMonth(date: Date) {
  return date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

function getMonthDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstWeekday = (firstDay.getDay() + 6) % 7;

  const days: (Date | null)[] = [];

  for (let index = 0; index < firstWeekday; index += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day));
  }

  return days;
}

function isSameDay(first: Date, second: Date) {
  return startOfDay(first).getTime() === startOfDay(second).getTime();
}

function getTaskDeadline(taskDeadline: string) {
  const parsed = new Date(taskDeadline);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return startOfDay(parsed);
}

export default function EditTaskScreen() {
  const { colors } = useTheme();

  const taskStyles = useMemo(() => createCreateTaskStyles(colors), [colors]);

  const { taskId } = useLocalSearchParams<{
    taskId: string;
  }>();

  const { tasks, isLoading, updateTask } = useTasks();

  const task = tasks.find((item) => item.id === taskId);

  const today = useMemo(() => startOfDay(new Date()), []);
  const initialDeadline = task ? getTaskDeadline(task.deadline) : null;

  const [goal, setGoal] = useState(task?.goal ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [deadline, setDeadline] = useState<Date | null>(initialDeadline);
  const [priority, setPriority] = useState<TaskPriority | null>(
    task?.priority ?? null,
  );
  const [availableTime, setAvailableTime] = useState<AvailableTime | null>(
    task?.availableTime ?? null,
  );

  const [openSelect, setOpenSelect] = useState<SelectType>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [calendarMonth, setCalendarMonth] = useState(
    initialDeadline
      ? new Date(initialDeadline.getFullYear(), initialDeadline.getMonth(), 1)
      : new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [error, setError] = useState("");

  const monthDays = useMemo(() => getMonthDays(calendarMonth), [calendarMonth]);

  if (!taskId) {
    router.replace("/home");
    return null;
  }

  if (isLoading) {
    return (
      <SafeAreaView style={taskStyles.safeArea} edges={["top", "bottom"]}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
            }}
          >
            Loading task...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!task) {
    router.replace("/home");
    return null;
  }

  const moveMonth = (amount: number) => {
    setCalendarMonth(
      (currentMonth) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + amount,
          1,
        ),
    );
  };

  const handleOpenDeadline = () => {
    setCalendarMonth(
      deadline
        ? new Date(deadline.getFullYear(), deadline.getMonth(), 1)
        : new Date(today.getFullYear(), today.getMonth(), 1),
    );

    setShowDatePicker(true);
    setError("");
  };

  const handleSelectDeadline = (date: Date) => {
    const selectedDate = startOfDay(date);

    if (selectedDate < today) {
      return;
    }

    if (task.scheduledAt) {
      const scheduledDate = new Date(task.scheduledAt);

      if (
        !Number.isNaN(scheduledDate.getTime()) &&
        startOfDay(scheduledDate).getTime() > selectedDate.getTime()
      ) {
        setError(
          "This deadline is before the scheduled session. Reschedule the task first.",
        );
        return;
      }
    }

    setDeadline(selectedDate);
    setShowDatePicker(false);
    setError("");
  };

  const handleSave = () => {
    const trimmedGoal = goal.trim();

    if (!trimmedGoal) {
      setError("Task title cannot be empty.");
      return;
    }

    if (!deadline) {
      setError("Choose a deadline.");
      return;
    }

    if (!priority) {
      setError("Choose a priority.");
      return;
    }

    if (!availableTime) {
      setError("Choose the available time.");
      return;
    }

    updateTask(task.id, {
      goal: trimmedGoal,
      description: description.trim(),
      deadline: deadline.toISOString(),
      priority,
      availableTime,
    });

    router.replace({
      pathname: "/task-details",
      params: {
        taskId: task.id,
      },
    });
  };

  const handleBack = () => {
    router.replace("/tasks");
  };

  const selectTitle =
    openSelect === "priority" ? "Select priority" : "Select available time";

  const selectOptions =
    openSelect === "priority" ? priorityOptions : availableTimeOptions;

  const selectedValue = openSelect === "priority" ? priority : availableTime;

  return (
    <SafeAreaView style={taskStyles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={taskStyles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={taskStyles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={taskStyles.header}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={handleBack}
              style={({ pressed }) => [
                taskStyles.backButton,
                pressed && taskStyles.buttonPressed,
              ]}
            >
              <BackIcon />
            </Pressable>

            <View style={taskStyles.heading}>
              <Text style={taskStyles.title}>Edit task</Text>

              <Text style={taskStyles.subtitle}>
                Update the task details without losing its current progress.
              </Text>
            </View>
          </View>

          <View style={taskStyles.form}>
            <View style={taskStyles.field}>
              <Text style={taskStyles.label}>TASK</Text>

              <TextInput
                value={goal}
                onChangeText={(value) => {
                  setGoal(value);

                  if (error) {
                    setError("");
                  }
                }}
                maxLength={MAX_GOAL_LENGTH}
                placeholder="What do you need to accomplish?"
                placeholderTextColor={colors.textMuted}
                style={[taskStyles.input, taskStyles.goalInput]}
                multiline
                textAlignVertical="top"
              />

              <View style={taskStyles.characterRow}>
                <Text style={taskStyles.helperText}>
                  Keep the task clear and actionable.
                </Text>

                <Text style={taskStyles.characterCount}>
                  {goal.length}/{MAX_GOAL_LENGTH}
                </Text>
              </View>
            </View>

            <View style={taskStyles.field}>
              <Text style={taskStyles.label}>DESCRIPTION</Text>

              <TextInput
                value={description}
                onChangeText={setDescription}
                maxLength={MAX_DESCRIPTION_LENGTH}
                placeholder="Add any useful context..."
                placeholderTextColor={colors.textMuted}
                style={[taskStyles.input, taskStyles.descriptionInput]}
                multiline
                textAlignVertical="top"
              />

              <View style={taskStyles.characterRow}>
                <Text style={taskStyles.helperText}>
                  Optional additional context.
                </Text>

                <Text style={taskStyles.characterCount}>
                  {description.length}/{MAX_DESCRIPTION_LENGTH}
                </Text>
              </View>
            </View>

            <View style={taskStyles.field}>
              <Text style={taskStyles.label}>DEADLINE</Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Edit deadline"
                onPress={handleOpenDeadline}
                style={({ pressed }) => [
                  taskStyles.selectButton,
                  pressed && taskStyles.selectButtonPressed,
                ]}
              >
                <Text style={taskStyles.selectText}>
                  {deadline ? formatDeadline(deadline) : "Choose a deadline"}
                </Text>

                <Text style={taskStyles.selectChevron}>›</Text>
              </Pressable>
            </View>

            <View style={taskStyles.field}>
              <Text style={taskStyles.label}>PRIORITY</Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Edit priority"
                onPress={() => setOpenSelect("priority")}
                style={({ pressed }) => [
                  taskStyles.selectButton,
                  pressed && taskStyles.selectButtonPressed,
                ]}
              >
                <Text
                  style={[
                    taskStyles.selectText,
                    !priority && taskStyles.selectPlaceholder,
                  ]}
                >
                  {priority
                    ? priority.charAt(0).toUpperCase() + priority.slice(1)
                    : "Choose priority"}
                </Text>

                <Text style={taskStyles.selectChevron}>›</Text>
              </Pressable>
            </View>

            <View style={taskStyles.field}>
              <Text style={taskStyles.label}>AVAILABLE TIME</Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Edit available time"
                onPress={() => setOpenSelect("availableTime")}
                style={({ pressed }) => [
                  taskStyles.selectButton,
                  pressed && taskStyles.selectButtonPressed,
                ]}
              >
                <Text
                  style={[
                    taskStyles.selectText,
                    !availableTime && taskStyles.selectPlaceholder,
                  ]}
                >
                  {availableTime
                    ? availableTimeOptions.find(
                        (option) => option.value === availableTime,
                      )?.label
                    : "Choose available time"}
                </Text>

                <Text style={taskStyles.selectChevron}>›</Text>
              </Pressable>
            </View>
          </View>

          {error ? <Text style={taskStyles.error}>{error}</Text> : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              task?.scheduledAt ? "Reschedule task" : "Schedule task"
            }
            onPress={() =>
              router.push({
                pathname: "/schedule-task",
                params: {
                  taskId: task.id,
                },
              })
            }
            style={({ pressed }) => [
              taskStyles.secondaryButton,
              pressed && taskStyles.buttonPressed,
            ]}
          >
            <Text style={taskStyles.secondaryButtonText}>
              {task?.scheduledAt ? "Reschedule Task" : "Schedule Task"}
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Save task changes"
            onPress={handleSave}
            style={({ pressed }) => [
              taskStyles.submitButton,
              pressed && taskStyles.buttonPressed,
            ]}
          >
            <Text style={taskStyles.submitText}>Save Changes</Text>
          </Pressable>

          <Text style={taskStyles.submitHint}>
            Your current task progress and generated steps will remain
            unchanged.
          </Text>
        </ScrollView>

        <Modal
          visible={openSelect !== null}
          transparent
          animationType="slide"
          onRequestClose={() => setOpenSelect(null)}
        >
          <View style={taskStyles.modalOverlay}>
            <View style={taskStyles.optionSheet}>
              <Text style={taskStyles.optionSheetTitle}>{selectTitle}</Text>

              {selectOptions.map((option) => {
                const selected = option.value === selectedValue;

                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="button"
                    onPress={() => {
                      if (openSelect === "priority") {
                        setPriority(option.value as TaskPriority);
                      } else {
                        setAvailableTime(option.value as AvailableTime);
                      }

                      setOpenSelect(null);
                    }}
                    style={({ pressed }) => [
                      taskStyles.option,
                      pressed && taskStyles.optionPressed,
                      selected && taskStyles.optionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        taskStyles.optionText,
                        selected && taskStyles.optionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>

                    {selected && <Text style={taskStyles.optionCheck}>✓</Text>}
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Modal>

        <Modal
          visible={showDatePicker}
          transparent
          animationType="slide"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={taskStyles.modalOverlay}>
            <View style={taskStyles.calendarSheet}>
              <View style={taskStyles.calendarHeader}>
                <Text style={taskStyles.calendarTitle}>Choose deadline</Text>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Close deadline picker"
                  onPress={() => setShowDatePicker(false)}
                  style={taskStyles.calendarCloseButton}
                >
                  <Text style={taskStyles.calendarCloseText}>×</Text>
                </Pressable>
              </View>

              <View style={taskStyles.calendarMonthHeader}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Previous month"
                  onPress={() => moveMonth(-1)}
                  style={taskStyles.monthButton}
                >
                  <Text style={taskStyles.monthButtonText}>‹</Text>
                </Pressable>

                <Text style={taskStyles.calendarMonth}>
                  {formatMonth(calendarMonth)}
                </Text>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Next month"
                  onPress={() => moveMonth(1)}
                  style={taskStyles.monthButton}
                >
                  <Text style={taskStyles.monthButtonText}>›</Text>
                </Pressable>
              </View>

              <View style={taskStyles.weekdayRow}>
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <Text key={`${day}-${index}`} style={taskStyles.weekdayText}>
                    {day}
                  </Text>
                ))}
              </View>

              <View style={taskStyles.calendarGrid}>
                {monthDays.map((date, index) => {
                  if (!date) {
                    return (
                      <View
                        key={`empty-${index}`}
                        style={taskStyles.calendarDay}
                      />
                    );
                  }

                  const disabled = date < today;
                  const selected =
                    deadline !== null && isSameDay(date, deadline);
                  const isToday = isSameDay(date, today);

                  return (
                    <Pressable
                      key={date.toISOString()}
                      disabled={disabled}
                      accessibilityRole="button"
                      accessibilityLabel={date.toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                      onPress={() => handleSelectDeadline(date)}
                      style={({ pressed }) => [
                        taskStyles.calendarDay,
                        pressed && !disabled && taskStyles.calendarDayPressed,
                        isToday && !selected && taskStyles.calendarDayToday,
                      ]}
                    >
                      <Text
                        style={[
                          taskStyles.calendarDayText,
                          disabled && taskStyles.calendarDayDisabled,
                          isToday &&
                            !selected &&
                            taskStyles.calendarDayTodayText,
                          selected && taskStyles.calendarDaySelectedText,
                        ]}
                      >
                        {date.getDate()}
                      </Text>

                      {selected && (
                        <View
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: 8,
                            backgroundColor: colors.accent,
                            zIndex: -1,
                          }}
                        />
                      )}
                    </Pressable>
                  );
                })}
              </View>

              <Text style={taskStyles.calendarHint}>
                Current progress is preserved when you edit the task.
              </Text>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
