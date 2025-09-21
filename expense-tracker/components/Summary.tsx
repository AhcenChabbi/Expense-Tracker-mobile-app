import useGetSummaryByUserId from "@/hooks/queries/useGetSummaryByUserId";
import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import ErrorSummary from "./ErrorSummary";
import SummarySkeleton from "./SummarySkeleton";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Math.abs(amount));
};
export default function Summary() {
  const { data, isPending, isError, refetch } = useGetSummaryByUserId();
  if (isPending) {
    return <SummarySkeleton />;
  }
  if (isError) {
    return <ErrorSummary refetch={refetch} />;
  }
  const { balance, totalExpenses, totalIncomes } = data;
  return (
    <Animated.View entering={FadeIn} className="px-4 mt-5">
      <View
        className="bg-white rounded-2xl p-5 gap-y-5 border border-gray-100"
        accessible={true}
        accessibilityRole="summary"
        accessibilityLabel={`Financial Summary: Total balance ${formatCurrency(balance)}, Income ${formatCurrency(totalIncomes)}, Expenses ${formatCurrency(totalExpenses)}`}
      >
        <View className="py-2 flex-row items-center justify-between">
          <View>
            <Text
              className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1"
              accessible={false}
            >
              Total Balance
            </Text>
            <Text
              className={`text-3xl font-bold ${balance > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {`${balance !== 0 ? (balance > 0 ? "+" : "-") : ""} ${formatCurrency(balance)}`}
            </Text>
          </View>
          {balance !== 0 && (
            <View
              className={`px-3 py-1.5 rounded-full ${
                balance > 0
                  ? "bg-green-100 border border-green-200"
                  : "bg-red-100 border border-red-200"
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  balance > 0 ? "text-green-700" : "text-red-700"
                }`}
                accessible={false}
              >
                {balance > 0 ? "↗ Positive" : "↙ Negative"} Balance
              </Text>
            </View>
          )}
        </View>
        <View className="h-px bg-gray-200" accessible={false} />
        <View className="flex-row">
          <View className="flex-1">
            <Text
              className="text-green-700 font-medium text-sm uppercase tracking-wide"
              accessible={false}
            >
              Income
            </Text>
            <Text
              className="text-green-600 font-bold text-lg"
              accessible={false}
            >
              {formatCurrency(totalIncomes)}
            </Text>
          </View>
          <View className="w-px bg-gray-200 mx-4" accessible={false} />
          <View>
            <Text
              className="text-red-700 font-medium text-sm uppercase tracking-wide"
              accessible={false}
            >
              Expenses
            </Text>
            <Text className="text-red-600 font-bold text-lg" accessible={false}>
              {formatCurrency(totalExpenses)}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
