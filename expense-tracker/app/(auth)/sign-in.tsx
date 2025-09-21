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
import "../../global.css";
export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
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
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={100}
      enabled
      className="flex-1 w-full bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200"
      accessible={true}
      accessibilityLabel="Sign in screen"
    >
      <View
        className="flex-1 w-full items-center justify-center gap-y-4"
        accessible={true}
        accessibilityRole="image"
      >
        <Image
          source={require("../../assets/images/revenue-i4.png")}
          resizeMode="contain"
          style={{ width: 300, height: 300 }}
          accessible={true}
          accessibilityLabel="Revenue app logo"
          accessibilityRole="image"
        />
        <View className="w-full px-4 gap-y-2">
          <View className="mb-2 items-center">
            <Text
              accessible={true}
              accessibilityLabel="Welcome Back"
              accessibilityRole="header"
              className="text-3xl font-bold text-brand-700 mb-2"
            >
              Welcome Back
            </Text>
            <Text
              accessible={true}
              accessibilityRole="text"
              className="text-base text-brand-500 text-center leading-relaxed"
            >
              Sign in to continue to your account
            </Text>
          </View>
          {errors.root && (
            <View
              accessible={true}
              accessibilityRole="alert"
              accessibilityLiveRegion="assertive"
              accessibilityLabel={`Error: ${errors.root.message}`}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl"
            >
              <Text className="text-red-700 text-base font-medium text-center">
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
                placeholder="Enter your email"
                placeholderTextColor="#cea68d"
                autoComplete="email"
                autoCapitalize="none"
                returnKeyType="next"
                accessible={true}
                accessibilityLabel={
                  errors.email
                    ? `Email input field, error: ${errors.email.message}`
                    : "Email input field"
                }
                accessibilityHint="Enter your email address to sign in"
                className={`px-5 py-4 border-2 ${
                  errors.email
                    ? "border-red-400 bg-red-50"
                    : "border-brand-600 bg-white"
                } rounded-xl w-full font-medium  text-base text-brand-700 dark:text-white`}
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
              className="text-red-600 text-sm font-medium"
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
                secureTextEntry={true}
                placeholder="Enter your password"
                placeholderTextColor="#cea68d"
                autoCapitalize="none"
                returnKeyType="done"
                accessible={true}
                accessibilityLabel={
                  errors.password
                    ? `Password input field, error: ${errors.password.message}`
                    : "Password input field"
                }
                accessibilityHint="Enter your password to sign in"
                className={`px-5 py-4 border-2 ${
                  errors.email
                    ? "border-red-400 bg-red-50"
                    : "border-brand-600 bg-white"
                } rounded-xl w-full font-medium  text-base text-brand-700 dark:text-white`}
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
              className="text-red-600 text-sm font-medium"
            >
              {errors.password.message}
            </Text>
          )}
          <Pressable
            disabled={isLoading || !isValid}
            accessibilityRole="button"
            accessibilityLabel={
              isLoading ? "Signing in, please wait" : "Sign in to your account"
            }
            accessibilityHint={
              isLoading
                ? "Loading in progress"
                : "Tap to sign in with your email and password"
            }
            accessibilityState={{
              disabled: isLoading || !isValid,
              busy: isLoading,
            }}
            className={`w-full items-center rounded-2xl py-4 ${
              isLoading || !isValid ? "bg-brand-300" : "bg-brand-500"
            }`}
            onPress={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <View
                className="flex-row items-center gap-x-3"
                accessible={true}
                accessibilityRole="progressbar"
                accessibilityLabel="Loading"
              >
                <ActivityIndicator
                  color="white"
                  size="small"
                  accessible={false}
                />
                <Text className="text-white font-semibold text-base">
                  Signing in...
                </Text>
              </View>
            ) : (
              <Text className="text-white font-bold text-lg">Sign in</Text>
            )}
          </Pressable>
          <View
            className="flex-row items-center justify-center mt-8"
            accessible={true}
            accessibilityLabel="Sign up option"
          >
            <Text className="text-brand-500 text-base font-medium mr-1">
              Don&apos;t have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-brand-600 font-bold text-base ml-1 underline"
              accessibilityRole="link"
              accessibilityLabel="Create new account"
              accessibilityHint="Navigate to sign up page to create a new account"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
