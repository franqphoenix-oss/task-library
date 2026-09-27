import type { GeneratedTaskPlan, Task, TaskPlan } from "../types/task";

const AVAILABLE_TIME_LABELS = {
  "15-30": "15–30 minutes",
  "30-60": "30–60 minutes",
  "60-120": "1–2 hours",
  "120-240": "2–4 hours",
  "240+": "4+ hours",
} as const;

export function createMockTaskPlan(task: Task): GeneratedTaskPlan {
  const availableTime = AVAILABLE_TIME_LABELS[task.availableTime];

  return {
    summary: `A practical step-by-step plan for “${task.goal}”, designed around your ${availableTime} availability and ${task.priority} priority.`,
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
        description:
          "Work through the main actions while staying within your available time.",
        durationMinutes: 30,
      },
      {
        title: "Review and finish",
        description:
          "Check the result, fix anything missing, and prepare the task for completion.",
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
