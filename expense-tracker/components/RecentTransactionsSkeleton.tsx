import { View } from "react-native";
import TransactionItemSkeleton from "./TransactionItemSkeleton";

export default function RecentTransactionsSkeleton() {
  return (
    <View className="gap-y-3 mt-3 pb-5">
      {Array.from({ length: 8 }).map((_, index) => (
        <TransactionItemSkeleton key={index} />
      ))}
    </View>
  );
}
