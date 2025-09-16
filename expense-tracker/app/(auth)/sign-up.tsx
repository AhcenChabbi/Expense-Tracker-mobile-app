import EmailVerification from "@/components/EmailVerification";
import useSignUpForm from "@/hooks/useSignUpForm";
import { AuthSchema } from "@/lib/validation";
import { useSignUp } from "@clerk/clerk-expo";
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
export default function SignUp() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useSignUpForm();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const onSubmit = async (data: AuthSchema) => {
    if (!isLoaded) return;
    const { email: emailAddress, password } = data;
    try {
      setIsLoading(true);
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err: any) {
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        setError("root", {
          message: "That email address is already in use. Please try another.",
        });
      } else {
        setError("root", { message: "An error occurred. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };
  const onVerifyPress = async (code: string) => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  if (pendingVerification) {
    return <EmailVerification onVerifyPress={onVerifyPress} />;
  }
  return (
    <SafeAreaView className="flex-1 bg-brand-100">
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={100}
        className="flex-1 w-full"
      >
        <View className="flex-1 w-full items-center justify-center gap-y-4">
          <Image
            source={require("../../assets/images/revenue-i2.png")}
            resizeMode="contain"
            accessible={true}
            accessibilityLabel="Revenue app logo"
            accessibilityRole="image"
            style={{ width: 300, height: 300 }}
          />
          <View className="w-full px-4 gap-y-2">
            <Text
              className="text-2xl text-center font-bold text-brand-700"
              accessible
              accessibilityRole="header"
            >
              Create Account
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
                  accessibilityHint="Enter your email address to create an account"
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
                  accessibilityHint="Enter a secure password for your account"
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
                  ? "Creating account, please wait"
                  : "Create your account"
              }
              accessibilityHint={
                isLoading
                  ? "Account creation in progress"
                  : "Tap to create a new account with your email and password"
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
                <Text className="text-white font-bold text-lg">Sign Up</Text>
              )}
            </Pressable>
            <View
              accessible={true}
              accessibilityRole="text"
              className="flex-row items-center gap-x-2 justify-center"
            >
              <Text className="text-brand-400 text dark:text-brand-100 text-base">
                Already have an account?
              </Text>
              <Link
                href="/sign-in"
                className="text-brand-500 font-bold dark:text-brand-200 text-base"
                accessibilityRole="link"
                accessibilityLabel="Sign In"
                accessibilityHint="Navigate to sign in page"
              >
                Sign In
              </Link>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
