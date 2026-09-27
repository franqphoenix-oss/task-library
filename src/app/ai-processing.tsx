import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTasks } from "../context/TaskContext";
import { aiProcessingStyles } from "../features/tasks/ai-processing.styles";

export default function AiProcessingScreen() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const { getTaskById, attachPlan } = useTasks();

  useEffect(() => {
    if (!taskId) {
      router.replace("/home");
      return;
    }

    const task = getTaskById(taskId);

    if (!task) {
      router.replace("/home");
      return;
    }

    const timeout = setTimeout(() => {
      const plan = createMockTaskPlan(task);

      attachPlan(task.id, plan);

      router.replace({
        pathname: "/generated-plan",
        params: {
          taskId: task.id,
        },
      });
    }, 1400);

    return () => clearTimeout(timeout);
  }, [attachPlan, getTaskById, taskId]);

  return (
    <SafeAreaView style={aiProcessingStyles.safeArea}>
      {" "}
      <View style={aiProcessingStyles.screen}>
        {" "}
        <View style={aiProcessingStyles.indicator}>
          {" "}
          <View style={aiProcessingStyles.indicatorDot} />{" "}
        </View>
        <Text style={aiProcessingStyles.title}>Building your plan</Text>
        <Text style={aiProcessingStyles.subtitle}>
          Task Library is breaking your task into practical steps.
        </Text>
      </View>
    </SafeAreaView>
  );
}
