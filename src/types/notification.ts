export type NotificationType =
  | "task-reminder"
  | "deadline"
  | "task-completed"
  | "recommendation";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  taskId?: string;
  scheduledNotificationId?: string;
};
