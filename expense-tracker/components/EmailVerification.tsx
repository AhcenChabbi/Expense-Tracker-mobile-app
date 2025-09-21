import {
  EmailVerificationSchema,
  emailVerificationSchema,
} from "@/lib/validation";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  onVerifyPress: (code: string) => void;
  isLoading: boolean;
};
export default function EmailVerification({ onVerifyPress, isLoading }: Props) {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<EmailVerificationSchema>({
    resolver: zodResolver(emailVerificationSchema),
  });
  const onSubmit = (data: EmailVerificationSchema) => {
    onVerifyPress(data.code);
  };
  const codeValue = useWatch({ control, name: "code", defaultValue: "" });
  return (
    <View
      className="w-full flex-1 items-center justify-center px-4"
      accessible={true}
      accessibilityLabel="Email verification screen"
    >
      <View
        className="items-center mb-8"
        accessible={true}
        accessibilityLabel="Verification header"
      >
        {/* Icon */}
        <View
          className="mb-6 p-4 bg-brand-100 rounded-full border-2 border-brand-200"
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel="Email verification icon"
        >
          <Ionicons
            name="mail-outline"
            size={32}
            color="#7a4532"
            accessible={false}
          />
        </View>

        <Text
          className="text-3xl text-center font-bold text-brand-700 mb-3"
          accessible={true}
          accessibilityRole="header"
        >
          Verify Your Email
        </Text>

        <Text
          className="text-base text-brand-500 text-center leading-relaxed px-2"
          accessible={true}
          accessibilityRole="text"
        >
          We&apos;ve sent a verification code to your email address. Enter the
          code below to continue.
        </Text>
      </View>
      <View className="w-full gap-y-6">
        <Controller
          control={control}
          name="code"
          render={({ field: { onBlur, onChange, value } }) => (
            <View className="w-full">
              <Text
                className="text-brand-700 font-semibold mb-3 text-base"
                accessible={true}
                accessibilityRole="text"
              >
                Verification Code
              </Text>
              <TextInput
                placeholder="Enter 6-digit code"
                placeholderTextColor="#cea68d"
                keyboardType="number-pad"
                maxLength={6}
                textAlign="center"
                accessible={true}
                accessibilityLabel={
                  errors.code
                    ? `Verification code input, error: ${errors.code.message}`
                    : "Verification code input"
                }
                accessibilityHint="Enter the 6-digit verification code sent to your email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                className={`px-5 py-4 border-2 ${
                  errors.code
                    ? "border-red-400 bg-red-50"
                    : codeValue.length === 6
                      ? "border-green-400 bg-green-50"
                      : "border-brand-200 bg-white"
                } rounded-2xl w-full text-brand-700 text-xl font-mono tracking-widest`}
              />
              {errors.code && (
                <Text
                  accessibilityRole="alert"
                  accessibilityLiveRegion="polite"
                  className="text-red-600 text-sm font-medium mt-2 ml-2"
                >
                  {errors.code.message}
                </Text>
              )}
            </View>
          )}
        />
        <Pressable
          disabled={isLoading || !isValid}
          accessibilityRole="button"
          accessibilityLabel={
            isLoading ? "Verifying code, please wait" : "Verify email address"
          }
          accessibilityHint={
            isLoading
              ? "Verification in progress"
              : "Tap to verify your email with the entered code"
          }
          accessibilityState={{
            disabled: isLoading || !isValid,
            busy: isLoading,
          }}
          className={`w-full items-center justify-center rounded-2xl py-4  ${
            isLoading || !isValid ? "bg-brand-300" : "bg-brand-600"
          }`}
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <View
              className="flex-row items-center space-x-3"
              accessible={true}
              accessibilityRole="progressbar"
              accessibilityLabel="Verifying"
            >
              <ActivityIndicator size={20} color="white" accessible={false} />
              <Text className="text-white font-semibold text-base">
                Verifying...
              </Text>
            </View>
          ) : (
            <Text className="text-white font-bold text-lg">Verify Email</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
