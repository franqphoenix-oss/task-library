import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { createNotificationMessage } from "../services/notificationRules";
import {
  cancelScheduledNotification,
  scheduleTaskReminder,
  sendTaskCompletedNotification,
} from "../services/notifications";

import { normalizeTaskPlan } from "../services/taskPlanner";
import { loadTasks, saveTasks } from "../services/taskRepository";
import type {
  GeneratedTaskPlan,
  ManualSubtaskInput,
  Subtask,
  Task,
  TaskInput,
  TaskPlan,
  TaskStage,
  TaskStatus,
} from "../types/task";
import { useNotifications } from "./NotificationContext";

import { useSettings } from "./SettingsContext";

type TaskContextValue = {
  tasks: Task[];

  isLoading: boolean;

  createTask: (input: TaskInput) => Task;

  createManualTask: (input: TaskInput, steps: ManualSubtaskInput[]) => Task;

  updateTask: (taskId: string, updates: Partial<Task>) => void;

  deleteTask: (taskId: string) => Promise<void>;

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

function updateTaskById(
  tasks: Task[],
  taskId: string,
  updater: (task: Task) => Task,
) {
  return tasks.map((task) => (task.id === taskId ? updater(task) : task));
}

function createManualPlan(task: Task, steps: ManualSubtaskInput[]): TaskPlan {
  return {
    summary:
      task.description?.trim() ||
      `A manual plan for completing "${task.goal}".`,
    generatedAt: new Date().toISOString(),
    subtasks: steps.map((step, index) => ({
      id: `${task.id}-${index + 1}`,
      title: step.title.trim(),
      description: step.description.trim(),
      durationMinutes: step.durationMinutes,
      status: "pending",
    })),
  };
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addNotification } = useNotifications();
  const { notificationsEnabled } = useSettings();

  /*
   * This prevents persistence from writing the initial empty state
   * before the stored tasks have finished loading.
   */
  const hasHydrated = useRef(false);

  /*
   * Non-rendering helpers can use this ref to access the latest state.
   * Rendered screens should read `tasks` directly.
   */
  const tasksRef = useRef(tasks);

  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  /*
   * Hydrate the task state once when the provider mounts.
   */
  useEffect(() => {
    let isMounted = true;

    async function hydrateTasks() {
      const persistedTasks = await loadTasks();

      if (!isMounted) {
        return;
      }

      setTasks(persistedTasks);
      hasHydrated.current = true;
      setIsLoading(false);
    }

    void hydrateTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  /*
   * Persist every state change after hydration has completed.
   *
   * This means all existing task mutations automatically become
   * persistent without putting storage logic inside each mutation.
   */
  useEffect(() => {
    if (!hasHydrated.current) {
      return;
    }

    void saveTasks(tasks);
  }, [tasks]);

  const createTask = useCallback((input: TaskInput) => {
    const task: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...input,
      createdAt: new Date().toISOString(),
      status: "upcoming",
      stage: "created",
    };

    setTasks((currentTasks) => [...currentTasks, task]);

    return task;
  }, []);

  const createManualTask = useCallback(
    (input: TaskInput, steps: ManualSubtaskInput[]) => {
      const task: Task = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        ...input,
        createdAt: new Date().toISOString(),
        status: "upcoming",
        stage: "planned",
      };

      task.plan = createManualPlan(task, steps);

      setTasks((currentTasks) => [...currentTasks, task]);

      return task;
    },
    [],
  );

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setTasks((currentTasks) =>
      updateTaskById(currentTasks, taskId, (task) => ({
        ...task,
        ...updates,
      })),
    );
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    const currentTask = tasksRef.current.find((task) => task.id === taskId);

    if (!currentTask) {
      return;
    }

    const remainingTasks = tasksRef.current.filter(
      (task) => task.id !== taskId,
    );

    tasksRef.current = remainingTasks;
    setTasks(remainingTasks);

    await Promise.all([
      cancelScheduledNotification(currentTask.scheduledNotificationId),
      saveTasks(remainingTasks),
    ]);
  }, []);

  const getTaskById = useCallback((taskId: string) => {
    return tasksRef.current.find((task) => task.id === taskId);
  }, []);

  const attachPlan = useCallback(
    (taskId: string, generatedPlan: GeneratedTaskPlan) => {
      setTasks((currentTasks) =>
        updateTaskById(currentTasks, taskId, (task) => ({
          ...task,
          plan: normalizeTaskPlan(task, generatedPlan),
          stage: "planned",
          status: "upcoming",
        })),
      );
    },
    [],
  );

  const setTaskStage = useCallback((taskId: string, stage: TaskStage) => {
    setTasks((currentTasks) =>
      updateTaskById(currentTasks, taskId, (task) => ({
        ...task,
        stage,
      })),
    );
  }, []);

  const setTaskStatus = useCallback((taskId: string, status: TaskStatus) => {
    setTasks((currentTasks) =>
      updateTaskById(currentTasks, taskId, (task) => ({
        ...task,
        status,
      })),
    );
  }, []);

  const scheduleTask = useCallback(
    (taskId: string, scheduledAt: string) => {
      const currentTask = tasksRef.current.find((task) => task.id === taskId);

      if (!currentTask) {
        return;
      }

      void cancelScheduledNotification(currentTask.scheduledNotificationId);

      const updatedTask: Task = {
        ...currentTask,
        scheduledAt,
        stage: "scheduled",
        status: "upcoming",
        scheduledNotificationId: undefined,
      };

      setTasks((currentTasks) =>
        updateTaskById(currentTasks, taskId, () => updatedTask),
      );

      if (!notificationsEnabled) {
        return;
      }

      void (async () => {
        const notificationId = await scheduleTaskReminder(updatedTask);

        if (notificationId) {
          setTasks((currentTasks) =>
            updateTaskById(currentTasks, taskId, (task) => ({
              ...task,
              scheduledNotificationId: notificationId,
            })),
          );
        }

        const notificationMessage = createNotificationMessage({
          type: "task-scheduled",
          task: updatedTask,
        });

        if (notificationMessage) {
          addNotification({
            ...notificationMessage,
            taskId,
            read: false,
          });
        }
      })();
    },
    [addNotification, notificationsEnabled],
  );

  const startTask = useCallback((taskId: string) => {
    const startedAt = new Date().toISOString();

    setTasks((currentTasks) =>
      updateTaskById(currentTasks, taskId, (task) => ({
        ...task,
        startedAt,
        stage: "active",
        status: "in-progress",
      })),
    );
  }, []);

  const updateSubtask = useCallback(
    (taskId: string, subtaskId: string, updates: Partial<Subtask>) => {
      setTasks((currentTasks) =>
        updateTaskById(currentTasks, taskId, (task) => {
          if (!task.plan) {
            return task;
          }

          return {
            ...task,
            plan: {
              ...task.plan,
              subtasks: task.plan.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? {
                      ...subtask,
                      ...updates,
                    }
                  : subtask,
              ),
            },
          };
        }),
      );
    },
    [],
  );

  const finishTask = useCallback(
    (task: Task) => {
      void cancelScheduledNotification(task.scheduledNotificationId);

      const completedTask: Task = {
        ...task,
        status: "completed",
        stage: "completed",
        completedAt: new Date().toISOString(),
        scheduledNotificationId: undefined,
      };

      setTasks((currentTasks) =>
        updateTaskById(currentTasks, task.id, () => completedTask),
      );

      if (notificationsEnabled) {
        const notificationMessage = createNotificationMessage({
          type: "task-completed",
          task: completedTask,
        });

        if (notificationMessage) {
          addNotification({
            ...notificationMessage,
            taskId: task.id,
            read: false,
          });
        }

        void sendTaskCompletedNotification(completedTask);
      }
    },
    [addNotification, notificationsEnabled],
  );

  const completeSubtask = useCallback(
    (taskId: string, subtaskId: string) => {
      const currentTask = tasksRef.current.find((task) => task.id === taskId);

      if (!currentTask?.plan || currentTask.status === "completed") {
        return;
      }

      const completedAt = new Date().toISOString();
      const subtasks = currentTask.plan.subtasks.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, status: "completed" as const, completedAt }
          : subtask,
      );
      const updatedTask: Task = {
        ...currentTask,
        plan: { ...currentTask.plan, subtasks },
      };
      const allCompleted =
        subtasks.length > 0 &&
        subtasks.every((subtask) => subtask.status === "completed");

      if (allCompleted) {
        finishTask(updatedTask);
        return;
      }

      setTasks((currentTasks) =>
        updateTaskById(currentTasks, taskId, () => ({
          ...updatedTask,
          status: "in-progress",
          stage: "active",
        })),
      );
    },
    [finishTask],
  );

  const completeTask = useCallback(
    (taskId: string) => {
      const currentTask = tasksRef.current.find((task) => task.id === taskId);

      if (!currentTask) {
        return;
      }

      finishTask(currentTask);
    },
    [finishTask],
  );

  const value = useMemo<TaskContextValue>(
    () => ({
      tasks,
      isLoading,
      createTask,
      createManualTask,
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
      isLoading,
      createTask,
      createManualTask,
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
