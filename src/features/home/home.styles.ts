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

  scheduleSection: {
    marginTop: spacing.xs,
  },

  scheduleCard: {
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  scheduleItemSpacing: {
    marginBottom: spacing.md,
  },

  scheduleTime: {
    width: 76,
    color: colors.textSecondary,
    fontSize: 8,
  },

  scheduleIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },

  breakIcon: {
    backgroundColor: colors.surfaceElevated,
  },

  scheduleIconText: {
    color: colors.white,
    fontSize: 9,
  },

  scheduleTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 10,
  },

  breakTitle: {
    color: colors.textSecondary,
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 58,
    paddingHorizontal: spacing.lg,
    paddingBottom: 4,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  navItem: {
    width: 60,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },

  navLabel: {
    color: colors.textMuted,
    fontSize: 8,
    marginTop: 4,
  },

  navActive: {
    color: colors.accent,
  },

  createButton: {
    position: "absolute",
    right: spacing.lg,
    bottom: 66,
    height: 32,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.accent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  createPlus: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 16,
    marginRight: 4,
  },

  createText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: typography.weights.semibold,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  iconBox: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  houseRoof: {
    position: "absolute",
    top: 1,
    width: 10,
    height: 10,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    transform: [{ rotate: "45deg" }],
  },

  houseBody: {
    width: 11,
    height: 8,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderRadius: 2,
    position: "absolute",
    bottom: 1,
  },

  houseDoor: {
    position: "absolute",
    bottom: 0,
    left: 3,
    width: 3,
    height: 5,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },

  taskIcon: {
    width: 13,
    height: 15,
    borderWidth: 1.3,
    borderRadius: 2,
    paddingTop: 3,
    paddingHorizontal: 2,
    gap: 2,
  },

  taskIconLine: {
    flexDirection: "row",
    alignItems: "center",
    height: 2,
  },

  taskCheck: {
    width: 3,
    height: 3,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    transform: [{ rotate: "-45deg" }],
    marginRight: 2,
  },

  taskLine: {
    flex: 1,
    height: 1,
    borderRadius: 1,
  },

  analyticsIcon: {
    width: 15,
    height: 15,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 2,
  },

  chartBar: {
    width: 3,
    borderRadius: 1,
  },

  chartBarOne: {
    height: 6,
  },

  chartBarTwo: {
    height: 10,
  },

  chartBarThree: {
    height: 14,
  },

  settingsIcon: {
    width: 15,
    height: 15,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  settingsCenter: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
