import type { Task } from "../types/task";

export const mockTasks: Task[] = [
  {
    id: "1",
    goal: "Finish React portfolio",
    deadline: "2026-09-30",
    priority: "high",
    availableTime: "60-120",
    createdAt: "2026-09-27T08:00:00.000Z",
    status: "in-progress",
  },
  {
    id: "2",
    goal: "Review JavaScript notes",
    deadline: "2026-09-29",
    priority: "medium",
    availableTime: "30-60",
    createdAt: "2026-09-27T08:00:00.000Z",
    status: "upcoming",
  },
  {
    id: "3",
    goal: "Push project updates",
    deadline: "2026-09-27",
    priority: "low",
    availableTime: "15-30",
    createdAt: "2026-09-27T08:00:00.000Z",
    status: "upcoming",
  },
];
