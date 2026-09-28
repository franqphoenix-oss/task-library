import { StyleSheet } from "react-native";

import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const createTaskStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  keyboardView: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  heading: {
    flex: 1,
    paddingTop: spacing.xs,
  },

  title: {
    color: colors.text,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.xs,
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
    lineHeight: 18,
  },

  form: {
    gap: spacing.xl,
  },

  field: {
    gap: spacing.xs,
  },

  label: {
    color: colors.text,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },

  input: {
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: typography.sizes.sm,
  },

  goalInput: {
    minHeight: 132,
  },

  placeholder: {
    color: colors.textMuted,
  },

  characterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },

  helperText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    lineHeight: 16,
  },

  characterCount: {
    color: colors.textMuted,
    fontSize: 10,
  },

  selectButton: {
    minHeight: 48,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectButtonPressed: {
    backgroundColor: colors.surfaceElevated,
  },

  selectText: {
    flex: 1,
    color: colors.text,
    fontSize: typography.sizes.sm,
  },

  selectPlaceholder: {
    color: colors.textMuted,
  },

  selectChevron: {
    color: colors.textSecondary,
    fontSize: 20,
    lineHeight: 20,
    marginLeft: spacing.sm,
  },

  inputInvalid: {
    borderColor: colors.danger,
  },

  error: {
    color: colors.danger,
    fontSize: typography.sizes.xs,
  },

  submitButton: {
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: colors.accent,
    marginTop: spacing.xxl,
  },

  submitText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },

  submitHint: {
    color: colors.textMuted,
    fontSize: 10,
    lineHeight: 15,
    textAlign: "center",
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  },

  optionSheet: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  optionSheetTitle: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.md,
  },

  option: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    marginBottom: spacing.xs,
  },

  optionPressed: {
    backgroundColor: colors.surfaceElevated,
  },

  optionSelected: {
    backgroundColor: colors.surfaceElevated,
  },

  optionText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },

  optionTextSelected: {
    color: colors.text,
    fontWeight: typography.weights.semibold,
  },

  optionCheck: {
    color: colors.accent,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  calendarSheet: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },

  calendarTitle: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  calendarCloseButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceElevated,
  },

  calendarCloseText: {
    color: colors.textSecondary,
    fontSize: 22,
    lineHeight: 22,
  },

  calendarMonthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },

  calendarMonth: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },

  monthButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceElevated,
  },

  monthButtonText: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 22,
  },

  weekdayRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },

  weekdayText: {
    flex: 1,
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: typography.weights.medium,
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
    borderRadius: radius.sm,
  },

  calendarDayPressed: {
    backgroundColor: colors.surfaceElevated,
  },

  calendarDayToday: {
    borderWidth: 1,
    borderColor: colors.accent,
  },

  calendarDaySelected: {
    backgroundColor: colors.accent,
    borderWidth: 0,
  },

  calendarDayText: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },

  calendarDayDisabled: {
    color: colors.textMuted,
    opacity: 0.35,
  },

  calendarDayTodayText: {
    color: colors.accent,
    fontWeight: typography.weights.semibold,
  },

  calendarDaySelectedText: {
    color: colors.white,
    fontWeight: typography.weights.semibold,
  },

  calendarHint: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    textAlign: "center",
    marginTop: spacing.lg,
  },

  descriptionInput: {
    minHeight: 112,
  },

  stepsSection: {
    gap: spacing.md,
  },

  stepsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },

  stepsHeading: {
    flex: 1,
    gap: spacing.xs,
  },

  stepCount: {
    minWidth: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceElevated,
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    textAlign: "center",
    textAlignVertical: "center",
  },

  stepCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },

  stepCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  stepNumber: {
    color: colors.accent,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },

  removeStepText: {
    color: colors.danger,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },

  stepDescriptionInput: {
    minHeight: 80,
  },

  addStepButton: {
    minHeight: 46,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },

  addStepText: {
    color: colors.accent,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
});
