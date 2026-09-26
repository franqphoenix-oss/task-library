export type TaskStatus = "upcoming" | "in-progress" | "completed";

export type Task = {
  id: string;
  title: string;
  description?: string;
  time: string;
  duration: string;
  status: TaskStatus;
};
