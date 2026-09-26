import { router } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants/colors";
import { signupStyles } from "../features/auth/signup.styles";

export default function SignupScreen() {
  return (
    <SafeAreaView style={signupStyles.safeArea} edges={["top", "bottom"]}>
      <View style={signupStyles.container}>
        <Pressable
          style={({ pressed }) => [
            signupStyles.backButton,
            pressed && signupStyles.pressed,
          ]}
          onPress={() => router.back()}
        >
          <Text style={signupStyles.backIcon}>‹</Text>
        </Pressable>

        <View style={signupStyles.content}>
          <Text style={signupStyles.title}>Create your account</Text>

          <Text style={signupStyles.subtitle}>
            Get started with Task Library today.
          </Text>

          <View style={signupStyles.form}>
            <View>
              <Text style={signupStyles.label}>Full name</Text>

              <TextInput
                placeholder="John Doe"
                placeholderTextColor={colors.textMuted}
                style={signupStyles.input}
              />
            </View>

            <View>
              <Text style={signupStyles.label}>Email address</Text>

              <TextInput
                placeholder="you@example.com"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={signupStyles.input}
              />
            </View>

            <View>
              <Text style={signupStyles.label}>Password</Text>

              <View style={signupStyles.passwordWrapper}>
                <TextInput
                  placeholder="••••••••••"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry
                  style={signupStyles.passwordInput}
                />

                <Text style={signupStyles.eyeIcon}>◉</Text>
              </View>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              signupStyles.primaryButton,
              pressed && signupStyles.buttonPressed,
            ]}
            onPress={() => router.replace("/login")}
          >
            <Text style={signupStyles.primaryButtonText}>Sign Up</Text>
          </Pressable>

          <Text style={signupStyles.continueText}>or continue with</Text>

          <View style={signupStyles.socialRow}>
            <Pressable
              style={({ pressed }) => [
                signupStyles.socialButton,
                pressed && signupStyles.buttonPressed,
              ]}
            >
              <Text style={signupStyles.googleIcon}>G</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                signupStyles.socialButton,
                pressed && signupStyles.buttonPressed,
              ]}
            >
              <Text style={signupStyles.appleIcon}>●</Text>
            </Pressable>
          </View>

          <Text style={signupStyles.switchText}>
            Already have an account?{" "}
            <Text
              style={signupStyles.link}
              onPress={() => router.replace("/login")}
            >
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
