import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants/colors";
import { radius, spacing } from "../constants/spacing";
import { useNotifications } from "../context/NotificationContext";

function formatNotificationTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getIcon(type: string) {
  switch (type) {
    case "task-reminder":
      return "◷";
    case "deadline":
      return "!";
    case "task-completed":
      return "✓";
    case "recommendation":
      return "✦";
    default:
      return "•";
  }
}

export default function NotificationsScreen() {
  const { notifications, isLoading, markAsRead, markAllAsRead } =
    useNotifications();

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
        edges={["top"]}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: colors.textSecondary }}>
            Loading notifications...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      edges={["top"]}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.lg,
            paddingBottom: spacing.md,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 24,
              fontWeight: "600",
            }}
          >
            Notifications
          </Text>

          {notifications.some((notification) => !notification.read) && (
            <Pressable onPress={markAllAsRead}>
              <Text
                style={{
                  color: colors.accent,
                  fontSize: 13,
                  fontWeight: "500",
                }}
              >
                Mark all read
              </Text>
            </Pressable>
          )}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            paddingBottom: spacing.xxxl,
          }}
        >
          {notifications.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                paddingTop: spacing.huge,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 17,
                  fontWeight: "600",
                }}
              >
                You're all caught up
              </Text>

              <Text
                style={{
                  marginTop: spacing.sm,
                  color: colors.textSecondary,
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Task reminders and important updates will appear here.
              </Text>
            </View>
          ) : (
            notifications.map((notification) => (
              <Pressable
                key={notification.id}
                onPress={() => {
                  markAsRead(notification.id);

                  if (notification.taskId) {
                    router.push({
                      pathname: "/task-details",
                      params: {
                        taskId: notification.taskId,
                      },
                    });
                  }
                }}
                style={{
                  flexDirection: "row",
                  padding: spacing.lg,
                  marginBottom: spacing.sm,
                  backgroundColor: notification.read
                    ? colors.surface
                    : colors.surfaceElevated,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: radius.lg,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: spacing.md,
                    backgroundColor: colors.background,
                    borderRadius: radius.sm,
                  }}
                >
                  <Text
                    style={{
                      color: colors.accent,
                      fontSize: 17,
                      fontWeight: "600",
                    }}
                  >
                    {getIcon(notification.type)}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        flex: 1,
                        color: colors.text,
                        fontSize: 14,
                        fontWeight: notification.read ? "500" : "600",
                      }}
                    >
                      {notification.title}
                    </Text>

                    <Text
                      style={{
                        marginLeft: spacing.sm,
                        color: colors.textMuted,
                        fontSize: 11,
                      }}
                    >
                      {formatNotificationTime(notification.createdAt)}
                    </Text>
                  </View>

                  <Text
                    style={{
                      marginTop: spacing.xs,
                      color: colors.textSecondary,
                      fontSize: 13,
                      lineHeight: 19,
                    }}
                  >
                    {notification.body}
                  </Text>
                </View>
              </Pressable>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
