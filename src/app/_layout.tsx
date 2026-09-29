import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NotificationProvider } from "@/context/NotificationContext";
import { SettingsProvider, useSettings } from "@/context/SettingsContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { TaskProvider } from "../context/TaskContext";
import {
  cancelAllTaskNotifications,
  getNotificationsModule,
  initializeNotifications,
} from "../services/notifications";

function NotificationBootstrap() {
  const { isLoading, notificationsEnabled } = useSettings();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!notificationsEnabled) {
      void cancelAllTaskNotifications();
      return;
    }

    void initializeNotifications();
  }, [isLoading, notificationsEnabled]);

  useEffect(() => {
    let isMounted = true;
    let notificationResponseListener: { remove: () => void } | undefined;

    void getNotificationsModule().then(async (Notifications) => {
      if (!Notifications || !isMounted) {
        return;
      }

      notificationResponseListener =
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

      const lastResponse =
        await Notifications.getLastNotificationResponseAsync();

      if (!lastResponse || !isMounted) {
        return;
      }

      const data = lastResponse.notification.request.content.data as {
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
      isMounted = false;
      notificationResponseListener?.remove();
    };
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <ThemeProvider>
          <NotificationProvider>
            <TaskProvider>
              <NotificationBootstrap />
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
