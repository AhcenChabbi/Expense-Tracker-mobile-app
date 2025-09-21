import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { Text, View } from "react-native";

export default function AccountInformation() {
  const { user } = useUser();
  return (
    <View className="bg-white mx-4 mt-4 rounded-2xl p-6 shadow-sm">
      <Text className="text-brand-800 text-lg font-semibold mb-4">
        Account Information
      </Text>

      <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
        <Text className="text-gray-600">User ID</Text>
        <Text className="text-brand-600 font-mono text-sm">
          {user?.id.slice(-8)}
        </Text>
      </View>

      {user?.createdAt && (
        <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
          <Text className="text-gray-600">Member Since</Text>
          <Text className="text-brand-600">
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
      )}

      {user?.updatedAt && (
        <View className="flex-row items-center justify-between py-3">
          <Text className="text-gray-600">Last Updated</Text>
          <Text className="text-brand-600">
            {new Date(user.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
        </View>
      )}
    </View>
  );
}
