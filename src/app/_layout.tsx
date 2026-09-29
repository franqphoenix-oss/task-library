import * as Notifications from "expo-notifications";
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NotificationProvider } from "@/context/NotificationContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { TaskProvider } from "../context/TaskContext";
import "../services/notificationHandler";
import { initializeNotifications } from "../services/notifications";

export default function RootLayout() {
  useEffect(() => {
    void initializeNotifications();

    const notificationResponseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data as {
          taskId?: string;
        };

        if (!data.taskId) {
          return;
        }

        router.push({
          pathname: "/task-details",
          params: {
            taskId: data.taskId,
          },
        });
      });

    return () => {
      notificationResponseListener.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <ThemeProvider>
          <NotificationProvider>
            <TaskProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </TaskProvider>
          </NotificationProvider>
        </ThemeProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
