import { View } from "react-native";

export default function TransactionItemSkeleton() {
  return (
    <View className="flex-row items-center bg-white justify-between px-4 py-3 rounded-xl border border-gray-100 animate-pulse">
      {/* Left side */}
      <View className="flex-row items-center gap-x-3 flex-1">
        {/* Icon placeholder */}
        <View className="bg-gray-200 p-5 rounded-xl" />

        {/* Title + Category */}
        <View className="flex-1">
          <View className="h-4 w-32 bg-gray-200 rounded mb-2" />
          <View className="h-3 w-20 bg-gray-200 rounded" />
        </View>
      </View>

      {/* Right side */}
      <View className="flex-row items-center gap-x-3">
        <View className="items-end">
          <View className="h-4 w-16 bg-gray-200 rounded mb-2" />
          <View className="h-3 w-12 bg-gray-200 rounded" />
        </View>

        {/* Delete button placeholder */}
        <View className="border-l border-gray-200 pl-3">
          <View className="bg-gray-200 p-4 rounded-xl" />
        </View>
      </View>
    </View>
  );
}
