import { type TransactionSchema } from "@/lib/validation";

type Transaction = Omit<TransactionSchema, "transactionType"> & {
  id: string;
  userId: string;
  createdAt: string;
};

export default Transaction;
