import { StyleSheet } from "react-native";

import { colors } from "../../constants/colors";
import { radius, spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const loginStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },

  backButton: {
    width: 32,
    height: 32,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: spacing.lg,
  },

  backIcon: {
    color: colors.text,
    fontSize: 30,
    fontWeight: typography.weights.regular,
    lineHeight: 30,
  },

  content: {
    flex: 1,
    paddingTop: spacing.xl,
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
    marginBottom: spacing.xl,
  },

  form: {
    gap: spacing.md,
  },

  label: {
    color: colors.text,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },

  input: {
    height: 42,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: typography.sizes.xs,
  },

  passwordWrapper: {
    position: "relative",
  },

  passwordInput: {
    height: 42,
    paddingHorizontal: spacing.md,
    paddingRight: 42,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: typography.sizes.xs,
  },

  eyeIcon: {
    position: "absolute",
    right: spacing.md,
    top: 11,
    color: colors.textSecondary,
    fontSize: 14,
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: spacing.sm,
  },

  forgotText: {
    color: colors.accent,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },

  primaryButton: {
    height: 42,
    borderRadius: radius.sm,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.lg,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },

  continueText: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    textAlign: "center",
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  socialRow: {
    flexDirection: "row",
    gap: spacing.md,
  },

  socialButton: {
    flex: 1,
    height: 42,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  googleIcon: {
    color: "#4285F4",
    fontSize: 17,
    fontWeight: typography.weights.bold,
  },

  appleIcon: {
    color: colors.text,
    fontSize: 15,
  },

  switchText: {
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.lg,
    fontSize: typography.sizes.xs,
  },

  link: {
    color: colors.accent,
    fontWeight: typography.weights.medium,
  },

  pressed: {
    opacity: 0.65,
  },

  buttonPressed: {
    opacity: 0.8,
  },
});
