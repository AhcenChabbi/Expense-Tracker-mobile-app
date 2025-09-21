import API from "@/config/apiClient";
import Transaction from "@/types/transactions";
import { TransactionSchema } from "./validation";

export const getTransactionsByUserId = async () => {
  const res = await API.get<Transaction[]>(`/transactions`);
  return res.data;
};

export const getSummaryByUserId = async () => {
  const res = await API.get<{
    balance: number;
    totalIncomes: number;
    totalExpenses: number;
  }>(`/transactions/summary`);
  return res.data;
};

export const createTransaction = async (data: TransactionSchema) => {
  const res = await API.post<Transaction>("/transactions", data);
  return res.data;
};

export const deleteTransaction = async (transactionId: string) => {
  const res = await API.delete<Transaction>(`/transactions/${transactionId}`);
  return res.data;
};
