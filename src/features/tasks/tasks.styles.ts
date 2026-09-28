import { StyleSheet } from "react-native";

import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const tasksStyles = StyleSheet.create({
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
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xxl,
  },

  eyebrow: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: typography.weights.semibold,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },

  title: {
    color: colors.text,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
  },

  addButton: {
    width: 38,
    height: 38,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
  },

  addButtonPressed: {
    opacity: 0.75,
  },

  addButtonText: {
    color: colors.white,
    fontSize: 23,
    fontWeight: typography.weights.regular,
    lineHeight: 25,
  },

  section: {
    marginBottom: spacing.xxl,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  sectionTitle: {
    flex: 1,
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },

  sectionCount: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceElevated,
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: typography.weights.semibold,
    textAlign: "center",
    textAlignVertical: "center",
    overflow: "hidden",
  },

  taskCard: {
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  taskCardPressed: {
    opacity: 0.78,
  },

  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
    marginRight: spacing.sm,
  },

  statusDotActive: {
    backgroundColor: colors.accent,
  },

  statusDotCompleted: {
    backgroundColor: colors.success,
  },

  priority: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: typography.weights.medium,
  },

  taskTitle: {
    color: colors.text,
    fontSize: typography.sizes.md,
    lineHeight: 21,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.sm,
  },

  taskTitleCompleted: {
    color: colors.textSecondary,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },

  metaText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 9,
  },

  progressTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.surfaceElevated,
    overflow: "hidden",
    marginBottom: spacing.md,
  },

  progressFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: colors.accent,
  },

  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  stepsText: {
    color: colors.textMuted,
    fontSize: 9,
  },

  startButton: {
    minHeight: 32,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
  },

  startButtonPressed: {
    opacity: 0.75,
  },

  startButtonText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: typography.weights.semibold,
  },

  emptyState: {
    padding: spacing.xxl,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },

  emptyTitle: {
    color: colors.text,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.sm,
  },

  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: spacing.xl,
  },

  emptyButton: {
    minHeight: 42,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
  },

  emptyButtonText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },

  headerCopy: {
    flex: 1,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  calendarButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  calendarButtonText: {
    color: colors.text,
    fontSize: 19,
    lineHeight: 20,
  },
});
