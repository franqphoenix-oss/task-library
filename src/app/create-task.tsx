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
import type { Task } from "../types/task";

type RequiredField = "title" | "time" | "duration";

function parseTime(value: string): string | null {
  const normalized = value.trim().toUpperCase();
  const match = normalized.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/);

  if (!match) {
    return null;
  }

  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const period = match[3];

  if (minute > 59) {
    return null;
  }

  if (period) {
    if (hour < 1 || hour > 12) {
      return null;
    }

    if (period === "AM") {
      hour = hour === 12 ? 0 : hour;
    } else {
      hour = hour === 12 ? 12 : hour + 12;
    }
  } else if (hour > 23) {
    return null;
  }

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function parseDuration(value: string): number | null {
  const normalized = value.trim().toLowerCase();

  const hourMatch = normalized.match(/(\d+(?:.\d+)?)\s*h/);
  const minuteMatch = normalized.match(/(\d+)\s*m/);

  if (!hourMatch && !minuteMatch) {
    return null;
  }

  const hours = hourMatch ? Number(hourMatch[1]) : 0;
  const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;

  const totalMinutes = Math.round(hours * 60 + minutes);

  return totalMinutes > 0 ? totalMinutes : null;
}

export default function CreateTaskScreen() {
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState<RequiredField | "">("");

  const handleSubmit = () => {
    const missingField: RequiredField | "" = !title.trim()
      ? "title"
      : !time.trim()
        ? "time"
        : !duration.trim()
          ? "duration"
          : "";

    if (missingField) {
      setError(missingField);
      return;
    }

    const startTime = parseTime(time);
    const durationMinutes = parseDuration(duration);

    if (!startTime) {
      setError("time");
      return;
    }

    if (!durationMinutes) {
      setError("duration");
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim() || undefined,
      createdAt: new Date().toISOString(),
      scheduledDate: new Date().toISOString().slice(0, 10),
      startTime,
      durationMinutes,
      status: "upcoming",
    };

    addTask(task);

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
              <Text style={createTaskStyles.title}>Create Task</Text>
              <Text style={createTaskStyles.subtitle}>
                Turn your idea into an actionable task.
              </Text>
            </View>
          </View>
          <View style={createTaskStyles.form}>
            <View style={createTaskStyles.field}>
              <Text style={createTaskStyles.label}>Task title</Text>
              <TextInput
                accessibilityLabel="Task title"
                autoCapitalize="sentences"
                onChangeText={(value) => {
                  setTitle(value);
                  if (error === "title") setError("");
                }}
                placeholder="What do you need to get done?"
                placeholderTextColor={createTaskStyles.placeholder.color}
                returnKeyType="next"
                style={[
                  createTaskStyles.input,
                  error === "title" && createTaskStyles.inputInvalid,
                ]}
                value={title}
              />
              {error === "title" && (
                <Text
                  accessibilityLiveRegion="polite"
                  style={createTaskStyles.error}
                >
                  Enter a valid task title.
                </Text>
              )}
            </View>

            <View style={createTaskStyles.field}>
              <Text style={createTaskStyles.label}>Description (optional)</Text>
              <TextInput
                accessibilityLabel="Description (optional)"
                autoCapitalize="sentences"
                multiline
                onChangeText={setDescription}
                placeholder="Add some context..."
                placeholderTextColor={createTaskStyles.placeholder.color}
                style={[
                  createTaskStyles.input,
                  createTaskStyles.descriptionInput,
                ]}
                textAlignVertical="top"
                value={description}
              />
            </View>

            <View style={createTaskStyles.field}>
              <Text style={createTaskStyles.label}>Time</Text>
              <TextInput
                accessibilityLabel="Time"
                onChangeText={(value) => {
                  setTime(value);
                  if (error === "time") setError("");
                }}
                placeholder="e.g. 10:00 AM"
                placeholderTextColor={createTaskStyles.placeholder.color}
                returnKeyType="next"
                style={[
                  createTaskStyles.input,
                  error === "time" && createTaskStyles.inputInvalid,
                ]}
                value={time}
              />
              {error === "time" && (
                <Text
                  accessibilityLiveRegion="polite"
                  style={createTaskStyles.error}
                >
                  Enter a valid time, e.g. 10:00 AM.
                </Text>
              )}
            </View>

            <View style={createTaskStyles.field}>
              <Text style={createTaskStyles.label}>Duration</Text>
              <TextInput
                accessibilityLabel="Duration"
                onChangeText={(value) => {
                  setDuration(value);
                  if (error === "duration") setError("");
                }}
                placeholder="e.g. 1h 30m"
                placeholderTextColor={createTaskStyles.placeholder.color}
                returnKeyType="done"
                style={[
                  createTaskStyles.input,
                  error === "duration" && createTaskStyles.inputInvalid,
                ]}
                value={duration}
              />
              {error === "duration" && (
                <Text
                  accessibilityLiveRegion="polite"
                  style={createTaskStyles.error}
                >
                  Enter a valid duration, e.g. 1h 30m.
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
