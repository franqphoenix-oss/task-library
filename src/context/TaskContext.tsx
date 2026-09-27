import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { mockTasks } from "../data/mockTasks";
import type {
  GeneratedTaskPlan,
  Subtask,
  Task,
  TaskInput,
} from "../types/task";

import { normalizeTaskPlan } from "@/services/taskPlanner";

type TaskContextValue = {
  tasks: Task[];
  createTask: (input: TaskInput) => Task;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  getTaskById: (taskId: string) => Task | undefined;
  attachPlan: (taskId: string, generatedPlan: GeneratedTaskPlan) => void;
  updateSubtask: (
    taskId: string,
    subtaskId: string,
    updates: Partial<Subtask>,
  ) => void;
  completeTask: (taskId: string) => void;
};

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const createTask = useCallback((input: TaskInput) => {
    const task: Task = {
      id: Date.now().toString(),
      ...input,
      createdAt: new Date().toISOString(),
      status: "upcoming",
    };

    setTasks((currentTasks) => [...currentTasks, task]);

    return task;
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task,
      ),
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }, []);

  const getTaskById = useCallback(
    (taskId: string) => tasks.find((task) => task.id === taskId),
    [tasks],
  );

  const attachPlan = useCallback(
    (taskId: string, generatedPlan: GeneratedTaskPlan) => {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                plan: normalizeTaskPlan(task, generatedPlan),
              }
            : task,
        ),
      );
    },
    [],
  );

  const updateSubtask = useCallback(
    (taskId: string, subtaskId: string, updates: Partial<Subtask>) => {
      setTasks((currentTasks) =>
        currentTasks.map((task) => {
          if (task.id !== taskId || !task.plan) {
            return task;
          }

          return {
            ...task,
            plan: {
              ...task.plan,
              subtasks: task.plan.subtasks.map((subtask) =>
                subtask.id === subtaskId ? { ...subtask, ...updates } : subtask,
              ),
            },
          };
        }),
      );
    },
    [],
  );

  const completeTask = useCallback((taskId: string) => {
    const completedAt = new Date().toISOString();

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "completed",
              completedAt,
            }
          : task,
      ),
    );
  }, []);

  const value = useMemo<TaskContextValue>(
    () => ({
      tasks,
      createTask,
      updateTask,
      deleteTask,
      getTaskById,
      attachPlan,
      updateSubtask,
      completeTask,
    }),
    [
      tasks,
      createTask,
      updateTask,
      deleteTask,
      getTaskById,
      attachPlan,
      updateSubtask,
      completeTask,
    ],
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
