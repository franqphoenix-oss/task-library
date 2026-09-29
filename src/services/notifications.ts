import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

import type { Task } from "../types/task";

export const TASK_NOTIFICATION_CHANNEL = "task-library-tasks";

export async function configureNotifications() {
  if (Platform.OS !== "android") {
    return;
  }

  await Notifications.setNotificationChannelAsync(TASK_NOTIFICATION_CHANNEL, {
    name: "Task reminders",
    description: "Reminders and updates from Task Library.",
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#6366F1",
  });
}

export async function requestNotificationPermission() {
  const currentPermissions = await Notifications.getPermissionsAsync();

  if (currentPermissions.granted) {
    return true;
  }

  const requestedPermissions = await Notifications.requestPermissionsAsync();

  return requestedPermissions.granted;
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
  const granted = await requestNotificationPermission();

  if (!granted) {
    return null;
  }

  return Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: "default",
    },
    trigger: null,
  });
}

export async function scheduleTaskReminder(task: Task) {
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

  return Notifications.scheduleNotificationAsync({
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
}

export async function scheduleDeadlineReminder(task: Task) {
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

  return Notifications.scheduleNotificationAsync({
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
  if (!notificationId) {
    return;
  }

  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

export async function cancelAllTaskNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
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
