import { StyleSheet } from "react-native";

import type { AppColors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const createNotificationsStyles = (colors: AppColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },

    content: {
      flex: 1,
    },

    header: {
      minHeight: 68,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    title: {
      color: colors.text,
      fontSize: typography.sizes.xxl,
      lineHeight: 30,
      fontWeight: typography.weights.semibold,
    },

    markAllButton: {
      minHeight: 40,
      paddingHorizontal: spacing.sm,
      alignItems: "center",
      justifyContent: "center",
    },

    markAllText: {
      color: colors.accent,
      fontSize: typography.sizes.xs,
      fontWeight: typography.weights.semibold,
    },

    list: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: 104,
    },

    notificationCard: {
      minHeight: 76,
      marginBottom: spacing.sm,
      padding: spacing.md,
      flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
    },

    notificationCardUnread: {
      backgroundColor: colors.surfaceElevated,
      borderColor: colors.notificationBorder,
    },

    notificationCardPressed: {
      opacity: 0.72,
    },

    iconContainer: {
      width: 38,
      height: 38,
      marginRight: spacing.md,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
      borderRadius: radius.sm,
    },

    notificationContent: {
      flex: 1,
      minWidth: 0,
    },

    notificationHeader: {
      minHeight: 18,
      flexDirection: "row",
      alignItems: "flex-start",
    },

    notificationTitle: {
      flex: 1,
      color: colors.text,
      fontSize: typography.sizes.sm,
      lineHeight: 19,
      fontWeight: typography.weights.medium,
    },

    notificationTitleUnread: {
      fontWeight: typography.weights.semibold,
    },

    notificationTime: {
      marginLeft: spacing.sm,
      color: colors.textMuted,
      fontSize: 10,
      lineHeight: 16,
      fontWeight: typography.weights.regular,
    },

    notificationBody: {
      marginTop: 3,
      color: colors.textSecondary,
      fontSize: typography.sizes.xs,
      lineHeight: 18,
      fontWeight: typography.weights.regular,
    },

    unreadDot: {
      width: 6,
      height: 6,
      marginLeft: spacing.sm,
      marginTop: 6,
      borderRadius: 999,
      backgroundColor: colors.accent,
    },

    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.xxl,
    },

    loadingText: {
      color: colors.textSecondary,
      fontSize: typography.sizes.sm,
    },

    emptyContainer: {
      alignItems: "center",
      paddingHorizontal: spacing.xxl,
      paddingTop: spacing.xxxl,
    },

    emptyIcon: {
      width: 48,
      height: 48,
      marginBottom: spacing.lg,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
    },

    emptyIconDot: {
      width: 8,
      height: 8,
      borderRadius: 999,
      backgroundColor: colors.accent,
    },

    emptyTitle: {
      color: colors.text,
      fontSize: typography.sizes.lg,
      lineHeight: 24,
      fontWeight: typography.weights.semibold,
      textAlign: "center",
    },

    emptyDescription: {
      maxWidth: 300,
      marginTop: spacing.xs,
      color: colors.textSecondary,
      fontSize: typography.sizes.sm,
      lineHeight: 20,
      textAlign: "center",
    },
  });
