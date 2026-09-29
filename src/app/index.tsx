import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSettings } from "../context/SettingsContext";
import { useTheme } from "../context/ThemeContext";
import { createSplashStyles } from "../features/auth/splash.styles";

const SPLASH_DURATION = 2500;

export default function SplashScreen() {
  const { theme } = useSettings();
  const { colors } = useTheme();
  const splashStyles = useMemo(() => createSplashStyles(colors), [colors]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/welcome");
    }, SPLASH_DURATION);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={splashStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <View style={splashStyles.container}>
        <View style={splashStyles.centerContent}>
          {/* Temporary logo placeholder.
              The final Task Library logo asset will replace this
              without changing the surrounding layout. */}
          <View style={splashStyles.logoPlaceholder}>
            <View style={splashStyles.logoShapeOne} />
            <View style={splashStyles.logoShapeTwo} />
            <View style={splashStyles.logoShapeThree} />
          </View>

          <Text style={splashStyles.title}>Task Library</Text>

          <Text style={splashStyles.subtitle}>
            Smarter planning.
            {"\n"}
            Greater productivity.
          </Text>
        </View>

        <View style={splashStyles.progressTrack}>
          <View style={splashStyles.progressFill} />
        </View>
      </View>
    </SafeAreaView>
  );
}
