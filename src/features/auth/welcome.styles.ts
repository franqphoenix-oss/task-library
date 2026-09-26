import { StyleSheet } from "react-native";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const welcomeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    alignItems: "center",
    justifyContent: "space-between",
  },

  content: {
    width: "100%",
    alignItems: "center",
    paddingTop: spacing.xxxl,
  },

  logoPlaceholder: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },

  logoShapeOne: {
    position: "absolute",
    width: 10,
    height: 25,
    borderRadius: 5,
    backgroundColor: colors.accentSecondary,
    transform: [{ rotate: "-48deg" }],
    left: 7,
    top: 10,
  },

  logoShapeTwo: {
    position: "absolute",
    width: 10,
    height: 22,
    borderRadius: 5,
    backgroundColor: colors.accent,
    transform: [{ rotate: "48deg" }],
    left: 16,
    top: 5,
  },

  logoShapeThree: {
    position: "absolute",
    width: 10,
    height: 17,
    borderRadius: 5,
    backgroundColor: colors.accentSecondary,
    transform: [{ rotate: "-48deg" }],
    left: 24,
    top: 14,
  },

  title: {
    color: colors.text,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.semibold,
    letterSpacing: -0.5,
    textAlign: "center",
  },

  subtitle: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
    lineHeight: 20,
    textAlign: "center",
  },

  illustrationPlaceholder: {
    width: 150,
    height: 150,
    marginTop: spacing.xxl,
    alignItems: "center",
    justifyContent: "center",
  },

  illustrationCardBack: {
    position: "absolute",
    width: 86,
    height: 86,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    transform: [{ rotate: "30deg" }],
    left: 18,
    top: 30,
    opacity: 0.65,
  },

  illustrationCardMiddle: {
    position: "absolute",
    width: 82,
    height: 82,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    transform: [{ rotate: "30deg" }],
    left: 38,
    top: 22,
    opacity: 0.85,
  },

  illustrationCardFront: {
    position: "absolute",
    width: 78,
    height: 78,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.accent,
    transform: [{ rotate: "30deg" }],
    left: 48,
    top: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  illustrationLine: {
    width: 32,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.accent,
    marginBottom: 8,
  },

  illustrationLineShort: {
    width: 20,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.accentSecondary,
  },

  actions: {
    width: "100%",
    alignItems: "center",
  },

  primaryButton: {
    width: "100%",
    height: 52,
    borderRadius: 10,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },

  loginLink: {
    marginTop: spacing.lg,
    color: colors.accent,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  linkPressed: {
    opacity: 0.65,
  },
});
