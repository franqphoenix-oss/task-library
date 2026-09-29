import { StyleSheet } from "react-native";

import type { AppColors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const createCalendarStyles = (colors: AppColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },

    content: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.xxxl + 72,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.xl,
    },

    backButton: {
      width: 36,
      height: 36,
      borderRadius: radius.full,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      marginRight: spacing.md,
    },

    backButtonPressed: {
      opacity: 0.65,
    },

    title: {
      color: colors.text,
      fontSize: typography.sizes.xxl,
      lineHeight: 30,
      fontWeight: typography.weights.semibold,
    },

    dateNavigation: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: spacing.xl,
    },

    dateLabel: {
      color: colors.text,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
    },

    dateButton: {
      width: 36,
      height: 36,
      borderRadius: radius.full,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },

    dateButtonPressed: {
      opacity: 0.65,
    },

    dateButtonText: {
      color: colors.text,
      fontSize: 22,
      lineHeight: 24,
      marginTop: -2,
    },

    timeline: {
      position: "relative",
    },

    timelineRow: {
      flexDirection: "row",
      alignItems: "stretch",
      minHeight: 72,
      marginBottom: spacing.sm,
    },

    timeColumn: {
      width: 56,
      paddingTop: spacing.xs,
      paddingRight: spacing.sm,
    },

    timeText: {
      color: colors.textSecondary,
      fontSize: typography.sizes.xs,
      fontWeight: typography.weights.medium,
      lineHeight: 18,
    },

    markerColumn: {
      width: 18,
      alignItems: "center",
      position: "relative",
    },

    markerRail: {
      position: "absolute",
      top: 0,
      bottom: -spacing.sm,
      width: 1,
      backgroundColor: colors.border,
    },

    marker: {
      width: 7,
      height: 7,
      borderRadius: radius.full,
      marginTop: 6,
      backgroundColor: colors.accentSecondary,
      zIndex: 1,
    },

    taskButton: {
      flex: 1,
      minHeight: 64,
      borderRadius: radius.md,
      backgroundColor: colors.accentSecondary,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      marginLeft: spacing.sm,
      justifyContent: "center",
    },

    taskButtonPressed: {
      opacity: 0.75,
    },

    taskTitle: {
      color: colors.white,
      fontSize: typography.sizes.sm,
      lineHeight: 19,
      fontWeight: typography.weights.semibold,
    },

    taskSource: {
      color: "rgba(255, 255, 255, 0.68)",
      fontSize: typography.sizes.xs,
      lineHeight: 16,
      marginTop: 2,
    },

    emptyState: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
    },

    emptyTitle: {
      color: colors.text,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      marginBottom: spacing.xs,
    },

    emptyText: {
      color: colors.textSecondary,
      fontSize: typography.sizes.sm,
      lineHeight: 20,
    },
  });
