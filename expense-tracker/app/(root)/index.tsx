import Navbar from "@/components/navbar";
import RecentTransactions from "@/components/RecentTransactions";
import Summary from "@/components/Summary";
import { Text, View } from "react-native";
export default function Page() {
  return (
    <View className="flex-1 relative">
      <Navbar />
      <Summary />
      <View className="px-4 mt-5  flex-1">
        <Text className=" text-lg text-brand-600 font-bold">
          Recent Transactions
        </Text>
        <RecentTransactions />
      </View>
    </View>
  );
}
