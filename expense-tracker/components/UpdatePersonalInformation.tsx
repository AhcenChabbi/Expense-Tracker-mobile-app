import { updateUserSchema, UpdateUserSchema } from "@/lib/validation";
import { useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function UpdatePersonalInformation() {
  const { user } = useUser();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({ resolver: zodResolver(updateUserSchema) });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.firstName) setValue("firstName", user.firstName);
      if (user.lastName) setValue("lastName", user.lastName);
      if (user.username) setValue("username", user.username);
    }
  }, [user, setValue]);

  const onSubmit = async (formData: UpdateUserSchema) => {
    if (!user) return;

    try {
      setLoading(true);
      if (
        formData.firstName !== user.firstName ||
        formData.lastName !== user.lastName ||
        formData.username !== user.username
      ) {
        await user.update({
          ...(formData.firstName && { firstName: formData.firstName }),
          ...(formData.lastName && { lastName: formData.lastName }),
          ...(formData.username && { username: formData.username }),
        });
      }

      Alert.alert("Success", "Your profile has been updated successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.errors?.[0]?.message ||
          "Failed to update profile. Please try again."
      );
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-white mx-4 mt-4 rounded-2xl p-6 shadow-sm">
      <Text className="text-brand-800 text-lg font-semibold mb-4">
        Personal Information
      </Text>

      {/* Username */}
      <View className="mb-4">
        <Text className="text-brand-700 text-sm font-medium mb-2">
          Username
        </Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter your username"
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-brand-800 text-base"
              placeholderTextColor="#9ca3af"
            />
          )}
        />
        {errors.username && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.username.message}
          </Text>
        )}
      </View>

      {/* First Name */}
      <View className="mb-4">
        <Text className="text-brand-700 text-sm font-medium mb-2">
          First Name
        </Text>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter your first name"
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-brand-800 text-base"
              placeholderTextColor="#9ca3af"
            />
          )}
        />
        {errors.firstName && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.firstName.message}
          </Text>
        )}
      </View>

      {/* Last Name */}
      <View className="mb-4">
        <Text className="text-brand-700 text-sm font-medium mb-2">
          Last Name
        </Text>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter your last name"
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-brand-800 text-base"
              placeholderTextColor="#9ca3af"
            />
          )}
        />
        {errors.lastName && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.lastName.message}
          </Text>
        )}
      </View>
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
            Save
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
