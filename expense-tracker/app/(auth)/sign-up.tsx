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
import "../../global.css";
export default function SignUp() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  if (pendingVerification) {
    return (
      <EmailVerification onVerifyPress={onVerifyPress} isLoading={isLoading} />
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={100}
      accessible
      enabled
      accessibilityLabel="Sign up screen"
      className="flex-1 w-full bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200"
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
          <View className="mb-2 items-center">
            <Text
              accessible={true}
              accessibilityLabel="Welcome Back"
              accessibilityRole="header"
              className="text-3xl font-bold text-brand-700 mb-2"
            >
              Create Account
            </Text>
            <Text
              accessible={true}
              accessibilityRole="text"
              className="text-base text-brand-500 text-center leading-relaxed"
            >
              Enter your email and password to create an account
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
                autoComplete="email"
                placeholderTextColor="#cea68d"
                autoCapitalize="none"
                returnKeyType="next"
                accessible
                accessibilityLabel={
                  errors.email
                    ? `Email input field, error: ${errors.email.message}`
                    : "Email input field"
                }
                accessibilityHint="Enter your email address to create an account"
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
                accessibilityHint="Enter a secure password for your account"
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
                  Signing up...
                </Text>
              </View>
            ) : (
              <Text className="text-white font-bold text-lg">Sign Up</Text>
            )}
          </Pressable>
          <View
            className="flex-row items-center justify-center mt-8"
            accessible={true}
            accessibilityLabel="Sign In option"
          >
            <Text className="text-brand-500 text-base font-medium mr-1">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-brand-600 font-bold text-base ml-1 underline"
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
  );
}
