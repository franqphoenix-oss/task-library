import { StyleSheet } from "react-native";

import type { AppColors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const createAiProcessingStyles = (colors: AppColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    screen: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.xl,
    },

    indicator: {
      width: 72,
      height: 72,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.full,
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.xxl,
    },

    indicatorDot: {
      width: 14,
      height: 14,
      borderRadius: radius.full,
      backgroundColor: colors.accent,
    },

    title: {
      color: colors.text,
      fontSize: typography.sizes.xxl,
      fontWeight: typography.weights.semibold,
      textAlign: "center",
      marginBottom: spacing.sm,
    },

    subtitle: {
      maxWidth: 300,
      color: colors.textSecondary,
      fontSize: typography.sizes.sm,
      lineHeight: 21,
      textAlign: "center",
    },
  });
