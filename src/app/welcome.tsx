import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { welcomeStyles } from "../features/auth/welcome.styles";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={welcomeStyles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="light" />

      <View style={welcomeStyles.container}>
        <View style={welcomeStyles.content}>
          {/* Temporary logo placeholder */}
          <View style={welcomeStyles.logoPlaceholder}>
            <View style={welcomeStyles.logoShapeOne} />
            <View style={welcomeStyles.logoShapeTwo} />
            <View style={welcomeStyles.logoShapeThree} />
          </View>

          <Text style={welcomeStyles.title}>Task Library</Text>

          <Text style={welcomeStyles.subtitle}>
            Turn your ideas into{"\n"}
            actionable plans.
          </Text>

          {/* Temporary illustration placeholder */}
          <View style={welcomeStyles.illustrationPlaceholder}>
            <View style={welcomeStyles.illustrationCardBack} />
            <View style={welcomeStyles.illustrationCardMiddle} />
            <View style={welcomeStyles.illustrationCardFront}>
              <View style={welcomeStyles.illustrationLine} />
              <View style={welcomeStyles.illustrationLineShort} />
            </View>
          </View>
        </View>

        <View style={welcomeStyles.actions}>
          <Pressable
            style={({ pressed }) => [
              welcomeStyles.primaryButton,
              pressed && welcomeStyles.buttonPressed,
            ]}
            onPress={() => router.push("/signup")}
          >
            <Text style={welcomeStyles.primaryButtonText}>Get Started</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => pressed && welcomeStyles.linkPressed}
            onPress={() => router.push("/login")}
          >
            <Text style={welcomeStyles.loginLink}>
              I already have an account
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
