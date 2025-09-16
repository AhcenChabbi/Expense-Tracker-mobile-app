import queryClient from "@/config/queryClient";
import { deleteTransaction } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

export default function useDeleteTransaction() {
  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["transactions"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["summary"],
        }),
      ]);
    },
    onError: () => {
      Alert.alert("Error", "Failed to delete transaction");
    },
  });
}
