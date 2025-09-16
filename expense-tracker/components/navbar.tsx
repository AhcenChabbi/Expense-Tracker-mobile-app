import { useUser } from "@clerk/clerk-expo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { user } = useUser();
  return (
    <View className="flex-row items-center justify-between py-3 px-4">
      <View className="flex-row items-center gap-x-3">
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 45, height: 45 }}
          className="rounded-full border-2 border-brand-600"
        />
        <View>
          <Text
            className="text-sm font-medium text-gray-600"
            accessible={false}
          >
            Welcome back,
          </Text>
          <Text className="font-bold text-lg text-brand-600" accessible={false}>
            {user?.emailAddresses[0].emailAddress.split("@")[0]}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-x-3">
        <Link href="/create" asChild>
          <TouchableOpacity
            className="flex-row items-center gap-x-2 bg-brand-600 py-2.5 px-4 rounded-full  border border-brand-700"
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Create new transaction"
            accessibilityHint="Navigate to create transaction screen"
          >
            <AntDesign name="plus" size={16} color="white" />
            <Text className="font-semibold text-white text-sm">Create</Text>
          </TouchableOpacity>
        </Link>
        <LogoutButton />
      </View>
    </View>
  );
}
