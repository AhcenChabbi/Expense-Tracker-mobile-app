import { useClerk } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, TouchableOpacity } from "react-native";

const LogoutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();
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
  return (
    <TouchableOpacity
      onPress={handleSignOut}
      className="p-2.5 rounded-full bg-red-50 border border-red-100"
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Sign out"
      accessibilityHint="Sign out of your account"
    >
      <Ionicons name="exit-outline" size={20} color="#dc2626" />
    </TouchableOpacity>
  );
};

export default LogoutButton;
