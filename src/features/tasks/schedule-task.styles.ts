import { StyleSheet } from "react-native";

import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const scheduleTaskStyles = StyleSheet.create({
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
    marginBottom: spacing.xs,
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
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

  calendarCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
  },

  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },

  monthTitle: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  monthButton: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },

  monthButtonText: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 24,
  },

  weekdayRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },

  weekday: {
    flex: 1,
    textAlign: "center",
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  calendarDay: {
    width: "14.2857%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  calendarDayText: {
    width: 34,
    height: 34,
    borderRadius: radius.full,
    textAlign: "center",
    textAlignVertical: "center",
    color: colors.text,
    fontSize: typography.sizes.sm,
  },

  selectedDay: {},

  selectedDayText: {
    backgroundColor: colors.accent,
    color: colors.white,
    overflow: "hidden",
  },

  todayDay: {},

  disabledDay: {
    opacity: 0.35,
  },

  disabledDayText: {
    color: colors.textMuted,
  },

  calendarHint: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    lineHeight: 18,
    marginTop: spacing.md,
  },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },

  timeButton: {
    minWidth: 72,
    minHeight: 42,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedTimeButton: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },

  disabledTimeButton: {
    opacity: 0.35,
  },

  timeText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },

  selectedTimeText: {
    color: colors.white,
  },

  disabledTimeText: {
    color: colors.textMuted,
  },

  previewCard: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },

  previewLabel: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.xs,
  },

  previewValue: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  previewPlaceholder: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
  },

  scheduleButton: {
    minHeight: 50,
    borderRadius: radius.sm,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },

  scheduleButtonDisabled: {
    opacity: 0.4,
  },

  scheduleButtonText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
});
