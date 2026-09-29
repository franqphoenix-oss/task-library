import type { Task } from "../types/task";

export const SCHEDULE_TIME_OPTIONS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
] as const;

export type ScheduleTime = (typeof SCHEDULE_TIME_OPTIONS)[number];

export function startOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function addDays(date: Date, amount: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return startOfDay(result);
}

export function getWeekDates(date: Date) {
  const currentDate = startOfDay(date);
  const mondayOffset = (currentDate.getDay() + 6) % 7;

  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const weekDate = new Date(monday);
    weekDate.setDate(monday.getDate() + index);

    return weekDate;
  });
}

export function formatHomeDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function isSameDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

export function isBeforeToday(date: Date) {
  return startOfDay(date).getTime() < startOfDay(new Date()).getTime();
}

export function getMonthDays(month: Date) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const mondayFirstOffset = (firstDay.getDay() + 6) % 7;

  const days: Array<Date | null> = Array.from(
    { length: mondayFirstOffset },
    () => null,
  );

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(month.getFullYear(), month.getMonth(), day));
  }

  return days;
}

export function formatMonth(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function formatScheduleDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export function formatScheduleHeaderDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function createScheduledDate(date: Date, time: ScheduleTime) {
  const [hours, minutes] = time.split(":").map(Number);

  const scheduled = new Date(date);
  scheduled.setHours(hours, minutes, 0, 0);

  return scheduled;
}

export function formatScheduledTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function getTaskDeadlineDate(task: Task) {
  const deadline = new Date(task.deadline);

  if (Number.isNaN(deadline.getTime())) {
    return null;
  }

  return deadline;
}

export function getScheduledTasksForDate(tasks: Task[], date: Date) {
  return tasks
    .filter((task) => {
      if (!task.scheduledAt) {
        return false;
      }

      const scheduledDate = new Date(task.scheduledAt);

      return (
        !Number.isNaN(scheduledDate.getTime()) && isSameDay(scheduledDate, date)
      );
    })
    .sort((first, second) => {
      const firstDate = new Date(first.scheduledAt ?? "").getTime();
      const secondDate = new Date(second.scheduledAt ?? "").getTime();

      return firstDate - secondDate;
    });
}
