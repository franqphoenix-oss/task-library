export type TaskStep = {
  id: string;
  title: string;
  description: string;
  duration: string;
};

export type TaskPlan = {
  taskId: string;
  summary: string;
  steps: TaskStep[];
};
