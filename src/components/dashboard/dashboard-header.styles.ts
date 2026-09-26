import { StyleSheet } from "react-native";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const dashboardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xxl,
  },

  greeting: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },

  title: {
    color: colors.text,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.semibold,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },

  avatarText: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
});
