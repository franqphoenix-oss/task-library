import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants/colors";
import { spacing } from "../constants/spacing";
import { typography } from "../constants/typography";

const SPLASH_DURATION = 2500;

export default function SplashScreen() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/welcome");
    }, SPLASH_DURATION);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="light" />

      <View style={styles.container}>
        <View style={styles.centerContent}>
          {/* Temporary logo placeholder.
              The final Task Library logo asset will replace this
              without changing the surrounding layout. */}
          <View style={styles.logoPlaceholder}>
            <View style={styles.logoShapeOne} />
            <View style={styles.logoShapeTwo} />
            <View style={styles.logoShapeThree} />
          </View>

          <Text style={styles.title}>Task Library</Text>

          <Text style={styles.subtitle}>
            Smarter planning.
            {"\n"}
            Greater productivity.
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
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
