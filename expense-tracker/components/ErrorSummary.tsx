import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
type Props = {
  refetch: () => void;
};
export default function ErrorSummary({ refetch }: Props) {
  return (
    <View
      className="px-4 mt-5"
      accessible={true}
      accessibilityRole="alert"
      accessibilityLabel="Error loading summary data"
      accessibilityLiveRegion="assertive"
    >
      <View className="bg-white/95 backdrop-blur-sm items-center rounded-3xl p-6 border border-red-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <View className="absolute top-0 right-0 w-20 h-20 bg-red-50 rounded-full -translate-y-10 translate-x-10" />
        <View className="absolute bottom-0 left-0 w-16 h-16 bg-red-100/50 rounded-full -translate-x-8 translate-y-8" />

        {/* Error icon container */}
        <View
          className="mb-4 p-4 bg-red-50 rounded-full border-2 border-red-100"
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel="Error icon"
        >
          <Ionicons
            name="alert-circle-outline"
            size={32}
            color="#dc2626"
            accessible={false}
          />
        </View>

        {/* Error message section */}
        <View
          className="mb-6 items-center space-y-2"
          accessible={true}
          accessibilityLabel="Error details"
        >
          <Text
            className="text-red-700 font-bold text-xl text-center"
            accessible={true}
            accessibilityRole="header"
          >
            Unable to Load Summary
          </Text>

          <Text
            className="text-red-600 text-base text-center leading-relaxed px-2 max-w-xs"
            accessible={true}
            accessibilityRole="text"
          >
            We encountered an issue while fetching your financial summary.
            Please try again.
          </Text>

          {/* Additional context */}
          <Text
            className="text-red-500 text-sm text-center mt-2"
            accessible={true}
            accessibilityRole="text"
          >
            Check your internet connection and try again
          </Text>
        </View>

        {/* Action buttons */}
        <View
          className="w-full space-y-3"
          accessible={true}
          accessibilityLabel="Error recovery actions"
        >
          {/* Primary retry button */}
          <Pressable
            onPress={() => {
              refetch();
            }}
            className="flex-row items-center justify-center space-x-3 bg-brand-600 px-6 py-4 rounded-2xl  active:scale-95 transition-transform"
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Retry loading summary"
            accessibilityHint="Tap to attempt loading the financial summary again"
            accessibilityState={{ disabled: false }}
          >
            <View className="bg-white/20 p-1 rounded-full" accessible={false}>
              <Ionicons
                name="refresh"
                size={20}
                color="white"
                accessible={false}
              />
            </View>
            <Text
              className="text-white text-lg font-semibold"
              accessible={false}
            >
              Try Again
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
