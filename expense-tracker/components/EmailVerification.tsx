import {
  EmailVerificationSchema,
  emailVerificationSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  onVerifyPress: (code: string) => void;
};
export default function EmailVerification({ onVerifyPress }: Props) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EmailVerificationSchema>({
    resolver: zodResolver(emailVerificationSchema),
  });
  const onSubmit = (data: EmailVerificationSchema) => {
    onVerifyPress(data.code);
  };
  return (
    <SafeAreaView className="w-full flex-1 items-center justify-center px-4">
      <Text className="text-3xl text-center font-bold text-brand-600 mb-4">
        Verify your email
      </Text>
      <Controller
        control={control}
        name="code"
        render={({ field: { onBlur, onChange, value } }) => (
          <View className="w-full gap-y-1 mb-2">
            <TextInput
              placeholder="Enter your verification code"
              keyboardType="numeric"
              accessible
              accessibilityLabel="Code"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              className="px-4 py-3 border-2 border-border rounded-md w-full text-brand-600 bg-white text-lg"
            />
            {errors.code && (
              <Text className="text-red-500 text-sm">
                {errors.code.message}
              </Text>
            )}
          </View>
        )}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Verify your email"
        className="w-full items-center rounded-md bg-brand-500 py-3"
        onPress={handleSubmit(onSubmit)}
      >
        <Text>Verify</Text>
      </Pressable>
    </SafeAreaView>
  );
}
