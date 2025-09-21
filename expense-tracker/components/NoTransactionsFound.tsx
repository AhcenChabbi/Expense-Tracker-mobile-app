import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function NoTransactionsFound() {
  return (
    <View
      className="flex-1 justify-center items-center px-8 py-12"
      accessible={true}
      accessibilityLabel="No transactions screen"
    >
      {/* Main content container */}
      <View
        className="items-center max-w-sm mx-auto"
        accessible={true}
        accessibilityLabel="Empty state content"
      >
        {/* Icon container with enhanced styling */}
        <View
          className="mb-8 p-6 bg-white/80 rounded-full border border-brand-100/50"
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel="No transactions illustration"
        >
          <View className="relative">
            <Ionicons
              name="receipt-outline"
              size={80}
              color="#7a4532"
              accessible={false}
            />
            {/* Subtle animation hint with pulsing dot */}
            <View className="absolute -top-2 -right-2 w-4 h-4 bg-brand-400 rounded-full opacity-60 animate-pulse" />
          </View>
        </View>

        {/* Text content with improved hierarchy */}
        <View
          className="mb-10 items-center space-y-3"
          accessible={true}
          accessibilityLabel="Empty state message"
        >
          <Text
            className="text-2xl font-bold text-brand-700 text-center mb-2"
            accessible={true}
            accessibilityRole="header"
          >
            No transactions yet
          </Text>

          <Text
            className="text-base text-brand-500 text-center leading-relaxed px-4 max-w-xs"
            accessible={true}
            accessibilityRole="text"
          >
            Start tracking your finances by adding your first transaction
          </Text>

          {/* Additional helpful text */}
          <Text
            className="text-sm text-brand-400 text-center mt-4 px-2"
            accessible={true}
            accessibilityRole="text"
          >
            Keep track of income, expenses, and manage your budget effectively
          </Text>
        </View>
      </View>
    </View>
  );
}
