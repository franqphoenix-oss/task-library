import type { Task } from "../types/task";

export const mockTasks: Task[] = [
  {
    id: "1",
    goal: "Finish React portfolio",
    deadline: "2026-09-30",
    priority: "high",
    availableTime: "60-120",
    createdAt: "2026-09-26T09:00:00.000Z",
    status: "in-progress",
    stage: "active",

    plan: {
      summary:
        "Finish the React portfolio through focused implementation and review steps.",
      generatedAt: "2026-09-26T09:05:00.000Z",
      subtasks: [
        {
          id: "1-1",
          title: "Review the current portfolio",
          description:
            "Check the existing pages and identify the remaining work.",
          durationMinutes: 20,
          status: "completed",
          completedAt: "2026-09-26T10:00:00.000Z",
        },
        {
          id: "1-2",
          title: "Complete the remaining sections",
          description:
            "Implement the remaining portfolio sections and connect their content.",
          durationMinutes: 45,
          status: "in-progress",
        },
        {
          id: "1-3",
          title: "Test the responsive layout",
          description:
            "Check the portfolio at different screen sizes and fix layout issues.",
          durationMinutes: 30,
          status: "pending",
        },
      ],
    },
  },

  {
    id: "2",
    goal: "Study JavaScript fundamentals",
    deadline: "2026-10-02",
    priority: "medium",
    availableTime: "30-60",
    createdAt: "2026-09-27T12:00:00.000Z",
    status: "upcoming",
    stage: "scheduled",
    scheduledAt: "2026-09-29T16:00:00.000Z",
  },

  {
    id: "3",
    goal: "Plan next week's school work",
    deadline: "2026-10-04",
    priority: "low",
    availableTime: "15-30",
    createdAt: "2026-09-27T18:00:00.000Z",
    status: "upcoming",
    stage: "planned",
  },
];
