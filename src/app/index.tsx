import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants/colors";
import { radius, spacing } from "../constants/spacing";
import { typography } from "../constants/typography";

const loadingMessages = [
  "Preparing your workspace...",
  "Organizing your tasks...",
  "Building your schedule...",
  "Almost ready...",
];

export default function SplashScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial fade-in
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Change the loading message
    const messageInterval = setInterval(() => {
      setMessageIndex((current) => {
        if (current < loadingMessages.length - 1) {
          return current + 1;
        }

        return current;
      });
    }, 1000);

    // Temporary mocked startup delay
    const splashTimeout = setTimeout(() => {
      router.replace("/welcome");
    }, 4000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(splashTimeout);
    };
  }, [contentOpacity]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <Animated.View style={[styles.container, { opacity: contentOpacity }]}>
        {/* Temporary asset placeholder */}
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoPlaceholderText}>TL</Text>
        </View>

        <Text style={styles.title}>Task Library</Text>

        <View style={styles.loadingContainer}>
          <Text style={styles.loadingMessage}>
            {loadingMessages[messageIndex]}
          </Text>

          <ActivityIndicator
            size="small"
            color={colors.accent}
            style={styles.spinner}
          />
        </View>
      </Animated.View>
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

  logoPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },

  logoPlaceholderText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },

  title: {
    color: colors.text,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.semibold,
    letterSpacing: -0.5,
  },

  loadingContainer: {
    position: "absolute",
    bottom: spacing.xxxl,
    alignItems: "center",
  },

  loadingMessage: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    textAlign: "center",
  },

  spinner: {
    marginTop: spacing.md,
  },
});
