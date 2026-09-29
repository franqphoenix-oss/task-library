import { StyleSheet } from "react-native";

import type { AppColors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const createTaskDetailsStyles = (colors: AppColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    content: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.lg,
      paddingBottom: spacing.huge,
    },

    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: spacing.xxl,
    },

    backButton: {
      width: 36,
      height: 36,
      borderRadius: radius.full,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      marginRight: spacing.md,
    },

    buttonPressed: {
      opacity: 0.75,
    },

    backText: {
      color: colors.text,
      fontSize: 28,
      lineHeight: 30,
      marginTop: -2,
    },

    headerCopy: {
      flex: 1,
    },

    eyebrow: {
      color: colors.accent,
      fontSize: typography.sizes.xs,
      fontWeight: typography.weights.semibold,
      marginBottom: spacing.xs,
    },

    title: {
      color: colors.text,
      fontSize: typography.sizes.xxl,
      lineHeight: 30,
      fontWeight: typography.weights.semibold,
    },

    statusRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: spacing.sm,
    },

    statusDot: {
      width: 7,
      height: 7,
      borderRadius: radius.full,
      backgroundColor: colors.textMuted,
      marginRight: spacing.xs,
    },

    statusDotActive: {
      backgroundColor: colors.accent,
    },

    statusDotCompleted: {
      backgroundColor: colors.success,
    },

    statusText: {
      color: colors.textSecondary,
      fontSize: typography.sizes.xs,
      fontWeight: typography.weights.medium,
    },

    metaRow: {
      flexDirection: "row",
      gap: spacing.md,
      marginBottom: spacing.lg,
    },

    metaCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      padding: spacing.md,
    },

    metaLabel: {
      color: colors.textMuted,
      fontSize: typography.sizes.xs,
      fontWeight: typography.weights.semibold,
      marginBottom: spacing.xs,
    },

    metaValue: {
      color: colors.text,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
    },

    scheduleCard: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      padding: spacing.lg,
      marginBottom: spacing.xxl,
    },

    scheduleCopy: {
      flex: 1,
    },

    scheduleDate: {
      color: colors.text,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      marginBottom: spacing.xs,
    },

    scheduleTime: {
      color: colors.accent,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.medium,
    },

    progressSection: {
      marginBottom: spacing.xxl,
    },

    progressHeader: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: spacing.md,
    },

    progressSummary: {
      color: colors.textMuted,
      fontSize: typography.sizes.xs,
      marginTop: spacing.xs,
    },

    progressPercentage: {
      color: colors.accent,
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.bold,
    },

    progressTrack: {
      height: 7,
      borderRadius: radius.full,
      backgroundColor: colors.surfaceElevated,
      overflow: "hidden",
    },

    progressFill: {
      height: "100%",
      borderRadius: radius.full,
      backgroundColor: colors.accent,
    },

    section: {
      marginBottom: spacing.xxl,
    },

    sectionTitle: {
      color: colors.text,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      marginBottom: spacing.md,
    },

    summaryCard: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      padding: spacing.lg,
    },

    summary: {
      color: colors.textSecondary,
      fontSize: typography.sizes.sm,
      lineHeight: 21,
    },

    stepsHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    stepsHint: {
      color: colors.textMuted,
      fontSize: typography.sizes.xs,
      marginBottom: spacing.md,
    },

    stepsCard: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      padding: spacing.lg,
    },

    step: {
      flexDirection: "row",
      gap: spacing.md,
      borderRadius: radius.sm,
    },

    stepPressed: {
      opacity: 0.7,
    },

    stepCompleted: {
      opacity: 0.7,
    },

    stepSpacing: {
      marginTop: spacing.xl,
    },

    stepNumber: {
      width: 28,
      height: 28,
      borderRadius: radius.full,
      backgroundColor: colors.surfaceElevated,
      alignItems: "center",
      justifyContent: "center",
    },

    stepNumberCompleted: {
      backgroundColor: colors.success,
    },

    stepNumberText: {
      color: colors.accent,
      fontSize: typography.sizes.xs,
      fontWeight: typography.weights.bold,
    },

    stepNumberTextCompleted: {
      color: colors.white,
    },

    stepContent: {
      flex: 1,
    },

    stepTitle: {
      color: colors.text,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
      marginBottom: spacing.xs,
    },

    stepTitleCompleted: {
      color: colors.textSecondary,
      textDecorationLine: "line-through",
    },

    stepDescription: {
      color: colors.textSecondary,
      fontSize: typography.sizes.xs,
      lineHeight: 18,
      marginBottom: spacing.xs,
    },

    duration: {
      color: colors.textMuted,
      fontSize: typography.sizes.xs,
    },

    tipCard: {
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },

    tipEyebrow: {
      color: colors.accent,
      fontSize: typography.sizes.xs,
      fontWeight: typography.weights.semibold,
      marginBottom: spacing.xs,
    },

    tipText: {
      color: colors.textSecondary,
      fontSize: typography.sizes.sm,
      lineHeight: 20,
    },

    primaryButton: {
      minHeight: 50,
      borderRadius: radius.sm,
      backgroundColor: colors.accent,
      alignItems: "center",
      justifyContent: "center",
      marginTop: spacing.sm,
    },

    primaryButtonText: {
      color: colors.white,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
    },

    secondaryButton: {
      minHeight: 50,
      borderRadius: radius.sm,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      marginTop: spacing.sm,
    },

    secondaryButtonText: {
      color: colors.text,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
    },

    completedCard: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.success,
      borderRadius: radius.md,
      padding: spacing.lg,
      marginTop: spacing.sm,
    },

    completedTitle: {
      color: colors.success,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      marginBottom: spacing.xs,
    },

    completedText: {
      color: colors.textSecondary,
      fontSize: typography.sizes.sm,
      lineHeight: 20,
    },

    completeIndicator: {
      width: 28,
      height: 28,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },

    completeIndicatorText: {
      color: colors.textMuted,
      fontSize: typography.sizes.xs,
      fontWeight: typography.weights.semibold,
    },

    actionHint: {
      marginTop: spacing.sm,
      paddingVertical: spacing.md,
      alignItems: "center",
    },

    actionHintText: {
      color: colors.textMuted,
      fontSize: typography.sizes.xs,
      textAlign: "center",
    },
  });
