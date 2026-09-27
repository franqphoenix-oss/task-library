import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { mockTasks } from "../data/mockTasks";
import type { Task } from "../types/task";
import type { TaskPlan } from "../types/task-plan";

type TaskContextValue = {
  tasks: Task[];
  activePlan: TaskPlan | null;
  addTask: (task: Task) => void;
  getTaskById: (taskId: string) => Task | undefined;
  setActivePlan: (plan: TaskPlan) => void;
};

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activePlan, setActivePlan] = useState<TaskPlan | null>(null);

  const addTask = useCallback((task: Task) => {
    setTasks((currentTasks) => [...currentTasks, task]);
  }, []);

  const getTaskById = useCallback(
    (taskId: string) => tasks.find((task) => task.id === taskId),
    [tasks],
  );

  const value = useMemo<TaskContextValue>(
    () => ({
      tasks,
      activePlan,
      addTask,
      getTaskById,
      setActivePlan,
    }),
    [tasks, activePlan, addTask, getTaskById],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside a TaskProvider");
  }

  return context;
}
