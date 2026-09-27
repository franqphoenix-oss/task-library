export type TaskStatus = "upcoming" | "in-progress" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export type AvailableTime = "15-30" | "30-60" | "60-120" | "120-240" | "240+";

export type TaskInput = {
  goal: string;
  deadline: string;
  priority: TaskPriority;
  availableTime: AvailableTime;
};

export type GeneratedSubtask = {
  title: string;
  description: string;
  durationMinutes: number;
  deadline?: string;
};

export type GeneratedTaskPlan = {
  summary: string;
  subtasks: GeneratedSubtask[];
};

export type SubtaskStatus = "pending" | "in-progress" | "completed";

export type Subtask = GeneratedSubtask & {
  id: string;
  status: SubtaskStatus;
  completedAt?: string;
};

export type TaskPlan = {
  summary: string;
  generatedAt: string;
  subtasks: Subtask[];
};

export type Task = TaskInput & {
  id: string;
  createdAt: string;
  status: TaskStatus;
  plan?: TaskPlan;
  completedAt?: string;
};
