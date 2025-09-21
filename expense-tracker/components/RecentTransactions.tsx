import useGetTransactionsByUserId from "@/hooks/queries/useGetTransactionsByUserId";
import Animated, { LinearTransition } from "react-native-reanimated";
import Error from "./Error";
import NoTransactionsFound from "./NoTransactionsFound";
import RecentTransactionsSkeleton from "./RecentTransactionsSkeleton";
import TransactionItem from "./TransactionItem";

export default function RecentTransactions() {
  const {
    data: transactions,
    refetch,
    isRefetching,
    isPending,
    isError,
  } = useGetTransactionsByUserId();
  if (isPending) {
    return <RecentTransactionsSkeleton />;
  }
  if (isError) {
    return <Error refetch={refetch} />;
  }
  return (
    <Animated.FlatList
      itemLayoutAnimation={LinearTransition}
      contentContainerClassName="gap-y-3 mt-3 pb-5 flex-1"
      onRefresh={refetch}
      refreshing={isRefetching}
      ListEmptyComponent={<NoTransactionsFound />}
      data={transactions}
      renderItem={({ item, index }) => (
        <TransactionItem transaction={item} index={index} />
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
    />
  );
}
