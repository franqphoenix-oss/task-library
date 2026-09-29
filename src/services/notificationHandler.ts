type NotificationsModule = typeof import("expo-notifications");

export function configureNotificationHandler(
  Notifications: NotificationsModule,
) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}
