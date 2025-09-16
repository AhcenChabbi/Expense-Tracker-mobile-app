import queryClient from "@/config/queryClient";
import { createTransaction } from "@/lib/api";
import { TransactionSchema } from "@/lib/validation";
import { useUser } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export default function useCreateTransaction() {
  const router = useRouter();
  const { user } = useUser();
  return useMutation({
    mutationFn: (data: TransactionSchema) =>
      createTransaction({ ...data, userId: user?.id! }),

    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["transactions"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["summary"],
        }),
      ]);
      router.replace("/");
    },
    onError: () => {
      Alert.alert("Error", "Failed to create transaction");
    },
  });
}
