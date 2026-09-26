import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TaskProvider } from "../context/TaskContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#050B14",
            },
          }}
        />
      </TaskProvider>
    </SafeAreaProvider>
  );
}
