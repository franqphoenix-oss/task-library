import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { BottomNav } from "../components/navigation/BottomNav";
import { useTasks } from "../context/TaskContext";
import { tasksStyles } from "../features/tasks/tasks.styles";
import type { Task } from "../types/task";

function formatDate(value?: string) {
  if (!value) {
    return "Not scheduled";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not scheduled";
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function formatTime(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getProgress(task: Task) {
  if (!task.plan?.subtasks.length) {
    return 0;
  }

  const completed = task.plan.subtasks.filter(
    (subtask) => subtask.status === "completed",
  ).length;

  return Math.round((completed / task.plan.subtasks.length) * 100);
}

function getPriorityLabel(task: Task) {
  return task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
}

function TaskCard({
  task,
  onPress,
  onStart,
}: {
  task: Task;
  onPress: () => void;
  onStart?: () => void;
}) {
  const progress = getProgress(task);

  const isCompleted = task.status === "completed";
  const isActive = task.stage === "active";
  const isScheduled = task.stage === "scheduled";

  return (
    <Pressable
      style={({ pressed }) => [
        tasksStyles.taskCard,
        pressed && tasksStyles.taskCardPressed,
      ]}
      onPress={onPress}
    >
      <View style={tasksStyles.cardTopRow}>
        <View
          style={[
            tasksStyles.statusDot,
            isCompleted && tasksStyles.statusDotCompleted,
            isActive && tasksStyles.statusDotActive,
          ]}
        />

        <Text style={tasksStyles.priority}>{getPriorityLabel(task)}</Text>
      </View>

      <Text
        style={[
          tasksStyles.taskTitle,
          isCompleted && tasksStyles.taskTitleCompleted,
        ]}
        numberOfLines={2}
      >
        {task.goal}
      </Text>

      <View style={tasksStyles.metaRow}>
        <Text style={tasksStyles.metaText}>
          {isScheduled
            ? `${formatDate(task.scheduledAt)} · ${formatTime(
                task.scheduledAt,
              )}`
            : `Due ${formatDate(task.deadline)}`}
        </Text>

        {task.plan ? (
          <Text style={tasksStyles.metaText}>{progress}% complete</Text>
        ) : (
          <Text style={tasksStyles.metaText}>Needs planning</Text>
        )}
      </View>

      {task.plan && (
        <View style={tasksStyles.progressTrack}>
          <View style={[tasksStyles.progressFill, { width: `${progress}%` }]} />
        </View>
      )}

      {task.plan && !isCompleted && (
        <View style={tasksStyles.cardBottomRow}>
          <Text style={tasksStyles.stepsText}>
            {
              task.plan.subtasks.filter(
                (subtask) => subtask.status === "completed",
              ).length
            }{" "}
            of {task.plan.subtasks.length} steps
          </Text>

          {isScheduled && onStart ? (
            <Pressable
              style={({ pressed }) => [
                tasksStyles.startButton,
                pressed && tasksStyles.startButtonPressed,
              ]}
              onPress={(event) => {
                event.stopPropagation();
                onStart();
              }}
            >
              <Text style={tasksStyles.startButtonText}>Start</Text>
            </Pressable>
          ) : null}
        </View>
      )}
    </Pressable>
  );
}

export default function TasksScreen() {
  const insets = useSafeAreaInsets();
  const { tasks, startTask } = useTasks();

  const activeTasks = tasks.filter((task) => task.status === "in-progress");

  const scheduledTasks = tasks.filter(
    (task) => task.status === "upcoming" && task.stage === "scheduled",
  );

  const plannedTasks = tasks.filter(
    (task) =>
      task.status === "upcoming" &&
      (task.stage === "planned" || task.stage === "created"),
  );

  const completedTasks = tasks.filter((task) => task.status === "completed");

  const openTask = (task: Task) => {
    if (!task.plan) {
      return;
    }

    router.push({
      pathname: "/task-details",
      params: {
        taskId: task.id,
      },
    });
  };

  const handleStartTask = (task: Task) => {
    startTask(task.id);

    router.push({
      pathname: "/task-details",
      params: {
        taskId: task.id,
      },
    });
  };

  const hasTasks = tasks.length > 0;

  return (
    <SafeAreaView style={tasksStyles.safeArea} edges={["top"]}>
      <View style={tasksStyles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            tasksStyles.content,
            {
              paddingBottom: 100 + Math.max(insets.bottom, 8),
            },
          ]}
        >
          <View style={tasksStyles.header}>
            <View style={tasksStyles.headerCopy}>
              <Text style={tasksStyles.eyebrow}>TASKS</Text>
              <Text style={tasksStyles.title}>Your tasks</Text>
            </View>

            <View style={tasksStyles.headerActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Open calendar"
                onPress={() => router.push("/calendar")}
                style={({ pressed }) => [
                  tasksStyles.calendarButton,
                  pressed && tasksStyles.addButtonPressed,
                ]}
              >
                <Text style={tasksStyles.calendarButtonText}>▦</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  tasksStyles.addButton,
                  pressed && tasksStyles.addButtonPressed,
                ]}
                onPress={() => router.push("/create-task")}
                accessibilityRole="button"
                accessibilityLabel="Create task"
              >
                <Text style={tasksStyles.addButtonText}>+</Text>
              </Pressable>
            </View>
          </View>

          {!hasTasks ? (
            <View style={tasksStyles.emptyState}>
              <Text style={tasksStyles.emptyTitle}>No tasks yet</Text>

              <Text style={tasksStyles.emptyText}>
                Create your first task and let Task Library turn it into an
                actionable plan.
              </Text>

              <Pressable
                style={tasksStyles.emptyButton}
                onPress={() => router.push("/create-task")}
              >
                <Text style={tasksStyles.emptyButtonText}>Create Task</Text>
              </Pressable>
            </View>
          ) : (
            <>
              {activeTasks.length > 0 && (
                <View style={tasksStyles.section}>
                  <View style={tasksStyles.sectionHeader}>
                    <Text style={tasksStyles.sectionTitle}>In progress</Text>

                    <Text style={tasksStyles.sectionCount}>
                      {activeTasks.length}
                    </Text>
                  </View>

                  {activeTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onPress={() => openTask(task)}
                    />
                  ))}
                </View>
              )}

              {scheduledTasks.length > 0 && (
                <View style={tasksStyles.section}>
                  <View style={tasksStyles.sectionHeader}>
                    <Text style={tasksStyles.sectionTitle}>Scheduled</Text>

                    <Text style={tasksStyles.sectionCount}>
                      {scheduledTasks.length}
                    </Text>
                  </View>

                  {scheduledTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onPress={() => openTask(task)}
                      onStart={() => handleStartTask(task)}
                    />
                  ))}
                </View>
              )}

              {plannedTasks.length > 0 && (
                <View style={tasksStyles.section}>
                  <View style={tasksStyles.sectionHeader}>
                    <Text style={tasksStyles.sectionTitle}>
                      Needs scheduling
                    </Text>

                    <Text style={tasksStyles.sectionCount}>
                      {plannedTasks.length}
                    </Text>
                  </View>

                  {plannedTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onPress={() => openTask(task)}
                    />
                  ))}
                </View>
              )}

              {completedTasks.length > 0 && (
                <View style={tasksStyles.section}>
                  <View style={tasksStyles.sectionHeader}>
                    <Text style={tasksStyles.sectionTitle}>Completed</Text>

                    <Text style={tasksStyles.sectionCount}>
                      {completedTasks.length}
                    </Text>
                  </View>

                  {completedTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onPress={() => openTask(task)}
                    />
                  ))}
                </View>
              )}
            </>
          )}
        </ScrollView>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
}
