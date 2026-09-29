import AsyncStorage from "@react-native-async-storage/async-storage";

import type { NotificationItem } from "../types/notification";

const NOTIFICATIONS_STORAGE_KEY = "task-library.notifications.v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNotification(value: unknown): value is NotificationItem {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.type === "string" &&
    typeof value.title === "string" &&
    typeof value.body === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.read === "boolean"
  );
}

export async function loadNotifications(): Promise<NotificationItem[]> {
  try {
    const storedValue = await AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isNotification);
  } catch (error) {
    console.warn(
      "Task Library: failed to load persisted notifications.",
      error,
    );

    return [];
  }
}

export async function saveNotifications(
  notifications: NotificationItem[],
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify(notifications),
    );
  } catch (error) {
    console.warn("Task Library: failed to persist notifications.", error);
  }
}
