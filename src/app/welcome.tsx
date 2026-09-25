import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants/colors";
import { radius, spacing } from "../constants/spacing";
import { typography } from "../constants/typography";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>✓</Text>
          </View>

          <Text style={styles.title}>
            Get more done,{`\n`}without the chaos.
          </Text>

          <Text style={styles.description}>
            Task Library turns your goals into clear, actionable plans so you
            always know what to work on next.
          </Text>
        </View>

        <View style={styles.actions}>
          <View
            style={styles.primaryButton}
            onTouchEnd={() => router.push("/signup")}
          >
            <Text style={styles.primaryButtonText}>Create an account</Text>
          </View>

          <View
            style={styles.secondaryButton}
            onTouchEnd={() => router.push("/login")}
          >
            <Text style={styles.secondaryButtonText}>Log in</Text>
          </View>

          <Text style={styles.footer}>Plan smarter. Work with purpose.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.lg,
  },

  hero: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  icon: {
    width: 68,
    height: 68,
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xxl,
  },

  iconText: {
    color: colors.accent,
    fontSize: 30,
    fontWeight: typography.weights.bold,
  },

  title: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 38,
    fontWeight: typography.weights.semibold,
    textAlign: "center",
    marginBottom: spacing.lg,
  },

  description: {
    maxWidth: 340,
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    lineHeight: 24,
    textAlign: "center",
  },

  actions: {
    gap: spacing.md,
  },

  primaryButton: {
    minHeight: 54,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  secondaryButton: {
    minHeight: 54,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  secondaryButtonText: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  footer: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    textAlign: "center",
    marginTop: spacing.sm,
  },
});
