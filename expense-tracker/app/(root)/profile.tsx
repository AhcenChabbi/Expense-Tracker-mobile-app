import formatDate from "@/utils/format-date";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/sign-in");
        },
      },
    ]);
  };

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const menuItems = [
    {
      id: 1,
      title: "Personal Information",
      icon: "person-outline",
      onPress: handleEditProfile,
    },
    {
      id: 2,
      title: "Security Settings",
      icon: "shield-outline",
      onPress: () => router.push("/profile"),
    },
    {
      id: 3,
      title: "Notifications",
      icon: "notifications-outline",
      onPress: () => router.push("/profile"),
    },
    {
      id: 4,
      title: "Privacy Policy",
      icon: "document-outline",
      onPress: () => router.push("/profile"),
    },
    {
      id: 5,
      title: "Help & Support",
      icon: "help-circle-outline",
      onPress: () => router.push("/profile"),
    },
  ];

  if (!user) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#965a3e" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-brand-600  px-4">
        <View className="flex-row items-center justify-between py-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-semibold">Profile</Text>
          <View className="w-6" />
        </View>

        {/* User Profile Section */}
        <View className="items-center  pb-8">
          <View className="w-24 h-24 bg-brand-100 rounded-full items-center justify-center mb-4">
            {user.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <Ionicons name="person" size={40} color="#965a3e" />
            )}
          </View>

          <Text className="text-white text-2xl font-bold mb-1">
            {user.fullName ||
              `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
              user.emailAddresses[0].emailAddress.split("@")[0]}
          </Text>

          <Text className="text-brand-100 text-base mb-4">
            {user.primaryEmailAddress?.emailAddress}
          </Text>

          <TouchableOpacity
            onPress={handleEditProfile}
            className="bg-brand-100 px-6 py-2 rounded-full"
          >
            <Text className="text-brand-600 font-semibold">Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Stats */}
      <View className="bg-white mx-4 mt-6 rounded-2xl p-6 shadow-sm">
        <Text className="text-brand-800 text-lg font-semibold mb-4">
          Profile Overview
        </Text>

        <View className="flex-row justify-between">
          <View className="items-center flex-1">
            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
              <Ionicons name="checkmark-circle" size={24} color="#10b981" />
            </View>
            <Text className="text-gray-600 text-sm">Verified</Text>
            <Text className="text-brand-600 font-semibold">Email</Text>
          </View>

          <View className="items-center flex-1">
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
              <Ionicons name="calendar" size={24} color="#3b82f6" />
            </View>
            {user.createdAt && (
              <>
                <Text className="text-gray-600 text-sm">Joined</Text>
                <Text className="text-brand-600 font-semibold">
                  {formatDate(user.createdAt.toString())}
                </Text>
              </>
            )}
          </View>

          <View className="items-center flex-1">
            <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mb-2">
              <Ionicons name="shield-checkmark" size={24} color="#8b5cf6" />
            </View>
            <Text className="text-gray-600 text-sm">Security</Text>
            <Text className="text-brand-600 font-semibold">Protected</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View className="bg-white mx-4 mt-4 rounded-2xl shadow-sm overflow-hidden">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={item.onPress}
            className={`flex-row items-center justify-between px-6 py-4 ${
              index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-brand-50 rounded-full items-center justify-center mr-4">
                <Ionicons name={item.icon as any} size={20} color="#965a3e" />
              </View>
              <Text className="text-brand-800 text-base font-medium">
                {item.title}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out Button */}
      <View className="mx-4 mt-6 mb-8">
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-red-500 rounded-2xl py-4 items-center"
        >
          <Text className="text-white text-base font-semibold">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
