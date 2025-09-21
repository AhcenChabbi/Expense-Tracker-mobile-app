import { getSummaryByUserId } from "@/lib/api";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";

export default function useGetSummaryByUserId() {
  const { userId } = useAuth();
  return useQuery({
    queryKey: ["summary", userId],
    queryFn: () => getSummaryByUserId(),
  });
}
