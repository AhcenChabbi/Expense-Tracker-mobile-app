import { getTransactionsByUserId } from "@/lib/api";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";

export default function useGetTransactionsByUserId() {
  const { userId } = useAuth();
  return useQuery({
    queryKey: ["transactions", userId],
    queryFn: () => getTransactionsByUserId(),
  });
}
