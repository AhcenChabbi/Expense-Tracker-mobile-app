import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { user } = useUser();
  return (
    <View className="flex-row items-center justify-between py-3 px-4">
      <View className="flex-row items-center gap-x-3">
        <View className="w-11 h-11 bg-brand-100 rounded-full items-center justify-center border-2 border-green-600">
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              className="w-full h-full rounded-full"
            />
          ) : (
            <Ionicons name="person" size={44} color="#965a3e" />
          )}
        </View>
        <View>
          <Text
            className="text-sm font-medium text-gray-600"
            accessible={false}
          >
            Welcome back,
          </Text>
          <Text className="font-bold text-lg text-brand-600" accessible={false}>
            {user?.username ||
              `${user?.firstName} ${user?.lastName}` ||
              user?.emailAddresses[0].emailAddress.split("@")[0]}
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
            <Ionicons name="add" size={16} color="white" />
            <Text className="font-semibold text-white text-sm">Create</Text>
          </TouchableOpacity>
        </Link>
        <LogoutButton />
      </View>
    </View>
  );
}
