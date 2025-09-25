import useChangeUserPassword from "@/hooks/useChangeUserPassword";
import { UpdateUserPasswordSchema } from "@/lib/validation";
import { useUser } from "@clerk/clerk-expo";
import { Checkbox } from "expo-checkbox";
import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChangeUserPassword() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useChangeUserPassword();

  const onSubmit = async (data: UpdateUserPasswordSchema) => {
    if (!user) return;

    try {
      setLoading(true);
      await user.updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        signOutOfOtherSessions: data.signOutOfOtherSessions,
      });

      Alert.alert("Success", "Your password has been updated successfully!", [
        {
          text: "OK",
          onPress: () => {
            reset();
          },
        },
      ]);
    } catch (error: any) {
      let errorMessage = "Failed to update password. Please try again.";

      if (error.errors && error.errors.length > 0) {
        errorMessage = error.errors[0].message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert("Error", errorMessage);
      console.error("Error updating password:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="bg-white mx-4 mt-4 rounded-2xl p-6 shadow-sm">
      <Text className="text-brand-800 text-lg font-semibold mb-4">
        Change Password
      </Text>

      {/* Current Password */}
      <View className="mb-4">
        <Text className="text-brand-700 text-sm font-medium mb-2">
          Current Password
        </Text>
        <Controller
          control={control}
          name="currentPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="relative">
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your current password"
                secureTextEntry={true}
                className={`bg-gray-50 border rounded-xl px-4 py-3 text-brand-800 text-base ${
                  errors.currentPassword ? "border-red-500" : "border-gray-200"
                }`}
                placeholderTextColor="#9ca3af"
              />
            </View>
          )}
        />
        {errors.currentPassword && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.currentPassword.message}
          </Text>
        )}
      </View>

      {/* New Password */}
      <View className="mb-4">
        <Text className="text-brand-700 text-sm font-medium mb-2">
          New Password
        </Text>
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="relative">
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your new password"
                secureTextEntry={true}
                className={`bg-gray-50 border rounded-xl px-4 py-3 text-brand-800 text-base ${
                  errors.newPassword ? "border-red-500" : "border-gray-200"
                }`}
                placeholderTextColor="#9ca3af"
              />
            </View>
          )}
        />

        {errors.newPassword && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.newPassword.message}
          </Text>
        )}
      </View>

      {/* Confirm New Password */}
      <View className="mb-6">
        <Text className="text-brand-700 text-sm font-medium mb-2">
          Confirm New Password
        </Text>
        <Controller
          control={control}
          name="confirmNewPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="relative">
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Confirm your new password"
                secureTextEntry={true}
                className={`bg-gray-50 border rounded-xl px-4 py-3 text-brand-800 text-base ${
                  errors.confirmNewPassword
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
                placeholderTextColor="#9ca3af"
              />
            </View>
          )}
        />
        {errors.confirmNewPassword && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.confirmNewPassword.message}
          </Text>
        )}
      </View>
      <View className="mb-6">
        <Controller
          control={control}
          name="signOutOfOtherSessions"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-start">
              <Checkbox
                style={{ width: 16, height: 16, marginTop: 4, marginRight: 8 }}
                value={value}
                onValueChange={onChange}
                color="#7a4532"
              />
              <View className="flex-1">
                <Text className="text-brand-800 text-sm font-medium">
                  Sign out of all other devices
                </Text>
                <Text className="text-gray-600 text-xs mt-1">
                  This will require you to sign in again on other devices for
                  added security
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Password Requirements */}
      <View className="bg-brand-50 rounded-xl p-4 mb-6">
        <Text className="text-brand-700 text-sm font-medium mb-2">
          Password Requirements:
        </Text>
        <View className="space-y-1">
          <Text className="text-brand-600 text-xs">
            • At least 8 characters long
          </Text>
          <Text className="text-brand-600 text-xs">
            • Contains uppercase letter (A-Z)
          </Text>
          <Text className="text-brand-600 text-xs">
            • Contains lowercase letter (a-z)
          </Text>
          <Text className="text-brand-600 text-xs">
            • Contains number (0-9)
          </Text>
          <Text className="text-brand-600 text-xs">
            • Contains special character (@$!%*?&)
          </Text>
        </View>
      </View>

      {/* Update Password Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || loading}
        className={`rounded-xl py-4 items-center ${
          isValid && !loading ? "bg-brand-600" : "bg-gray-300"
        }`}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            className={`font-semibold ${
              isValid ? "text-white" : "text-gray-500"
            }`}
          >
            Update Password
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
