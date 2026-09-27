import type { Task, TaskPlan } from "../types/task";

export function createMockTaskPlan(task: Task): TaskPlan {
  const context = task.description ? ` Focus: ${task.description}` : "";

  return {
    generatedAt: new Date().toISOString(),
    summary: `A practical step-by-step plan for “${task.title}”.${context}`,
    subtasks: [
      {
        id: `${task.id}-1`,
        title: "Define the outcome",
        description:
          "Clarify exactly what needs to be finished before starting the work.",
        durationMinutes: 10,
        status: "pending",
      },
      {
        id: `${task.id}-2`,
        title: "Break the work into actions",
        description:
          "Identify the smallest useful actions needed to complete the task.",
        durationMinutes: 15,
        status: "pending",
      },
      {
        id: `${task.id}-3`,
        title: "Complete the main work",
        description: `Work through the planned actions within the available ${task.durationMinutes} minutes.`,
        durationMinutes: task.durationMinutes,
        status: "pending",
      },
      {
        id: `${task.id}-4`,
        title: "Review and finish",
        description:
          "Check the result, fix anything missing, and mark the task complete.",
        durationMinutes: 10,
        status: "pending",
      },
    ],
  };
}
