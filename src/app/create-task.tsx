import { Picker } from "@expo/ui";
import DateTimePicker from "@expo/ui/community/datetime-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
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

type RequiredField = "goal" | "deadline" | "priority" | "availableTime";

function formatDeadline(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CreateTaskScreen() {
  const { createTask } = useTasks();

  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [priority, setPriority] = useState<TaskPriority | null>(null);
  const [availableTime, setAvailableTime] = useState<AvailableTime | null>(
    null,
  );

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [error, setError] = useState<RequiredField | "">("");

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
                onPress={() => {
                  setShowDatePicker(true);

                  if (error === "deadline") {
                    setError("");
                  }
                }}
                style={[
                  createTaskStyles.selectButton,
                  error === "deadline" && createTaskStyles.inputInvalid,
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

              {showDatePicker && (
                <View style={createTaskStyles.datePicker}>
                  <DateTimePicker
                    value={deadline ?? new Date()}
                    mode="date"
                    minimumDate={new Date()}
                    presentation="dialog"
                    onValueChange={(_, selectedDate) => {
                      if (selectedDate) {
                        setDeadline(selectedDate);
                        setShowDatePicker(false);
                        setError("");
                      }
                    }}
                    onDismiss={() => {
                      setShowDatePicker(false);
                    }}
                  />
                </View>
              )}

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

              <View
                style={[
                  createTaskStyles.pickerWrapper,
                  error === "priority" && createTaskStyles.inputInvalid,
                ]}
              >
                <Picker
                  selectedValue={priority ?? "medium"}
                  onValueChange={(value) => {
                    setPriority(value as TaskPriority);

                    if (error === "priority") {
                      setError("");
                    }
                  }}
                >
                  {priorityOptions.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>

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

              <View
                style={[
                  createTaskStyles.pickerWrapper,
                  error === "availableTime" && createTaskStyles.inputInvalid,
                ]}
              >
                <Picker
                  selectedValue={availableTime ?? "30-60"}
                  onValueChange={(value) => {
                    setAvailableTime(value as AvailableTime);

                    if (error === "availableTime") {
                      setError("");
                    }
                  }}
                >
                  {availableTimeOptions.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>

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
    </SafeAreaView>
  );
}
