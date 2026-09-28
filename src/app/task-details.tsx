import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTasks } from "../context/TaskContext";
import { taskDetailsStyles } from "../features/tasks/task-details.styles";

function formatScheduledAt(value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return {
    date: date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    time: date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

function getStatusLabel(
  status: "upcoming" | "in-progress" | "completed",
  stage:
    | "created"
    | "planning"
    | "planned"
    | "scheduled"
    | "active"
    | "completed",
) {
  if (status === "completed") {
    return "Completed";
  }

  if (stage === "scheduled") {
    return "Scheduled";
  }

  if (status === "in-progress") {
    return "In progress";
  }

  if (stage === "planned") {
    return "Ready to schedule";
  }

  return "Not started";
}

export default function TaskDetailsScreen() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>();

  const { getTaskById, startTask, completeSubtask, completeTask } = useTasks();

  if (!taskId) {
    router.replace("/home");
    return null;
  }

  const task = getTaskById(taskId);

  if (!task?.plan) {
    router.replace("/home");
    return null;
  }

  const totalMinutes = task.plan.subtasks.reduce(
    (total, subtask) => total + subtask.durationMinutes,
    0,
  );

  const completedCount = task.plan.subtasks.filter(
    (subtask) => subtask.status === "completed",
  ).length;

  const totalSubtasks = task.plan.subtasks.length;

  const progress =
    totalSubtasks > 0 ? Math.round((completedCount / totalSubtasks) * 100) : 0;

  const isCompleted = task.status === "completed";
  const isActive = task.status === "in-progress";
  const canStart =
    !isCompleted &&
    !isActive &&
    (task.stage === "planned" || task.stage === "scheduled");

  const scheduled = formatScheduledAt(task.scheduledAt);
  const statusLabel = getStatusLabel(task.status, task.stage);

  const handleStartTask = () => {
    startTask(task.id);
  };

  const handleCompleteTask = () => {
    completeTask(task.id);
  };

  const handleCompleteSubtask = (subtaskId: string) => {
    if (isCompleted) {
      return;
    }

    completeSubtask(task.id, subtaskId);
  };

  return (
    <SafeAreaView style={taskDetailsStyles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={taskDetailsStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={taskDetailsStyles.header}>
          <Pressable
            style={({ pressed }) => [
              taskDetailsStyles.backButton,
              pressed && taskDetailsStyles.buttonPressed,
            ]}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={taskDetailsStyles.backText}>‹</Text>
          </Pressable>

          <View style={taskDetailsStyles.headerCopy}>
            <Text style={taskDetailsStyles.eyebrow}>TASK DETAILS</Text>

            <Text style={taskDetailsStyles.title}>{task.goal}</Text>

            <View style={taskDetailsStyles.statusRow}>
              <View
                style={[
                  taskDetailsStyles.statusDot,
                  isCompleted && taskDetailsStyles.statusDotCompleted,
                  isActive && taskDetailsStyles.statusDotActive,
                ]}
              />

              <Text style={taskDetailsStyles.statusText}>{statusLabel}</Text>
            </View>
          </View>
        </View>

        <View style={taskDetailsStyles.metaRow}>
          <View style={taskDetailsStyles.metaCard}>
            <Text style={taskDetailsStyles.metaLabel}>PRIORITY</Text>

            <Text style={taskDetailsStyles.metaValue}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Text>
          </View>

          <View style={taskDetailsStyles.metaCard}>
            <Text style={taskDetailsStyles.metaLabel}>EST. TIME</Text>

            <Text style={taskDetailsStyles.metaValue}>{totalMinutes} min</Text>
          </View>
        </View>

        {scheduled && (
          <View style={taskDetailsStyles.scheduleCard}>
            <View style={taskDetailsStyles.scheduleCopy}>
              <Text style={taskDetailsStyles.metaLabel}>SCHEDULED SESSION</Text>

              <Text style={taskDetailsStyles.scheduleDate}>
                {scheduled.date}
              </Text>

              <Text style={taskDetailsStyles.scheduleTime}>
                {scheduled.time}
              </Text>
            </View>
          </View>
        )}

        <View style={taskDetailsStyles.progressSection}>
          <View style={taskDetailsStyles.progressHeader}>
            <View>
              <Text style={taskDetailsStyles.sectionTitle}>
                Overall progress
              </Text>

              <Text style={taskDetailsStyles.progressSummary}>
                {completedCount} of {totalSubtasks} steps completed
              </Text>
            </View>

            <Text style={taskDetailsStyles.progressPercentage}>
              {progress}%
            </Text>
          </View>

          <View style={taskDetailsStyles.progressTrack}>
            <View
              style={[
                taskDetailsStyles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
        </View>

        <View style={taskDetailsStyles.section}>
          <Text style={taskDetailsStyles.sectionTitle}>AI summary</Text>

          <View style={taskDetailsStyles.summaryCard}>
            <Text style={taskDetailsStyles.summary}>{task.plan.summary}</Text>
          </View>
        </View>

        <View style={taskDetailsStyles.section}>
          <View style={taskDetailsStyles.stepsHeader}>
            <Text style={taskDetailsStyles.sectionTitle}>
              Steps ({totalSubtasks})
            </Text>

            <Text style={taskDetailsStyles.stepsHint}>
              {isCompleted ? "Completed" : "Tap to complete"}
            </Text>
          </View>

          <View style={taskDetailsStyles.stepsCard}>
            {task.plan.subtasks.map((subtask, index) => {
              const isSubtaskCompleted = subtask.status === "completed";

              return (
                <Pressable
                  key={subtask.id}
                  style={({ pressed }) => [
                    taskDetailsStyles.step,
                    index !== 0 && taskDetailsStyles.stepSpacing,
                    isSubtaskCompleted && taskDetailsStyles.stepCompleted,
                    pressed &&
                      !isSubtaskCompleted &&
                      taskDetailsStyles.stepPressed,
                  ]}
                  onPress={() => handleCompleteSubtask(subtask.id)}
                  disabled={isSubtaskCompleted || isCompleted}
                  accessibilityRole="button"
                  accessibilityLabel={
                    isSubtaskCompleted
                      ? `${subtask.title}, completed`
                      : `Complete ${subtask.title}`
                  }
                >
                  <View
                    style={[
                      taskDetailsStyles.stepNumber,
                      isSubtaskCompleted &&
                        taskDetailsStyles.stepNumberCompleted,
                    ]}
                  >
                    <Text
                      style={[
                        taskDetailsStyles.stepNumberText,
                        isSubtaskCompleted &&
                          taskDetailsStyles.stepNumberTextCompleted,
                      ]}
                    >
                      {isSubtaskCompleted ? "✓" : index + 1}
                    </Text>
                  </View>

                  <View style={taskDetailsStyles.stepContent}>
                    <Text
                      style={[
                        taskDetailsStyles.stepTitle,
                        isSubtaskCompleted &&
                          taskDetailsStyles.stepTitleCompleted,
                      ]}
                    >
                      {subtask.title}
                    </Text>

                    <Text style={taskDetailsStyles.stepDescription}>
                      {subtask.description}
                    </Text>

                    <Text style={taskDetailsStyles.duration}>
                      {subtask.durationMinutes} min
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={taskDetailsStyles.tipCard}>
          <Text style={taskDetailsStyles.tipEyebrow}>AI TIP</Text>

          <Text style={taskDetailsStyles.tipText}>
            Focus on one step at a time. Completing the current step keeps the
            plan moving without overwhelming the rest of the task.
          </Text>
        </View>

        {canStart && (
          <Pressable
            style={({ pressed }) => [
              taskDetailsStyles.primaryButton,
              pressed && taskDetailsStyles.buttonPressed,
            ]}
            onPress={handleStartTask}
          >
            <Text style={taskDetailsStyles.primaryButtonText}>
              Continue Task
            </Text>
          </Pressable>
        )}

        {isActive && (
          <Pressable
            style={({ pressed }) => [
              taskDetailsStyles.primaryButton,
              pressed && taskDetailsStyles.buttonPressed,
            ]}
            onPress={handleCompleteTask}
          >
            <Text style={taskDetailsStyles.primaryButtonText}>
              Mark Complete
            </Text>
          </Pressable>
        )}

        {isCompleted && (
          <View style={taskDetailsStyles.completedCard}>
            <Text style={taskDetailsStyles.completedTitle}>Task completed</Text>

            <Text style={taskDetailsStyles.completedText}>
              You completed all of the work in this plan.
            </Text>
          </View>
        )}

        {!isActive && !isCompleted && task.stage === "created" && (
          <Pressable
            style={({ pressed }) => [
              taskDetailsStyles.secondaryButton,
              pressed && taskDetailsStyles.buttonPressed,
            ]}
            onPress={() =>
              router.push({
                pathname: "/schedule-task",
                params: { taskId: task.id },
              })
            }
          >
            <Text style={taskDetailsStyles.secondaryButtonText}>
              Schedule Task
            </Text>
          </Pressable>
        )}

        {task.stage === "planned" && !isActive && !isCompleted && (
          <Pressable
            style={({ pressed }) => [
              taskDetailsStyles.secondaryButton,
              pressed && taskDetailsStyles.buttonPressed,
            ]}
            onPress={() =>
              router.push({
                pathname: "/schedule-task",
                params: { taskId: task.id },
              })
            }
          >
            <Text style={taskDetailsStyles.secondaryButtonText}>
              Change Schedule
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
