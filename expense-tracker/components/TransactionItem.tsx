import CATEGORY_ICONS from "@/constants/category-icons";
import Transaction from "@/types/transactions";
import formatDate from "@/utils/format-date";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import DeleteTransactionButton from "./DeleteTransactionButton";
export default function TransactionItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  const { amount, category, title, createdAt } = transaction;
  const iconName = CATEGORY_ICONS[category] || "pricetag-outline";
  const isIncome = amount > 0;
  return (
    <View
      className="flex-row items-center bg-white justify-between px-4 py-3 rounded-xl  border-gray-100"
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Transaction: ${title}, ${category}, ${isIncome ? "income" : "expense"} of $${Math.abs(amount).toFixed(2)}, on ${formatDate(createdAt)}`}
    >
      {/* left side */}
      <View className="flex-row items-center gap-x-3 flex-1">
        <View
          className="bg-gray-50 p-3 rounded-xl border border-gray-100"
          accessible={false}
        >
          <Ionicons
            name={iconName}
            size={22}
            color={isIncome ? "#22c55e" : "#ef4444"}
          />
        </View>
        <View className="flex-1">
          <Text
            className="text-base font-semibold text-gray-900 mb-1"
            numberOfLines={1}
            accessible={false}
          >
            {title}
          </Text>
          <Text className="text-sm text-gray-500" accessible={false}>
            {category}
          </Text>
        </View>
      </View>
      {/* right side */}
      <View className="flex-row items-center gap-x-3">
        <View className="items-end">
          <Text
            className={`font-bold text-lg ${
              isIncome ? "text-green-600" : "text-red-600"
            }`}
            accessible={false}
          >
            {isIncome ? "+" : "-"}${Math.abs(amount).toFixed(2)}
          </Text>
          <Text className="text-gray-500 text-xs mt-0.5" accessible={false}>
            {formatDate(createdAt)}
          </Text>
        </View>
        <DeleteTransactionButton transaction={transaction} />
      </View>
    </View>
  );
}
