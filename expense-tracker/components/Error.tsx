import { Pressable, Text, View } from "react-native";

export default function Error({ refetch }: { refetch: () => void }) {
  return (
    <View className="flex-1 w-full justify-center items-center gap-y-3">
      <Text className="text-lg text-brand-600 font-bold">
        Something went wrong
      </Text>
      <Pressable
        onPress={() => {
          refetch();
        }}
        className="flex-row items-center gap-x-2 bg-brand-300 px-4 py-2 rounded-full"
      >
        <Text className="text-lg text-white font-bold">Retry</Text>
      </Pressable>
    </View>
  );
}
