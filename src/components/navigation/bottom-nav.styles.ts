import { StyleSheet } from "react-native";

import type { AppColors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const createBottomNavStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: spacing.sm,
    },

    items: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: spacing.md,
    },

    item: {
      minWidth: 64,
      minHeight: 48,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.md,
    },

    itemPressed: {
      opacity: 0.65,
    },

    iconContainer: {
      width: 28,
      height: 24,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.sm,
    },

    iconContainerActive: {
      backgroundColor: colors.surfaceElevated,
    },

    label: {
      marginTop: 3,
      color: colors.textMuted,
      fontSize: 9,
      fontWeight: typography.weights.medium,
    },

    labelActive: {
      color: colors.accent,
      fontWeight: typography.weights.semibold,
    },
  });
