import { StyleSheet } from "react-native";

import type { AppColors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const createGeneratedPlanStyles = (colors: AppColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    screen: {
      flex: 1,
    },

    content: {
      flexGrow: 1,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.lg,
      paddingBottom: spacing.huge,
    },

    header: {
      marginBottom: spacing.xxl,
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
      fontWeight: typography.weights.semibold,
      marginBottom: spacing.sm,
    },

    summary: {
      color: colors.textSecondary,
      fontSize: typography.sizes.sm,
      lineHeight: 21,
    },

    planCard: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      padding: spacing.lg,
      marginBottom: spacing.xl,
    },

    step: {
      flexDirection: "row",
      gap: spacing.md,
    },

    stepSpacing: {
      marginTop: spacing.xl,
    },

    stepNumber: {
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.full,
      backgroundColor: colors.surfaceElevated,
    },

    stepNumberText: {
      color: colors.accent,
      fontSize: typography.sizes.xs,
      fontWeight: typography.weights.bold,
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

    stepDescription: {
      color: colors.textSecondary,
      fontSize: typography.sizes.xs,
      lineHeight: 18,
      marginBottom: spacing.xs,
    },

    stepDuration: {
      color: colors.textMuted,
      fontSize: typography.sizes.xs,
    },

    button: {
      minHeight: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.sm,
      backgroundColor: colors.accent,
      marginTop: "auto",
    },

    buttonText: {
      color: colors.white,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
    },
  });
