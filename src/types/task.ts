export type TaskStatus = "upcoming" | "in-progress" | "completed";

export type SubtaskStatus = "pending" | "in-progress" | "completed";

export type Subtask = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  deadline?: string;
  status: SubtaskStatus;
  completedAt?: string;
};

export type TaskPlan = {
  summary: string;
  generatedAt: string;
  subtasks: Subtask[];
};

export type Task = {
  id: string;

  // Original user input — the source of truth.
  title: string;
  description?: string;

  // Scheduling/application data.
  createdAt: string;
  scheduledDate: string;
  startTime: string;
  durationMinutes: number;

  status: TaskStatus;

  // AI-derived data.
  plan?: TaskPlan;

  completedAt?: string;
};
