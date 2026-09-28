import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { mockTasks } from "../data/mockTasks";
import type {
  GeneratedTaskPlan,
  Subtask,
  Task,
  TaskInput,
  TaskStage,
  TaskStatus,
} from "../types/task";

import { normalizeTaskPlan } from "@/services/taskPlanner";

type TaskContextValue = {
  tasks: Task[];

  createTask: (input: TaskInput) => Task;

  updateTask: (taskId: string, updates: Partial<Task>) => void;

  deleteTask: (taskId: string) => void;

  getTaskById: (taskId: string) => Task | undefined;

  attachPlan: (taskId: string, generatedPlan: GeneratedTaskPlan) => void;

  setTaskStage: (taskId: string, stage: TaskStage) => void;

  setTaskStatus: (taskId: string, status: TaskStatus) => void;

  scheduleTask: (taskId: string, scheduledAt: string) => void;

  startTask: (taskId: string) => void;

  updateSubtask: (
    taskId: string,
    subtaskId: string,
    updates: Partial<Subtask>,
  ) => void;

  completeSubtask: (taskId: string, subtaskId: string) => void;

  completeTask: (taskId: string) => void;
};

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(
    mockTasks.map((task) => ({
      ...task,
      stage: task.stage ?? "created",
    })),
  );

  const tasksRef = useRef(tasks);

  tasksRef.current = tasks;

  const createTask = useCallback((input: TaskInput) => {
    const task: Task = {
      id: Date.now().toString(),
      ...input,
      createdAt: new Date().toISOString(),
      status: "upcoming",
      stage: "created",
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

  const getTaskById = useCallback((taskId: string) => {
    return tasksRef.current.find((task) => task.id === taskId);
  }, []);

  const attachPlan = useCallback(
    (taskId: string, generatedPlan: GeneratedTaskPlan) => {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                plan: normalizeTaskPlan(task, generatedPlan),
                stage: "planned",
                status: "upcoming",
              }
            : task,
        ),
      );
    },
    [],
  );

  const setTaskStage = useCallback((taskId: string, stage: TaskStage) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              stage,
            }
          : task,
      ),
    );
  }, []);

  const setTaskStatus = useCallback((taskId: string, status: TaskStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
            }
          : task,
      ),
    );
  }, []);

  const scheduleTask = useCallback((taskId: string, scheduledAt: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              scheduledAt,
              stage: "scheduled",
              status: "upcoming",
            }
          : task,
      ),
    );
  }, []);

  const startTask = useCallback((taskId: string) => {
    const startedAt = new Date().toISOString();

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              startedAt,
              stage: "active",
              status: "in-progress",
            }
          : task,
      ),
    );
  }, []);

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

  const completeSubtask = useCallback((taskId: string, subtaskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId || !task.plan) {
          return task;
        }

        const completedAt = new Date().toISOString();

        const subtasks = task.plan.subtasks.map((subtask) =>
          subtask.id === subtaskId
            ? {
                ...subtask,
                status: "completed" as const,
                completedAt,
              }
            : subtask,
        );

        const allCompleted =
          subtasks.length > 0 &&
          subtasks.every((subtask) => subtask.status === "completed");

        return {
          ...task,
          plan: {
            ...task.plan,
            subtasks,
          },
          ...(allCompleted
            ? {
                status: "completed" as const,
                stage: "completed" as const,
                completedAt,
              }
            : {
                status: "in-progress" as const,
                stage: "active" as const,
              }),
        };
      }),
    );
  }, []);

  const completeTask = useCallback((taskId: string) => {
    const completedAt = new Date().toISOString();

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "completed",
              stage: "completed",
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
      setTaskStage,
      setTaskStatus,
      scheduleTask,
      startTask,
      updateSubtask,
      completeSubtask,
      completeTask,
    }),
    [
      tasks,
      createTask,
      updateTask,
      deleteTask,
      getTaskById,
      attachPlan,
      setTaskStage,
      setTaskStatus,
      scheduleTask,
      startTask,
      updateSubtask,
      completeSubtask,
      completeTask,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }

  return context;
}
