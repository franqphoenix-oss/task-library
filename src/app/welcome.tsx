import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants/colors";
import { radius, spacing } from "../constants/spacing";
import { typography } from "../constants/typography";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        {/* Temporary visual asset */}
        <View style={styles.visualPlaceholder}>
          <Text style={styles.placeholderText}>TL</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Plan better.</Text>

          <Text style={styles.subtitle}>
            Turn your goals into clear, actionable tasks and stay on track.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push("/signup")}
          >
            <Text style={styles.primaryButtonText}>Create an account</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.secondaryButtonText}>Log in</Text>
          </Pressable>
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
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xl,
  },

  visualPlaceholder: {
    flex: 1,
    minHeight: 240,
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderText: {
    color: colors.textMuted,
    fontSize: 32,
    fontWeight: typography.weights.bold,
  },

  content: {
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },

  title: {
    color: colors.text,
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
    letterSpacing: -1,
    textAlign: "center",
  },

  subtitle: {
    marginTop: spacing.md,
    maxWidth: 320,
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.regular,
    lineHeight: 24,
    textAlign: "center",
  },

  actions: {
    width: "100%",
    marginTop: spacing.xxxl,
    gap: spacing.md,
  },

  primaryButton: {
    width: "100%",
    minHeight: 54,
    borderRadius: radius.lg,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  secondaryButton: {
    width: "100%",
    minHeight: 54,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  buttonPressed: {
    opacity: 0.75,
  },
});
