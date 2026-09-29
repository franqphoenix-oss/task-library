import { router } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NotificationIcon } from "../components/icons/NotificationIcon";
import { BottomNav } from "../components/navigation/BottomNav";
import { useNotifications } from "../context/NotificationContext";
import { useTheme } from "../context/ThemeContext";
import { createNotificationsStyles } from "../features/notifications/notifications.styles";

function formatNotificationTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();

  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (sameDay) {
    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createNotificationsStyles(colors), [colors]);
  const { notifications, isLoading, markAsRead, markAllAsRead } =
    useNotifications();

  const hasUnread = notifications.some((notification) => !notification.read);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>

          {hasUnread ? (
            <Pressable
              onPress={markAllAsRead}
              style={({ pressed }) => [
                styles.markAllButton,
                pressed && styles.notificationCardPressed,
              ]}
              hitSlop={8}
            >
              <Text style={styles.markAllText}>Mark all read</Text>
            </Pressable>
          ) : null}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {notifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <View style={styles.emptyIconDot} />
              </View>

              <Text style={styles.emptyTitle}>You're all caught up</Text>

              <Text style={styles.emptyDescription}>
                Task reminders and important updates will appear here.
              </Text>
            </View>
          ) : (
            notifications.map((notification) => (
              <Pressable
                key={notification.id}
                onPress={() => {
                  markAsRead(notification.id);

                  if (!notification.taskId) {
                    return;
                  }

                  router.push({
                    pathname: "/task-details",
                    params: {
                      taskId: notification.taskId,
                    },
                  });
                }}
                style={({ pressed }) => [
                  styles.notificationCard,
                  !notification.read && styles.notificationCardUnread,
                  pressed && styles.notificationCardPressed,
                ]}
              >
                <View style={styles.iconContainer}>
                  <NotificationIcon type={notification.type} />
                </View>

                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text
                      style={[
                        styles.notificationTitle,
                        !notification.read && styles.notificationTitleUnread,
                      ]}
                      numberOfLines={2}
                    >
                      {notification.title}
                    </Text>

                    <Text style={styles.notificationTime}>
                      {formatNotificationTime(notification.createdAt)}
                    </Text>

                    {!notification.read ? (
                      <View style={styles.unreadDot} />
                    ) : null}
                  </View>

                  <Text style={styles.notificationBody} numberOfLines={3}>
                    {notification.body}
                  </Text>
                </View>
              </Pressable>
            ))
          )}
        </ScrollView>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
}
