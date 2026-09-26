import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { mockTasks } from "../data/mockTasks";
import type { Task } from "../types/task";

type TaskContextValue = {
  tasks: Task[];
};

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks] = useState<Task[]>(mockTasks);

  const value = useMemo<TaskContextValue>(
    () => ({
      tasks,
    }),
    [tasks],
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
