import queryClient from "@/config/queryClient";
import { createTransaction } from "@/lib/api";
import { TransactionSchema } from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export default function useCreateTransaction() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: TransactionSchema) => createTransaction(data),

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
