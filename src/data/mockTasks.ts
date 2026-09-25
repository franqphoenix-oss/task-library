export type TaskStatus = "upcoming" | "in-progress" | "completed";

export type Task = {
  id: string;
  title: string;
  description?: string;
  time: string;
  duration: string;
  status: TaskStatus;
};

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Finish React portfolio",
    description: "Complete the remaining sections of the portfolio.",
    time: "10:00 AM",
    duration: "1h 30m",
    status: "in-progress",
  },
  {
    id: "2",
    title: "Review JavaScript notes",
    description: "Go through the remaining concepts from today's lesson.",
    time: "1:00 PM",
    duration: "45m",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Push project updates",
    description: "Commit and push today's completed work.",
    time: "3:30 PM",
    duration: "20m",
    status: "upcoming",
  },
];
