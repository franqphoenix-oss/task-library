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

const PRIORITY_OPTIONS = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const AVAILABLE_TIME_OPTIONS = [
  { label: "15–30 minutes", value: "15-30" },
  { label: "30–60 minutes", value: "30-60" },
  { label: "1–2 hours", value: "60-120" },
  { label: "2–4 hours", value: "120-240" },
  { label: "4+ hours", value: "240+" },
];

type FieldError = "goal" | "deadline" | "priority" | "availableTime" | "";

function formatDeadline(date: Date) {
  return date.toLocaleDateString("en-US", {
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [error, setError] = useState<FieldError>("");

  const handleCreatePlan = () => {
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

    /*
     * The current Task model still contains the older scheduling fields.
     * We keep the existing fields populated here so the current AI-processing
     * flow continues to work while the task model is migrated to the new
     * goal/deadline/priority/availability structure.
     */
    const task = createTask({
      goal: goal.trim(),
      deadline: deadline.toISOString(),
      priority: priority as TaskPriority,
      availableTime: availableTime as AvailableTime,
    });

    router.push({
      pathname: "/ai-processing",
      params: {
        taskId: task.id,
      },
    });

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
                  Let AI turn your goal into a plan.
                </Text>
              </View>
            </View>

            <View style={createTaskStyles.form}>
              {/* Goal */}
              <View style={createTaskStyles.field}>
                <View style={createTaskStyles.labelRow}>
                  <Text style={createTaskStyles.label}>Your goal</Text>
                  <Text style={createTaskStyles.required}>Required</Text>
                </View>

                <TextInput
                  accessibilityLabel="Your goal"
                  autoCapitalize="sentences"
                  multiline
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
                    createTaskStyles.goalInput,
                    error === "goal" && createTaskStyles.inputInvalid,
                  ]}
                  textAlignVertical="top"
                  value={goal}
                />

                <View style={createTaskStyles.helperRow}>
                  <Text style={createTaskStyles.helperText}>
                    Be as specific as you can. AI will use this as the basis for
                    your plan.
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
                    Tell us what you want to accomplish.
                  </Text>
                )}
              </View>

              {/* Deadline */}
              <View style={createTaskStyles.field}>
                <View style={createTaskStyles.labelRow}>
                  <Text style={createTaskStyles.label}>Deadline</Text>
                  <Text style={createTaskStyles.required}>Required</Text>
                </View>

                <Pressable
                  accessibilityLabel="Select deadline"
                  accessibilityRole="button"
                  onPress={() => {
                    setShowDatePicker(true);
                    if (error === "deadline") {
                      setError("");
                    }
                  }}
                  style={({ pressed }) => [
                    createTaskStyles.selectButton,
                    error === "deadline" && createTaskStyles.inputInvalid,
                    pressed && createTaskStyles.buttonPressed,
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

                  <Text style={createTaskStyles.chevron}>›</Text>
                </Pressable>

                {showDatePicker && (
                  <View style={createTaskStyles.datePickerContainer}>
                    <DateTimePicker
                      value={deadline ?? new Date()}
                      mode="date"
                      minimumDate={new Date()}
                      presentation="dialog"
                      onValueChange={(_event, selectedDate) => {
                        setDeadline(selectedDate);
                        setShowDatePicker(false);
                        setError("");
                      }}
                      onDismiss={() => setShowDatePicker(false)}
                    />
                  </View>
                )}

                <Text style={createTaskStyles.helperText}>
                  This is the target date the plan should work toward.
                </Text>

                {error === "deadline" && (
                  <Text
                    accessibilityLiveRegion="polite"
                    style={createTaskStyles.error}
                  >
                    Select a deadline for this task.
                  </Text>
                )}
              </View>

              {/* Priority */}
              <View style={createTaskStyles.field}>
                <View style={createTaskStyles.labelRow}>
                  <Text style={createTaskStyles.label}>Priority</Text>
                  <Text style={createTaskStyles.required}>Required</Text>
                </View>

                <View
                  style={[
                    createTaskStyles.pickerContainer,
                    error === "priority" && createTaskStyles.inputInvalid,
                  ]}
                >
                  <Picker
                    selectedValue={priority}
                    onValueChange={(value) => {
                      setPriority(value);

                      if (error === "priority") {
                        setError("");
                      }
                    }}
                  >
                    <Picker.Item label="Select priority" value="" />

                    {PRIORITY_OPTIONS.map((option) => (
                      <Picker.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                      />
                    ))}
                  </Picker>
                </View>

                <Text style={createTaskStyles.helperText}>
                  Priority helps determine how frequently you'll be reminded
                  about this task.
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
                <View style={createTaskStyles.labelRow}>
                  <Text style={createTaskStyles.label}>Available time</Text>
                  <Text style={createTaskStyles.required}>Required</Text>
                </View>

                <View
                  style={[
                    createTaskStyles.pickerContainer,
                    error === "availableTime" && createTaskStyles.inputInvalid,
                  ]}
                >
                  <Picker
                    selectedValue={availableTime}
                    onValueChange={(value) => {
                      setAvailableTime(value);

                      if (error === "availableTime") {
                        setError("");
                      }
                    }}
                  >
                    <Picker.Item label="How much time can you give?" value="" />

                    {AVAILABLE_TIME_OPTIONS.map((option) => (
                      <Picker.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                      />
                    ))}
                  </Picker>
                </View>

                <Text style={createTaskStyles.helperText}>
                  AI will use this to build a realistic schedule around your
                  available time.
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

            <View style={createTaskStyles.submitSection}>
              <Pressable
                accessibilityRole="button"
                onPress={handleCreatePlan}
                style={({ pressed }) => [
                  createTaskStyles.submitButton,
                  pressed && createTaskStyles.buttonPressed,
                ]}
              >
                <Text style={createTaskStyles.submitText}>Create Plan</Text>
              </Pressable>

              <Text style={createTaskStyles.submitHint}>
                AI will break your goal into practical steps and build a plan
                around your deadline.
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
}
