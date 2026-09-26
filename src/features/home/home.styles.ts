import { StyleSheet } from "react-native";

import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const homeStyles = StyleSheet.create({
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
    paddingTop: spacing.sm,
    paddingBottom: 105,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },

  greeting: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: 3,
  },

  dateText: {
    color: colors.textSecondary,
    fontSize: 10,
  },

  profileButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  profileIcon: {
    color: colors.text,
    fontSize: 14,
  },

  dateRow: {
    gap: 6,
    marginBottom: spacing.md,
  },

  dateItem: {
    width: 38,
    height: 46,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  dateItemActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },

  dayText: {
    color: colors.textSecondary,
    fontSize: 9,
    marginBottom: 3,
  },

  numberText: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },

  activeDateText: {
    color: colors.white,
  },

  nextUpCard: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },

  nextUpHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },

  nextUpTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  nextUpDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.danger,
    marginRight: 6,
  },

  nextUpLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: typography.weights.medium,
  },

  moreIcon: {
    color: colors.textSecondary,
    fontSize: 18,
  },

  taskTitle: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    marginBottom: 4,
  },

  taskTime: {
    color: colors.textSecondary,
    fontSize: 9,
    marginBottom: spacing.md,
  },

  taskBottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  taskStatus: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },

  checkText: {
    color: colors.textSecondary,
    fontSize: 9,
  },

  taskProgressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceElevated,
    overflow: "hidden",
  },

  taskProgressFill: {
    height: "100%",
    backgroundColor: colors.accent,
  },

  taskPercentage: {
    color: colors.textSecondary,
    fontSize: 9,
    marginLeft: spacing.sm,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },

  progressSummary: {
    color: colors.textSecondary,
    fontSize: 9,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceElevated,
    overflow: "hidden",
    marginRight: spacing.sm,
  },

  progressFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: colors.accent,
  },

  progressPercentage: {
    color: colors.textSecondary,
    fontSize: 9,
  },
});
