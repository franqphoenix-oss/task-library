import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTasks } from "../context/TaskContext";
import { generatedPlanStyles } from "../features/tasks/generated-plan.styles";

export default function GeneratedPlanScreen() {
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

  const { plan } = task;

  return (
    <SafeAreaView
      style={generatedPlanStyles.safeArea}
      edges={["top", "bottom"]}
    >
      <ScrollView
        contentContainerStyle={generatedPlanStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={generatedPlanStyles.header}>
          <Text style={generatedPlanStyles.eyebrow}>AI PLAN</Text>
          <Text style={generatedPlanStyles.title}>Your plan is ready</Text>
          <Text style={generatedPlanStyles.summary}>{plan.summary}</Text>
        </View>
        <View style={generatedPlanStyles.planCard}>
          {plan.subtasks.map((subtask, index) => (
            <View
              key={subtask.id}
              style={[
                generatedPlanStyles.step,
                index !== 0 && generatedPlanStyles.stepSpacing,
              ]}
            >
              <View style={generatedPlanStyles.stepNumber}>
                <Text style={generatedPlanStyles.stepNumberText}>
                  {index + 1}
                </Text>
              </View>

              <View style={generatedPlanStyles.stepContent}>
                <Text style={generatedPlanStyles.stepTitle}>
                  {subtask.title}
                </Text>

                <Text style={generatedPlanStyles.stepDescription}>
                  {subtask.description}
                </Text>

                <Text style={generatedPlanStyles.stepDuration}>
                  Estimated time: {subtask.durationMinutes} min
                </Text>
              </View>
            </View>
          ))}
        </View>
        <Pressable
          style={generatedPlanStyles.button}
          onPress={() => router.replace("/home")}
        >
          <Text style={generatedPlanStyles.buttonText}>Back to Home</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
