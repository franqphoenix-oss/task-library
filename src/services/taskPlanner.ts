import type { Task } from "../types/task";
import type { TaskPlan } from "../types/task-plan";

export function createMockTaskPlan(task: Task): TaskPlan {
  const context = task.description ? ` Focus: ${task.description}` : "";

  return {
    taskId: task.id,
    summary: `A practical step-by-step plan for “${task.title}”.${context}`,
    steps: [
      {
        id: `${task.id}-1`,
        title: "Define the outcome",
        description:
          "Clarify exactly what needs to be finished before starting the work.",
        duration: "10 min",
      },
      {
        id: `${task.id}-2`,
        title: "Break the work into actions",
        description:
          "Identify the smallest useful actions needed to complete the task.",
        duration: "15 min",
      },
      {
        id: `${task.id}-3`,
        title: "Complete the main work",
        description: `Work through the planned actions within the available ${task.duration}.`,
        duration: task.duration,
      },
      {
        id: `${task.id}-4`,
        title: "Review and finish",
        description:
          "Check the result, fix anything missing, and mark the task complete.",
        duration: "10 min",
      },
    ],
  };
}
