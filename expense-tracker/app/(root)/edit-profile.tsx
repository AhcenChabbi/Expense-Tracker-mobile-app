import AccountInformation from "@/components/AccountInformation";
import ChangeProfilePicture from "@/components/ChangeProfilePicture";
import ChangeUserPassword from "@/components/ChangeUserPassword";
import UpdatePersonalInformation from "@/components/UpdatePersonalInformation";
import React from "react";
import { ScrollView, View } from "react-native";

export default function EditProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <ChangeProfilePicture />
      <UpdatePersonalInformation />
      <ChangeUserPassword />
      <AccountInformation />
      {/* Bottom Spacing */}
      <View className="h-8" />
    </ScrollView>
  );
}
