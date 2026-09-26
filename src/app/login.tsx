import { router } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants/colors";
import { loginStyles } from "../features/auth/login.styles";

export default function LoginScreen() {
  return (
    <SafeAreaView style={loginStyles.safeArea} edges={["top", "bottom"]}>
      <View style={loginStyles.container}>
        <Pressable
          style={({ pressed }) => [
            loginStyles.backButton,
            pressed && loginStyles.pressed,
          ]}
          onPress={() => router.back()}
        >
          <Text style={loginStyles.backIcon}>‹</Text>
        </Pressable>

        <View style={loginStyles.content}>
          <Text style={loginStyles.title}>Welcome back</Text>

          <Text style={loginStyles.subtitle}>
            Sign in to continue to Task Library.
          </Text>

          <View style={loginStyles.form}>
            <View>
              <Text style={loginStyles.label}>Email address</Text>

              <TextInput
                placeholder="you@example.com"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={loginStyles.input}
              />
            </View>

            <View>
              <Text style={loginStyles.label}>Password</Text>

              <View style={loginStyles.passwordWrapper}>
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry
                  style={loginStyles.passwordInput}
                />

                <Text style={loginStyles.eyeIcon}>◉</Text>
              </View>
            </View>
          </View>

          <Pressable style={loginStyles.forgotButton}>
            <Text style={loginStyles.forgotText}>Forgot password?</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              loginStyles.primaryButton,
              pressed && loginStyles.buttonPressed,
            ]}
            onPress={() => router.replace("/home")}
          >
            <Text style={loginStyles.primaryButtonText}>Log in</Text>
          </Pressable>

          <Text style={loginStyles.continueText}>or continue with</Text>

          <View style={loginStyles.socialRow}>
            <Pressable
              style={({ pressed }) => [
                loginStyles.socialButton,
                pressed && loginStyles.buttonPressed,
              ]}
            >
              <Text style={loginStyles.googleIcon}>G</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                loginStyles.socialButton,
                pressed && loginStyles.buttonPressed,
              ]}
            >
              <Text style={loginStyles.appleIcon}>●</Text>
            </Pressable>
          </View>

          <Text style={loginStyles.switchText}>
            Don't have an account?{" "}
            <Text
              style={loginStyles.link}
              onPress={() => router.replace("/signup")}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
