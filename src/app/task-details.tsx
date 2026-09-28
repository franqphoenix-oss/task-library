import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTasks } from "../context/TaskContext";
import { taskDetailsStyles } from "../features/tasks/task-details.styles";

export default function TaskDetailsScreen() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const { getTaskById } = useTasks();

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

  return (
    <SafeAreaView style={taskDetailsStyles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={taskDetailsStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={taskDetailsStyles.header}>
          <Pressable
            style={taskDetailsStyles.backButton}
            onPress={() => router.back()}
          >
            <Text style={taskDetailsStyles.backText}>‹</Text>
          </Pressable>

          <View style={taskDetailsStyles.headerCopy}>
            <Text style={taskDetailsStyles.eyebrow}>TASK DETAILS</Text>
            <Text style={taskDetailsStyles.title}>{task.goal}</Text>
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

        <View style={taskDetailsStyles.section}>
          <Text style={taskDetailsStyles.sectionTitle}>AI summary</Text>

          <View style={taskDetailsStyles.summaryCard}>
            <Text style={taskDetailsStyles.summary}>{task.plan.summary}</Text>
          </View>
        </View>

        <View style={taskDetailsStyles.section}>
          <Text style={taskDetailsStyles.sectionTitle}>
            Steps ({task.plan.subtasks.length})
          </Text>

          <View style={taskDetailsStyles.stepsCard}>
            {task.plan.subtasks.map((subtask, index) => (
              <View
                key={subtask.id}
                style={[
                  taskDetailsStyles.step,
                  index !== 0 && taskDetailsStyles.stepSpacing,
                ]}
              >
                <View style={taskDetailsStyles.stepNumber}>
                  <Text style={taskDetailsStyles.stepNumberText}>
                    {index + 1}
                  </Text>
                </View>

                <View style={taskDetailsStyles.stepContent}>
                  <Text style={taskDetailsStyles.stepTitle}>
                    {subtask.title}
                  </Text>

                  <Text style={taskDetailsStyles.stepDescription}>
                    {subtask.description}
                  </Text>

                  <Text style={taskDetailsStyles.duration}>
                    {subtask.durationMinutes} min
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Pressable
          style={taskDetailsStyles.scheduleButton}
          onPress={() =>
            router.push({
              pathname: "/schedule-task",
              params: { taskId: task.id },
            })
          }
        >
          <Text style={taskDetailsStyles.scheduleButtonText}>
            Schedule Task
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
