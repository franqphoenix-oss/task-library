import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

import type { Task } from "../types/task";

export const TASK_NOTIFICATION_CHANNEL = "task-library-tasks";

function warnNotificationFailure(operation: string, error: unknown) {
  if (__DEV__) {
    console.warn(`Notification ${operation} failed.`, error);
  }
}

export async function configureNotifications() {
  if (Platform.OS !== "android") {
    return;
  }

  try {
    await Notifications.setNotificationChannelAsync(TASK_NOTIFICATION_CHANNEL, {
      name: "Task reminders",
      description: "Reminders and updates from Task Library.",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#6366F1",
    });
  } catch (error) {
    warnNotificationFailure("channel setup", error);
  }
}

export async function requestNotificationPermission() {
  if (Platform.OS === "web") {
    return true;
  }

  try {
    const currentPermissions = await Notifications.getPermissionsAsync();

    if (currentPermissions.granted) {
      return true;
    }

    const requestedPermissions = await Notifications.requestPermissionsAsync();

    return requestedPermissions.granted;
  } catch (error) {
    warnNotificationFailure("permission request", error);
    return false;
  }
}

export async function initializeNotifications() {
  await configureNotifications();

  return requestNotificationPermission();
}

export async function sendImmediateNotification(
  title: string,
  body: string,
  data: Record<string, unknown> = {},
) {
  if (Platform.OS === "web") {
    return null;
  }

  const granted = await requestNotificationPermission();

  if (!granted) {
    return null;
  }

  try {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: "default",
      },
      trigger: null,
    });
  } catch (error) {
    warnNotificationFailure("immediate delivery", error);
    return null;
  }
}

export async function scheduleTaskReminder(task: Task) {
  if (Platform.OS === "web") {
    return null;
  }

  if (!task.scheduledAt) {
    return null;
  }

  const scheduledDate = new Date(task.scheduledAt);

  if (Number.isNaN(scheduledDate.getTime())) {
    return null;
  }

  if (scheduledDate.getTime() <= Date.now()) {
    return null;
  }

  const granted = await requestNotificationPermission();

  if (!granted) {
    return null;
  }

  try {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: "Task reminder",
        body: `${task.goal} is starting soon.`,
        data: {
          type: "task-reminder",
          taskId: task.id,
        },
        sound: "default",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: scheduledDate,
        channelId: TASK_NOTIFICATION_CHANNEL,
      },
    });
  } catch (error) {
    warnNotificationFailure("task reminder scheduling", error);
    return null;
  }
}

export async function scheduleDeadlineReminder(task: Task) {
  if (Platform.OS === "web") {
    return null;
  }

  if (!task.deadline) {
    return null;
  }

  const deadline = new Date(task.deadline);

  if (Number.isNaN(deadline.getTime())) {
    return null;
  }

  if (deadline.getTime() <= Date.now()) {
    return null;
  }

  const granted = await requestNotificationPermission();

  if (!granted) {
    return null;
  }

  try {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: "Deadline approaching",
        body: `${task.goal} is approaching its deadline.`,
        data: {
          type: "deadline",
          taskId: task.id,
        },
        sound: "default",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: deadline,
        channelId: TASK_NOTIFICATION_CHANNEL,
      },
    });
  } catch (error) {
    warnNotificationFailure("deadline reminder scheduling", error);
    return null;
  }
}

export async function sendTaskCompletedNotification(task: Task) {
  return sendImmediateNotification(
    "Task completed",
    `You completed "${task.goal}".`,
    {
      type: "task-completed",
      taskId: task.id,
    },
  );
}

export async function cancelScheduledNotification(notificationId?: string) {
  if (Platform.OS === "web" || !notificationId) {
    return;
  }

  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    warnNotificationFailure("scheduled cancellation", error);
  }
}

export async function cancelAllTaskNotifications() {
  if (Platform.OS === "web") {
    return;
  }

  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    warnNotificationFailure("cancellation", error);
  }
}

export async function sendTestNotification() {
  return sendImmediateNotification(
    "Task Library",
    "Notifications are working on your Android device.",
    {
      type: "test",
    },
  );
}
