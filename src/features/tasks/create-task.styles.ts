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
    marginBottom: spacing.xxxl,
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

  selectText: {
    color: colors.text,
    fontSize: typography.sizes.sm,
  },

  selectPlaceholder: {
    color: colors.textMuted,
  },

  selectChevron: {
    color: colors.textSecondary,
    fontSize: 20,
    transform: [{ rotate: "180deg" }],
  },

  datePicker: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },

  pickerWrapper: {
    minHeight: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    justifyContent: "center",
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
    marginTop: spacing.xxxl,
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
});
