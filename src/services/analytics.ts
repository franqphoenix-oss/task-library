import type { Task } from "../types/task";

export type AnalyticsPeriod = "month" | "all";

export type AnalyticsSummary = {
  completedCount: number;
  completionRate: number;
  previousCompletedCount: number;
  previousCompletionRate: number;
  completedDelta: number;
  completionRateDelta: number;
  totalTasks: number;
};

export type ProductivityPoint = {
  label: string;
  completed: number;
};

function startOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfNextMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

function startOfPreviousMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

function isCompletedInRange(task: Task, start: Date, end: Date): boolean {
  if (!task.completedAt) {
    return false;
  }

  const completedAt = new Date(task.completedAt);

  return completedAt >= start && completedAt < end;
}

function getCompletionRate(completed: number, total: number) {
  if (total === 0) {
    return 0;
  }

  return Math.round((completed / total) * 100);
}

export function getAnalyticsSummary(
  tasks: Task[],
  period: AnalyticsPeriod,
  now = new Date(),
): AnalyticsSummary {
  if (period === "all") {
    const completedCount = tasks.filter(
      (task) => task.status === "completed",
    ).length;

    const totalTasks = tasks.length;

    return {
      completedCount,
      completionRate: getCompletionRate(completedCount, totalTasks),
      previousCompletedCount: 0,
      previousCompletionRate: 0,
      completedDelta: 0,
      completionRateDelta: 0,
      totalTasks,
    };
  }

  const currentStart = startOfMonth(now);
  const currentEnd = startOfNextMonth(now);
  const previousStart = startOfPreviousMonth(now);

  const completedCount = tasks.filter((task) =>
    isCompletedInRange(task, currentStart, currentEnd),
  ).length;

  const previousCompletedCount = tasks.filter((task) =>
    isCompletedInRange(task, previousStart, currentStart),
  ).length;

  const currentTasks = tasks.filter((task) => {
    const createdAt = new Date(task.createdAt);

    return createdAt >= currentStart && createdAt < currentEnd;
  });

  const previousTasks = tasks.filter((task) => {
    const createdAt = new Date(task.createdAt);

    return createdAt >= previousStart && createdAt < currentStart;
  });

  const completionRate = getCompletionRate(completedCount, currentTasks.length);

  const previousCompletionRate = getCompletionRate(
    previousCompletedCount,
    previousTasks.length,
  );

  return {
    completedCount,
    completionRate,
    previousCompletedCount,
    previousCompletionRate,
    completedDelta: completedCount - previousCompletedCount,
    completionRateDelta: completionRate - previousCompletionRate,
    totalTasks: currentTasks.length,
  };
}

export function getProductivityTrend(
  tasks: Task[],
  now = new Date(),
): ProductivityPoint[] {
  const today = startOfDay(now);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));

    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    const completed = tasks.filter((task) =>
      isCompletedInRange(task, date, nextDate),
    ).length;

    return {
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      completed,
    };
  });
}

export function getProductivityInsight(
  tasks: Task[],
  now = new Date(),
): string {
  const completedTasks = tasks.filter(
    (task) => task.status === "completed" && task.completedAt,
  );

  if (completedTasks.length === 0) {
    return "Complete your first task to start building your productivity insights.";
  }

  const morningTasks = completedTasks.filter((task) => {
    const hour = new Date(task.completedAt!).getHours();

    return hour < 14;
  });

  const afternoonTasks = completedTasks.filter((task) => {
    const hour = new Date(task.completedAt!).getHours();

    return hour >= 14;
  });

  if (morningTasks.length > afternoonTasks.length && morningTasks.length >= 2) {
    return "You complete tasks more consistently earlier in the day.";
  }

  if (
    afternoonTasks.length > morningTasks.length &&
    afternoonTasks.length >= 2
  ) {
    return "You tend to complete more tasks later in the day.";
  }

  const recentStart = startOfDay(now);
  recentStart.setDate(recentStart.getDate() - 6);

  const recentCompletions = completedTasks.filter(
    (task) => new Date(task.completedAt!) >= recentStart,
  ).length;

  if (recentCompletions >= 3) {
    return "You've been consistently completing tasks this week. Keep the momentum going.";
  }

  return "Breaking larger goals into smaller scheduled steps can help you maintain consistency.";
}
