import useDeleteTransaction from "@/hooks/mutations/useDeleteTransaction";
import Transaction from "@/types/transactions";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Alert, Pressable } from "react-native";

export default function DeleteTransactionButton({
  transaction,
}: {
  transaction: Transaction;
}) {
  const { id, title } = transaction;
  const { mutate: deleteTransaction, isPending } = useDeleteTransaction();
  const handleDelete = () => {
    Alert.alert("Delete Transaction", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTransaction(id),
      },
    ]);
  };
  return (
    <Pressable
      disabled={isPending}
      onPress={handleDelete}
      className="bg-red-50 p-2.5 rounded-xl border border-red-100"
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Delete ${title} transaction`}
      accessibilityHint="Double tap to confirm deletion"
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
    >
      {isPending ? (
        <ActivityIndicator size="small" color="#ef4444" />
      ) : (
        <Ionicons name="trash-outline" size={18} color={"#ef4444"} />
      )}
    </Pressable>
  );
}
