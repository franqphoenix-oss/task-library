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

    const task: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim() || undefined,
      time: time.trim(),
      duration: duration.trim(),
      status: "upcoming",
    };

    addTask(task);
    router.back();
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
                  Enter a task title.
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
                  Enter a time.
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
                  Enter a duration.
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
