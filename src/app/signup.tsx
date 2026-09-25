import { router } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants/colors";
import { radius, spacing } from "../constants/spacing";
import { typography } from "../constants/typography";

export default function SignupScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.back} onPress={() => router.back()}>
          ← Back
        </Text>

        <View style={styles.content}>
          <Text style={styles.title}>Create your account</Text>

          <Text style={styles.subtitle}>
            Start turning your goals into actionable plans.
          </Text>

          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Name</Text>
              <TextInput
                placeholder="Your name"
                placeholderTextColor={colors.textMuted}
                style={styles.input}
              />
            </View>

            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Create a password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>

          <View
            style={styles.button}
            onTouchEnd={() => router.replace("/login")}
          >
            <Text style={styles.buttonText}>Create account</Text>
          </View>

          <Text style={styles.switchText}>
            Already have an account?{" "}
            <Text style={styles.link} onPress={() => router.replace("/login")}>
              Log in
            </Text>
          </Text>
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
    paddingHorizontal: spacing.xl,
  },

  back: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    marginTop: spacing.lg,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: colors.text,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.sm,
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    lineHeight: 23,
    marginBottom: spacing.xxxl,
  },

  form: {
    gap: spacing.lg,
  },

  label: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.sm,
  },

  input: {
    height: 52,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: typography.sizes.md,
  },

  button: {
    height: 54,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
    marginTop: spacing.xxxl,
  },

  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  switchText: {
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.lg,
    fontSize: typography.sizes.sm,
  },

  link: {
    color: colors.accent,
    fontWeight: typography.weights.semibold,
  },
});
