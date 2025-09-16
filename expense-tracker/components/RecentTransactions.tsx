import useGetTransactionsByUserId from "@/hooks/queries/useGetTransactionsByUserId";
import { FlatList } from "react-native";
import Error from "./Error";
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
    <FlatList
      contentContainerClassName="gap-y-3 mt-3 pb-5"
      onRefresh={refetch}
      refreshing={isRefetching}
      data={transactions}
      renderItem={({ item }) => <TransactionItem transaction={item} />}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
    />
  );
}
