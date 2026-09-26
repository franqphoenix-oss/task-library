import { StyleSheet } from "react-native";

import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const progressCardStyles = StyleSheet.create({
  card: {
    padding: spacing.xxl,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xxl,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },

  label: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },

  value: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  percentage: {
    color: colors.text,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },

  track: {
    height: 8,
    overflow: "hidden",
    borderRadius: radius.full,
    backgroundColor: colors.surfaceElevated,
  },

  progress: {
    height: "100%",
    borderRadius: radius.full,
    backgroundColor: colors.accent,
  },
});
