import type { Task } from "../types/task";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Finish React portfolio",
    description: "Complete the remaining sections of the portfolio.",
    createdAt: "2026-09-27T08:00:00.000Z",
    scheduledDate: "2026-09-27",
    startTime: "10:00",
    durationMinutes: 90,
    status: "in-progress",
  },
  {
    id: "2",
    title: "Review JavaScript notes",
    description: "Go through the remaining concepts from today's lesson.",
    createdAt: "2026-09-27T08:00:00.000Z",
    scheduledDate: "2026-09-27",
    startTime: "13:00",
    durationMinutes: 45,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Push project updates",
    description: "Commit and push today's completed work.",
    createdAt: "2026-09-27T08:00:00.000Z",
    scheduledDate: "2026-09-27",
    startTime: "15:30",
    durationMinutes: 20,
    status: "upcoming",
  },
];
