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
import type {
  AvailableTime,
  ManualSubtaskInput,
  TaskPriority,
} from "../types/task";

const MAX_GOAL_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_STEP_TITLE_LENGTH = 100;
const MAX_STEP_DESCRIPTION_LENGTH = 240;

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

const durationOptions = [
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "60 min", value: 60 },
  { label: "90 min", value: 90 },
  { label: "2 hours", value: 120 },
];

type RequiredField =
  | "goal"
  | "deadline"
  | "priority"
  | "availableTime"
  | "steps";

type SelectType = "priority" | "availableTime" | "duration" | null;

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

type StepDraft = ManualSubtaskInput & {
  id: string;
};

function createEmptyStep(): StepDraft {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: "",
    description: "",
    durationMinutes: 30,
  };
}

export default function CreateTaskScreen() {
  const { createManualTask } = useTasks();

  const today = useMemo(() => startOfDay(new Date()), []);

  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [priority, setPriority] = useState<TaskPriority | null>(null);
  const [availableTime, setAvailableTime] = useState<AvailableTime | null>(
    null,
  );

  const [steps, setSteps] = useState<StepDraft[]>([createEmptyStep()]);

  const [openSelect, setOpenSelect] = useState<SelectType>(null);

  const [durationStepId, setDurationStepId] = useState<string | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [error, setError] = useState<RequiredField | "">("");

  const monthDays = useMemo(() => getMonthDays(calendarMonth), [calendarMonth]);

  const selectedDurationStep = steps.find((step) => step.id === durationStepId);

  const updateStep = (stepId: string, updates: Partial<ManualSubtaskInput>) => {
    setSteps((currentSteps) =>
      currentSteps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              ...updates,
            }
          : step,
      ),
    );

    if (error === "steps") {
      setError("");
    }
  };

  const addStep = () => {
    setSteps((currentSteps) => [...currentSteps, createEmptyStep()]);
  };

  const removeStep = (stepId: string) => {
    setSteps((currentSteps) =>
      currentSteps.filter((step) => step.id !== stepId),
    );
  };

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

    const validSteps = steps.filter((step) => step.title.trim().length > 0);

    if (validSteps.length === 0) {
      setError("steps");
      return;
    }

    const task = createManualTask(
      {
        goal: goal.trim(),
        description: description.trim(),
        deadline: deadline.toISOString(),
        priority,
        availableTime,
      },
      validSteps.map((step) => ({
        title: step.title.trim(),
        description: step.description.trim(),
        durationMinutes: step.durationMinutes,
      })),
    );

    router.replace({
      pathname: "/task-details",
      params: {
        taskId: task.id,
      },
    });
  };

  const selectTitle =
    openSelect === "priority"
      ? "Select priority"
      : openSelect === "availableTime"
        ? "Select available time"
        : "Select duration";

  const selectOptions =
    openSelect === "priority"
      ? priorityOptions
      : openSelect === "availableTime"
        ? availableTimeOptions
        : durationOptions;

  const selectedValue =
    openSelect === "priority"
      ? priority
      : openSelect === "availableTime"
        ? availableTime
        : selectedDurationStep?.durationMinutes;

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
                Build your plan manually. You control every step.
              </Text>
            </View>
          </View>

          <View style={createTaskStyles.form}>
            {/* Title */}
            <View style={createTaskStyles.field}>
              <Text style={createTaskStyles.label}>Task title</Text>

              <TextInput
                accessibilityLabel="Task title"
                autoCapitalize="sentences"
                maxLength={MAX_GOAL_LENGTH}
                onChangeText={(value) => {
                  setGoal(value);

                  if (error === "goal") {
                    setError("");
                  }
                }}
                placeholder="What do you want to accomplish?"
                placeholderTextColor={createTaskStyles.placeholder.color}
                style={[
                  createTaskStyles.input,
                  error === "goal" && createTaskStyles.inputInvalid,
                ]}
                value={goal}
              />

              <View style={createTaskStyles.characterRow}>
                <Text style={createTaskStyles.helperText}>
                  Give your task a clear, specific name.
                </Text>

                <Text style={createTaskStyles.characterCount}>
                  {goal.length}/{MAX_GOAL_LENGTH}
                </Text>
              </View>

              {error === "goal" && (
                <Text style={createTaskStyles.error}>Enter a task title.</Text>
              )}
            </View>

            {/* Description */}
            <View style={createTaskStyles.field}>
              <Text style={createTaskStyles.label}>Description</Text>

              <TextInput
                accessibilityLabel="Task description"
                autoCapitalize="sentences"
                multiline
                maxLength={MAX_DESCRIPTION_LENGTH}
                onChangeText={setDescription}
                placeholder="Add any context or details that will help you complete it..."
                placeholderTextColor={createTaskStyles.placeholder.color}
                style={[
                  createTaskStyles.input,
                  createTaskStyles.descriptionInput,
                ]}
                textAlignVertical="top"
                value={description}
              />

              <Text style={createTaskStyles.characterCount}>
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </Text>
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

              {error === "deadline" && (
                <Text style={createTaskStyles.error}>Select a deadline.</Text>
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
                  )?.label ?? "How much time can you give this?"}
                </Text>

                <Text style={createTaskStyles.selectChevron}>›</Text>
              </Pressable>

              {error === "availableTime" && (
                <Text style={createTaskStyles.error}>
                  Select your available time.
                </Text>
              )}
            </View>

            {/* Steps */}
            <View style={createTaskStyles.stepsSection}>
              <View style={createTaskStyles.stepsHeader}>
                <View style={createTaskStyles.stepsHeading}>
                  <Text style={createTaskStyles.label}>Steps</Text>

                  <Text style={createTaskStyles.helperText}>
                    Break the task into actions you can complete.
                  </Text>
                </View>

                <Text style={createTaskStyles.stepCount}>{steps.length}</Text>
              </View>

              {steps.map((step, index) => (
                <View key={step.id} style={createTaskStyles.stepCard}>
                  <View style={createTaskStyles.stepCardHeader}>
                    <Text style={createTaskStyles.stepNumber}>
                      Step {index + 1}
                    </Text>

                    {steps.length > 1 && (
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Remove step ${index + 1}`}
                        onPress={() => removeStep(step.id)}
                        hitSlop={8}
                      >
                        <Text style={createTaskStyles.removeStepText}>
                          Remove step
                        </Text>
                      </Pressable>
                    )}
                  </View>

                  <TextInput
                    accessibilityLabel={`Step ${index + 1} title`}
                    autoCapitalize="sentences"
                    maxLength={MAX_STEP_TITLE_LENGTH}
                    onChangeText={(value) =>
                      updateStep(step.id, {
                        title: value,
                      })
                    }
                    placeholder="Step title"
                    placeholderTextColor={createTaskStyles.placeholder.color}
                    style={createTaskStyles.input}
                    value={step.title}
                  />

                  <TextInput
                    accessibilityLabel={`Step ${index + 1} description`}
                    autoCapitalize="sentences"
                    multiline
                    maxLength={MAX_STEP_DESCRIPTION_LENGTH}
                    onChangeText={(value) =>
                      updateStep(step.id, {
                        description: value,
                      })
                    }
                    placeholder="What needs to be done?"
                    placeholderTextColor={createTaskStyles.placeholder.color}
                    style={[
                      createTaskStyles.input,
                      createTaskStyles.stepDescriptionInput,
                    ]}
                    textAlignVertical="top"
                    value={step.description}
                  />

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Select duration for step ${index + 1}`}
                    onPress={() => {
                      setDurationStepId(step.id);
                      setOpenSelect("duration");
                    }}
                    style={({ pressed }) => [
                      createTaskStyles.selectButton,
                      createTaskStyles.stepDurationButton,
                      pressed && createTaskStyles.selectButtonPressed,
                    ]}
                  >
                    <Text style={createTaskStyles.selectText}>
                      {
                        durationOptions.find(
                          (option) => option.value === step.durationMinutes,
                        )?.label
                      }
                    </Text>

                    <Text style={createTaskStyles.selectChevron}>›</Text>
                  </Pressable>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Add step after step ${index + 1}`}
                    onPress={addStep}
                    style={({ pressed }) => [
                      createTaskStyles.addStepButton,
                      pressed && createTaskStyles.addStepButtonPressed,
                    ]}
                  >
                    <Text style={createTaskStyles.addStepText}>Add step</Text>
                  </Pressable>
                </View>
              ))}

              {error === "steps" && (
                <Text style={createTaskStyles.error}>
                  Add at least one step with a title.
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
            <Text style={createTaskStyles.submitText}>Create Task</Text>
          </Pressable>

          <Text style={createTaskStyles.submitHint}>
            You can schedule the task and manage it from Task Details after
            creation.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Selection modal */}
      <Modal
        animationType="slide"
        transparent
        visible={openSelect !== null}
        onRequestClose={() => {
          setOpenSelect(null);
          setDurationStepId(null);
        }}
      >
        <Pressable
          style={createTaskStyles.modalOverlay}
          onPress={() => {
            setOpenSelect(null);
            setDurationStepId(null);
          }}
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
                  key={String(option.value)}
                  onPress={() => {
                    if (openSelect === "priority") {
                      setPriority(option.value as TaskPriority);
                    } else if (openSelect === "availableTime") {
                      setAvailableTime(option.value as AvailableTime);
                    } else if (openSelect === "duration" && durationStepId) {
                      updateStep(durationStepId, {
                        durationMinutes: option.value as number,
                      });
                    }

                    setError("");
                    setOpenSelect(null);
                    setDurationStepId(null);
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

      {/* Deadline calendar */}
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
