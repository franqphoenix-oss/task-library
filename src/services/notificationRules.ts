import type { Task } from "../types/task";

export type TaskNotificationEvent =
  | {
      type: "task-scheduled";
      task: Task;
    }
  | {
      type: "task-completed";
      task: Task;
    }
  | {
      type: "task-deleted";
      task: Task;
    };

export function createNotificationMessage(event: TaskNotificationEvent) {
  switch (event.type) {
    case "task-scheduled":
      return {
        type: "task-reminder" as const,
        title: "Task scheduled",
        body: `"${event.task.goal}" has been scheduled.`,
      };

    case "task-completed":
      return {
        type: "task-completed" as const,
        title: "Task completed",
        body: `You completed "${event.task.goal}".`,
      };

    case "task-deleted":
      return null;

    default:
      return null;
  }
}
