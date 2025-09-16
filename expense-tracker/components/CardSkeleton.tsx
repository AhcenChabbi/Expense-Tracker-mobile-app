import { View } from "react-native";

export default function CardSkeleton() {
  return (
    <View className="px-4 mt-5">
      <View className="bg-white rounded-2xl p-5 gap-y-5 border border-gray-100 animate-pulse">
        {/* Balance Skeleton */}
        <View className="py-2">
          <View className="h-4 w-24 bg-gray-200 rounded mb-2" />
          <View className="h-8 w-40 bg-gray-300 rounded" />
        </View>

        {/* Divider */}
        <View className="h-px bg-gray-200" />

        {/* Income & Expenses Row */}
        <View className="flex-row">
          {/* Income */}
          <View className="flex-1">
            <View className="h-4 w-16 bg-gray-200 rounded mb-2" />
            <View className="h-6 w-24 bg-gray-300 rounded" />
          </View>

          {/* Divider */}
          <View className="w-px bg-gray-200 mx-4" />

          {/* Expenses */}
          <View>
            <View className="h-4 w-16 bg-gray-200 rounded mb-2" />
            <View className="h-6 w-24 bg-gray-300 rounded" />
          </View>
        </View>
      </View>
    </View>
  );
}
