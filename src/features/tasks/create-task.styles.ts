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
    paddingBottom: spacing.xl,
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
    lineHeight: 26,
    marginBottom: spacing.xs,
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },

  form: {
    gap: spacing.xl,
  },

  field: {
    gap: spacing.xs,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  label: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },

  required: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
  },

  goalInput: {
    minHeight: 150,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: typography.sizes.sm,
    lineHeight: 22,
  },

  helperRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md,
  },

  helperText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    lineHeight: 17,
  },

  characterCount: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    lineHeight: 17,
  },

  selectButton: {
    minHeight: 52,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectText: {
    flex: 1,
    color: colors.text,
    fontSize: typography.sizes.sm,
  },

  selectPlaceholder: {
    color: colors.textMuted,
  },

  chevron: {
    color: colors.textSecondary,
    fontSize: 24,
    lineHeight: 24,
    marginLeft: spacing.sm,
  },

  datePickerContainer: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },

  pickerContainer: {
    minHeight: 52,
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },

  inputInvalid: {
    borderColor: colors.danger,
  },

  error: {
    color: colors.danger,
    fontSize: typography.sizes.xs,
    lineHeight: 17,
  },

  submitSection: {
    marginTop: spacing.xxl,
  },

  submitButton: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: colors.accent,
  },

  submitText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },

  submitHint: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    lineHeight: 17,
    textAlign: "center",
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
  },

  placeholder: {
    color: colors.textMuted,
  },

  buttonPressed: {
    opacity: 0.75,
  },
});
