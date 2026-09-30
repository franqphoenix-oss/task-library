type NotificationsModule = Pick<
  typeof import("expo-notifications"),
  "setNotificationHandler"
>;

export function configureNotificationHandler(
  Notifications: NotificationsModule,
) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}
