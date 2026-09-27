import type { GeneratedTaskPlan, Task, TaskPlan } from "../types/task";

export function createMockTaskPlan(task: Task): GeneratedTaskPlan {
  const context = task.description ? ` Focus: ${task.description}` : "";

  return {
    summary: `A practical step-by-step plan for “${task.title}”.${context}`,
    subtasks: [
      {
        title: "Define the outcome",
        description:
          "Clarify exactly what needs to be finished before starting the work.",
        durationMinutes: 10,
      },
      {
        title: "Break the work into actions",
        description:
          "Identify the smallest useful actions needed to complete the task.",
        durationMinutes: 15,
      },
      {
        title: "Complete the main work",
        description: `Work through the planned actions within the available ${task.durationMinutes} minutes.`,
        durationMinutes: task.durationMinutes,
      },
      {
        title: "Review and finish",
        description:
          "Check the result, fix anything missing, and mark the task complete.",
        durationMinutes: 10,
      },
    ],
  };
}

export function validateGeneratedTaskPlan(plan: GeneratedTaskPlan): boolean {
  if (!plan.summary.trim()) {
    return false;
  }

  if (plan.subtasks.length === 0 || plan.subtasks.length > 20) {
    return false;
  }

  return plan.subtasks.every(
    (subtask) =>
      subtask.title.trim().length > 0 &&
      subtask.description.trim().length > 0 &&
      Number.isFinite(subtask.durationMinutes) &&
      subtask.durationMinutes > 0 &&
      subtask.durationMinutes <= 24 * 60,
  );
}

export function normalizeTaskPlan(
  task: Task,
  generatedPlan: GeneratedTaskPlan,
): TaskPlan {
  const generatedAt = new Date().toISOString();

  return {
    summary: generatedPlan.summary.trim(),
    generatedAt,
    subtasks: generatedPlan.subtasks.map((subtask, index) => ({
      ...subtask,
      title: subtask.title.trim(),
      description: subtask.description.trim(),
      id: `${task.id}-${index + 1}`,
      status: "pending",
    })),
  };
}
