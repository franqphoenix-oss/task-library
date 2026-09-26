import { StyleSheet } from "react-native";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { typography } from "../../constants/typography";

export const splashStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xxl,
  },

  centerContent: {
    alignItems: "center",
    marginTop: -spacing.xxxl,
  },

  logoPlaceholder: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
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

  progressTrack: {
    position: "absolute",
    bottom: spacing.xl,
    width: 102,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.border,
    overflow: "hidden",
  },

  progressFill: {
    width: 35,
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
});
