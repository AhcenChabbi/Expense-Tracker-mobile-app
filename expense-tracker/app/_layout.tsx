import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import QueryProvider from "@/providers/QueryProvider";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaProvider>
        <QueryProvider>
          <SafeAreaView className="flex-1">
            <Slot />
          </SafeAreaView>
        </QueryProvider>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
