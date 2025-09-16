import { transactionSchema, TransactionSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useCreateTransactionForm() {
  return useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      category: "Other",
      transactionType: "income",
      title: "",
    },
  });
}
