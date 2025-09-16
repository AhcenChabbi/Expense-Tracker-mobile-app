import Navbar from "@/components/navbar";
import RecentTransactions from "@/components/RecentTransactions";
import Summary from "@/components/Summary";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Page() {
  return (
    <SafeAreaView className="flex-1 bg-brand-100">
      <Navbar />
      <Summary />
      <View className="px-4 mt-5  flex-1">
        <Text className=" text-lg text-brand-600 font-bold">
          Recent Transactions
        </Text>
        <RecentTransactions />
      </View>
    </SafeAreaView>
  );
}
