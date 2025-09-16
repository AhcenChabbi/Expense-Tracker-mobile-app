import useSignInForm from "@/hooks/useSignInForm";
import { AuthSchema } from "@/lib/validation";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useSignInForm();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: AuthSchema) => {
    if (!isLoaded) return;
    const { email: emailAddress, password } = data;
    // Start the sign-in process using the email and password provided
    try {
      setIsLoading(true);
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      if (err.errors?.[0]?.code === "form_password_incorrect") {
        setError("root", {
          message: "Password is incorrect. Please try again.",
        });
      } else {
        setError("root", { message: "An error occurred. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-brand-100">
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={100}
        enabled
        className="flex-1 w-full"
      >
        <View className="flex-1 w-full items-center justify-center gap-y-4">
          <Image
            source={require("../../assets/images/revenue-i4.png")}
            resizeMode="contain"
            style={{ width: 300, height: 300 }}
            accessible={true}
            accessibilityLabel="Revenue app logo"
            accessibilityRole="image"
          />
          <View className="w-full px-4 gap-y-2">
            <Text
              accessible
              accessibilityLabel="Welcome Back"
              accessibilityRole="header"
              className="text-3xl text-center font-bold text-brand-700"
            >
              Welcome Back
            </Text>
            {errors.root && (
              <View
                accessible={true}
                accessibilityRole="alert"
                accessibilityLiveRegion="assertive"
                className="items-center justify-center w-full"
              >
                <Text className="text-red-600 text-base font-bold">
                  {errors.root.message}
                </Text>
              </View>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType="email-address"
                  placeholder="Email"
                  autoComplete="email"
                  autoCapitalize="none"
                  returnKeyType="next"
                  accessible
                  accessibilityLabel={
                    errors.email
                      ? `Email input, error: ${errors.email.message}`
                      : "Email input"
                  }
                  accessibilityHint="Enter your email address"
                  className={`px-4 py-3 border-2 ${
                    errors.email ? "border-red-500" : "border-brand-600"
                  } rounded-md w-full text-brand-600 bg-white text-lg dark:text-white`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text
                accessibilityRole="alert"
                accessibilityLiveRegion="polite"
                className="text-red-500 text-sm"
              >
                {errors.email.message}
              </Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  secureTextEntry
                  placeholder="Password"
                  autoCapitalize="none"
                  returnKeyType="done"
                  accessible
                  accessibilityLabel={
                    errors.password
                      ? `Password input, error: ${errors.password.message}`
                      : "Password input"
                  }
                  accessibilityHint="Enter your password"
                  className={`px-4 py-3 border-2 ${
                    errors.password ? "border-red-500" : "border-brand-600"
                  } rounded-md w-full text-brand-600 bg-white text-lg dark:text-white`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text
                accessibilityRole="alert"
                accessibilityLiveRegion="polite"
                className="text-red-500 text-sm"
              >
                {errors.password.message}
              </Text>
            )}
            <Pressable
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel={
                isLoading
                  ? "Signing in, please wait"
                  : "Sign in to your account"
              }
              accessibilityHint={
                isLoading
                  ? "Loading in progress"
                  : "Tap to sign in with your email and password"
              }
              accessibilityState={{
                disabled: isLoading,
                busy: isLoading,
              }}
              className={`w-full items-center rounded-md py-3 ${
                isLoading ? "bg-brand-300" : "bg-brand-500"
              }`}
              onPress={handleSubmit(onSubmit)}
            >
              {isLoading ? (
                <ActivityIndicator color={"white"} className="animate-spin" />
              ) : (
                <Text className="text-white font-bold text-lg">Sign in</Text>
              )}
            </Pressable>
            <View
              className="flex-row items-center gap-x-2 justify-center"
              accessible={true}
              accessibilityRole="text"
            >
              <Text className="text-brand-400 dark:text-brand-100 text-base">
                Don&apos;t have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-brand-500 font-bold dark:text-brand-200 text-base"
                accessibilityRole="link"
                accessibilityLabel="Sign Up"
                accessibilityHint="Navigate to sign up page"
              >
                Sign Up
              </Link>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
