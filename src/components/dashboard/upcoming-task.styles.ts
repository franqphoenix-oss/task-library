import { StyleSheet } from "react-native";

import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const upcomingTaskStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },

  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
    marginRight: spacing.md,
  },

  activeIndicator: {
    backgroundColor: colors.accent,
  },

  content: {
    flex: 1,
  },

  title: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },

  meta: {
    flexDirection: "row",
    alignItems: "center",
  },

  metaText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
  },

  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.textMuted,
    marginHorizontal: spacing.sm,
  },
});
