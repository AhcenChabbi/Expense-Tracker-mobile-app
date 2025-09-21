import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
export default function ChangeProfilePicture() {
  const { user } = useUser();
  const [imageLoading, setImageLoading] = useState(false);
  if (!user) return null;
  const handleImagePicker = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert(
        "Permission Required",
        "Please grant camera roll permissions to change your profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      try {
        setImageLoading(true);
        const imageDataUrl = `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`;
        await user?.setProfileImage({
          file: imageDataUrl,
        });
        Alert.alert("Success", "Profile picture updated successfully!");
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to update profile picture. Please try again."
        );
        console.error("Error updating profile image:", error);
      } finally {
        setImageLoading(false);
      }
    }
  };
  return (
    <View className="bg-white mx-4 mt-6 rounded-2xl p-6 shadow-sm">
      <Text className="text-brand-800 text-lg font-semibold mb-4">
        Profile Picture
      </Text>

      <View className="items-center">
        <View className="relative">
          <View className="w-24 h-24 bg-brand-100 rounded-full items-center justify-center">
            {user.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <Ionicons name="person" size={40} color="#965a3e" />
            )}

            {imageLoading && (
              <View className="absolute inset-0 bg-black/50 rounded-full items-center justify-center">
                <ActivityIndicator size="small" color="white" />
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={handleImagePicker}
            disabled={imageLoading}
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-600 rounded-full items-center justify-center"
          >
            <Ionicons name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="text-gray-600 text-sm mt-2">
          Tap the camera icon to change
        </Text>
      </View>
    </View>
  );
}
