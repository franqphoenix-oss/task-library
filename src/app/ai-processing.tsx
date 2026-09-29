import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTasks } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";
import { createAiProcessingStyles } from "../features/tasks/ai-processing.styles";

import {
  createMockTaskPlan,
  validateGeneratedTaskPlan,
} from "../services/taskPlanner";

export default function AiProcessingScreen() {
  const { colors } = useTheme();
  const aiProcessingStyles = useMemo(
    () => createAiProcessingStyles(colors),
    [colors],
  );
  const { taskId } = useLocalSearchParams<{ taskId: string }>();

  const { getTaskById, attachPlan, setTaskStage } = useTasks();

  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!taskId) {
      router.replace("/home");
      return;
    }

    if (hasStartedRef.current) {
      return;
    }

    const task = getTaskById(taskId);

    if (!task) {
      router.replace("/home");
      return;
    }

    hasStartedRef.current = true;

    setTaskStage(task.id, "planning");

    const timeout = setTimeout(() => {
      const generatedPlan = createMockTaskPlan(task);

      if (!validateGeneratedTaskPlan(generatedPlan)) {
        setTaskStage(task.id, "created");
        router.replace("/home");
        return;
      }

      attachPlan(task.id, generatedPlan);

      router.replace({
        pathname: "/generated-plan",
        params: {
          taskId: task.id,
        },
      });
    }, 1400);

    return () => clearTimeout(timeout);
  }, [attachPlan, getTaskById, setTaskStage, taskId]);

  return (
    <SafeAreaView style={aiProcessingStyles.safeArea}>
      <View style={aiProcessingStyles.screen}>
        <View style={aiProcessingStyles.indicator}>
          <View style={aiProcessingStyles.indicatorDot} />
        </View>

        <Text style={aiProcessingStyles.title}>Building your plan</Text>

        <Text style={aiProcessingStyles.subtitle}>
          Task Library is breaking your task into practical steps.
        </Text>
      </View>
    </SafeAreaView>
  );
}
