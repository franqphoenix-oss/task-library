import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Task } from "../types/task";

const TASKS_STORAGE_KEY = "task-library.tasks.v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTask(value: unknown): value is Task {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.goal === "string" &&
    typeof value.deadline === "string" &&
    typeof value.priority === "string" &&
    typeof value.availableTime === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.status === "string" &&
    typeof value.stage === "string"
  );
}

function normalizeTasks(value: unknown): Task[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isTask);
}

export async function loadTasks(): Promise<Task[]> {
  try {
    const storedValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    return normalizeTasks(parsedValue);
  } catch (error) {
    console.warn("Task Library: failed to load persisted tasks.", error);
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn("Task Library: failed to persist tasks.", error);
  }
}

export async function clearTasks(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
  } catch (error) {
    console.warn("Task Library: failed to clear persisted tasks.", error);
  }
}
