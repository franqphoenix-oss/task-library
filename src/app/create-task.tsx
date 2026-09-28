import { router } from "expo-router";
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
import { createTaskStyles } from "../features/tasks/create-task.styles";
import type { AvailableTime, TaskPriority } from "../types/task";

const MAX_GOAL_LENGTH = 500;

const priorityOptions: {
  label: string;
  value: TaskPriority;
}[] = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const availableTimeOptions: {
  label: string;
  value: AvailableTime;
}[] = [
  { label: "15–30 minutes", value: "15-30" },
  { label: "30–60 minutes", value: "30-60" },
  { label: "1–2 hours", value: "60-120" },
  { label: "2–4 hours", value: "120-240" },
  { label: "4+ hours", value: "240+" },
];

type RequiredField = "goal" | "deadline" | "priority" | "availableTime";

type SelectType = "priority" | "availableTime" | null;

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function startOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function isSameDay(first: Date, second: Date) {
  return startOfDay(first).getTime() === startOfDay(second).getTime();
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

  // Convert Sunday = 0 into Monday = 0.
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

export default function CreateTaskScreen() {
  const { createTask } = useTasks();

  const today = useMemo(() => startOfDay(new Date()), []);

  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [priority, setPriority] = useState<TaskPriority | null>(null);
  const [availableTime, setAvailableTime] = useState<AvailableTime | null>(
    null,
  );

  const [openSelect, setOpenSelect] = useState<SelectType>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [error, setError] = useState<RequiredField | "">("");

  const monthDays = useMemo(() => getMonthDays(calendarMonth), [calendarMonth]);

  const handleOpenDeadline = () => {
    setCalendarMonth(
      deadline
        ? new Date(deadline.getFullYear(), deadline.getMonth(), 1)
        : new Date(today.getFullYear(), today.getMonth(), 1),
    );

    setShowDatePicker(true);

    if (error === "deadline") {
      setError("");
    }
  };

  const handleSelectDeadline = (date: Date) => {
    const selectedDate = startOfDay(date);

    if (selectedDate < today) {
      return;
    }

    setDeadline(selectedDate);
    setShowDatePicker(false);
    setError("");
  };

  const handleSubmit = () => {
    if (!goal.trim()) {
      setError("goal");
      return;
    }

    if (!deadline) {
      setError("deadline");
      return;
    }

    if (!priority) {
      setError("priority");
      return;
    }

    if (!availableTime) {
      setError("availableTime");
      return;
    }

    const task = createTask({
      goal: goal.trim(),
      deadline: deadline.toISOString(),
      priority,
      availableTime,
    });

    router.push({
      pathname: "/ai-processing",
      params: {
        taskId: task.id,
      },
    });
  };

  const selectTitle =
    openSelect === "priority" ? "Select priority" : "Select available time";

  const selectOptions =
    openSelect === "priority" ? priorityOptions : availableTimeOptions;

  const selectedValue = openSelect === "priority" ? priority : availableTime;

  return (
    <SafeAreaView style={createTaskStyles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={createTaskStyles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={createTaskStyles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={createTaskStyles.header}>
            <Pressable
              accessibilityLabel="Go back"
              accessibilityRole="button"
              onPress={() => router.back()}
              style={({ pressed }) => [
                createTaskStyles.backButton,
                pressed && createTaskStyles.buttonPressed,
              ]}
            >
              <BackIcon />
            </Pressable>

            <View style={createTaskStyles.heading}>
              <Text style={createTaskStyles.title}>Create a new task</Text>

              <Text style={createTaskStyles.subtitle}>
                Let AI turn your goal into a plan
              </Text>
            </View>
          </View>

          <View style={createTaskStyles.form}>
            {/* Goal */}
            <View style={createTaskStyles.field}>
              <Text style={createTaskStyles.label}>
                What do you want to accomplish?
              </Text>

              <TextInput
                accessibilityLabel="Task goal"
                autoCapitalize="sentences"
                multiline
                maxLength={MAX_GOAL_LENGTH}
                onChangeText={(value) => {
                  setGoal(value);

                  if (error === "goal") {
                    setError("");
                  }
                }}
                placeholder="Describe what you need to get done..."
                placeholderTextColor={createTaskStyles.placeholder.color}
                style={[
                  createTaskStyles.input,
                  createTaskStyles.goalInput,
                  error === "goal" && createTaskStyles.inputInvalid,
                ]}
                textAlignVertical="top"
                value={goal}
              />

              <View style={createTaskStyles.characterRow}>
                <Text style={createTaskStyles.helperText}>
                  Be specific so AI can create a useful plan.
                </Text>

                <Text style={createTaskStyles.characterCount}>
                  {goal.length}/{MAX_GOAL_LENGTH}
                </Text>
              </View>

              {error === "goal" && (
                <Text
                  accessibilityLiveRegion="polite"
                  style={createTaskStyles.error}
                >
                  Enter what you want to accomplish.
                </Text>
              )}
            </View>

            {/* Deadline */}
            <View style={createTaskStyles.field}>
              <Text style={createTaskStyles.label}>Deadline</Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Select deadline"
                onPress={handleOpenDeadline}
                style={({ pressed }) => [
                  createTaskStyles.selectButton,
                  error === "deadline" && createTaskStyles.inputInvalid,
                  pressed && createTaskStyles.selectButtonPressed,
                ]}
              >
                <Text
                  style={[
                    createTaskStyles.selectText,
                    !deadline && createTaskStyles.selectPlaceholder,
                  ]}
                >
                  {deadline ? formatDeadline(deadline) : "Select a deadline"}
                </Text>

                <Text style={createTaskStyles.selectChevron}>›</Text>
              </Pressable>

              <Text style={createTaskStyles.helperText}>
                Your deadline is used as the source of truth for scheduling and
                notifications.
              </Text>

              {error === "deadline" && (
                <Text
                  accessibilityLiveRegion="polite"
                  style={createTaskStyles.error}
                >
                  Select a deadline.
                </Text>
              )}
            </View>

            {/* Priority */}
            <View style={createTaskStyles.field}>
              <Text style={createTaskStyles.label}>Priority</Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Select priority"
                onPress={() => {
                  setOpenSelect("priority");

                  if (error === "priority") {
                    setError("");
                  }
                }}
                style={({ pressed }) => [
                  createTaskStyles.selectButton,
                  error === "priority" && createTaskStyles.inputInvalid,
                  pressed && createTaskStyles.selectButtonPressed,
                ]}
              >
                <Text
                  style={[
                    createTaskStyles.selectText,
                    !priority && createTaskStyles.selectPlaceholder,
                  ]}
                >
                  {priorityOptions.find((option) => option.value === priority)
                    ?.label ?? "Select priority"}
                </Text>

                <Text style={createTaskStyles.selectChevron}>›</Text>
              </Pressable>

              <Text style={createTaskStyles.helperText}>
                Priority helps determine how often Task Library should remind
                you.
              </Text>

              {error === "priority" && (
                <Text
                  accessibilityLiveRegion="polite"
                  style={createTaskStyles.error}
                >
                  Select a priority.
                </Text>
              )}
            </View>

            {/* Available time */}
            <View style={createTaskStyles.field}>
              <Text style={createTaskStyles.label}>Available time</Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Select available time"
                onPress={() => {
                  setOpenSelect("availableTime");

                  if (error === "availableTime") {
                    setError("");
                  }
                }}
                style={({ pressed }) => [
                  createTaskStyles.selectButton,
                  error === "availableTime" && createTaskStyles.inputInvalid,
                  pressed && createTaskStyles.selectButtonPressed,
                ]}
              >
                <Text
                  style={[
                    createTaskStyles.selectText,
                    !availableTime && createTaskStyles.selectPlaceholder,
                  ]}
                >
                  {availableTimeOptions.find(
                    (option) => option.value === availableTime,
                  )?.label ?? "Select available time"}
                </Text>

                <Text style={createTaskStyles.selectChevron}>›</Text>
              </Pressable>

              <Text style={createTaskStyles.helperText}>
                This helps AI estimate and organize your work sessions.
              </Text>

              {error === "availableTime" && (
                <Text
                  accessibilityLiveRegion="polite"
                  style={createTaskStyles.error}
                >
                  Select how much time you have available.
                </Text>
              )}
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={handleSubmit}
            style={({ pressed }) => [
              createTaskStyles.submitButton,
              pressed && createTaskStyles.buttonPressed,
            ]}
          >
            <Text style={createTaskStyles.submitText}>Create Plan</Text>
          </Pressable>

          <Text style={createTaskStyles.submitHint}>
            AI will use your goal, deadline, priority, and available time to
            build your plan.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Priority / available time modal */}
      <Modal
        animationType="slide"
        transparent
        visible={openSelect !== null}
        onRequestClose={() => setOpenSelect(null)}
      >
        <Pressable
          style={createTaskStyles.modalOverlay}
          onPress={() => setOpenSelect(null)}
        >
          <Pressable
            style={createTaskStyles.optionSheet}
            onPress={(event) => event.stopPropagation()}
          >
            <Text style={createTaskStyles.optionSheetTitle}>{selectTitle}</Text>

            {selectOptions.map((option) => {
              const selected = option.value === selectedValue;

              return (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    if (openSelect === "priority") {
                      setPriority(option.value as TaskPriority);
                    } else {
                      setAvailableTime(option.value as AvailableTime);
                    }

                    setError("");
                    setOpenSelect(null);
                  }}
                  style={({ pressed }) => [
                    createTaskStyles.option,
                    selected && createTaskStyles.optionSelected,
                    pressed && createTaskStyles.optionPressed,
                  ]}
                >
                  <Text
                    style={[
                      createTaskStyles.optionText,
                      selected && createTaskStyles.optionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>

                  {selected && (
                    <Text style={createTaskStyles.optionCheck}>✓</Text>
                  )}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Deadline calendar modal */}
      <Modal
        animationType="slide"
        transparent
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <Pressable
          style={createTaskStyles.modalOverlay}
          onPress={() => setShowDatePicker(false)}
        >
          <Pressable
            style={createTaskStyles.calendarSheet}
            onPress={(event) => event.stopPropagation()}
          >
            <View style={createTaskStyles.calendarHeader}>
              <Text style={createTaskStyles.calendarTitle}>
                Select deadline
              </Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close deadline calendar"
                onPress={() => setShowDatePicker(false)}
                style={createTaskStyles.calendarCloseButton}
              >
                <Text style={createTaskStyles.calendarCloseText}>×</Text>
              </Pressable>
            </View>

            <View style={createTaskStyles.calendarMonthHeader}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Previous month"
                disabled={
                  calendarMonth.getFullYear() === today.getFullYear() &&
                  calendarMonth.getMonth() === today.getMonth()
                }
                onPress={() => {
                  setCalendarMonth(
                    (current) =>
                      new Date(
                        current.getFullYear(),
                        current.getMonth() - 1,
                        1,
                      ),
                  );
                }}
                style={({ pressed }) => [
                  createTaskStyles.monthButton,
                  pressed && createTaskStyles.buttonPressed,
                ]}
              >
                <Text style={createTaskStyles.monthButtonText}>‹</Text>
              </Pressable>

              <Text style={createTaskStyles.calendarMonth}>
                {formatMonth(calendarMonth)}
              </Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Next month"
                onPress={() => {
                  setCalendarMonth(
                    (current) =>
                      new Date(
                        current.getFullYear(),
                        current.getMonth() + 1,
                        1,
                      ),
                  );
                }}
                style={({ pressed }) => [
                  createTaskStyles.monthButton,
                  pressed && createTaskStyles.buttonPressed,
                ]}
              >
                <Text style={createTaskStyles.monthButtonText}>›</Text>
              </Pressable>
            </View>

            <View style={createTaskStyles.weekdayRow}>
              {WEEK_DAYS.map((day) => (
                <Text key={day} style={createTaskStyles.weekdayText}>
                  {day}
                </Text>
              ))}
            </View>

            <View style={createTaskStyles.calendarGrid}>
              {monthDays.map((date, index) => {
                if (!date) {
                  return (
                    <View
                      key={`empty-${index}`}
                      style={createTaskStyles.calendarDay}
                    />
                  );
                }

                const disabled = startOfDay(date) < today;
                const selected = deadline ? isSameDay(date, deadline) : false;
                const isToday = isSameDay(date, today);

                return (
                  <Pressable
                    key={date.toISOString()}
                    accessibilityRole="button"
                    accessibilityLabel={date.toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    disabled={disabled}
                    onPress={() => handleSelectDeadline(date)}
                    style={({ pressed }) => [
                      createTaskStyles.calendarDay,
                      isToday && createTaskStyles.calendarDayToday,
                      selected && createTaskStyles.calendarDaySelected,
                      pressed &&
                        !disabled &&
                        createTaskStyles.calendarDayPressed,
                    ]}
                  >
                    <Text
                      style={[
                        createTaskStyles.calendarDayText,
                        disabled && createTaskStyles.calendarDayDisabled,
                        isToday && createTaskStyles.calendarDayTodayText,
                        selected && createTaskStyles.calendarDaySelectedText,
                      ]}
                    >
                      {date.getDate()}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={createTaskStyles.calendarHint}>
              Choose today or any future date.
            </Text>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
