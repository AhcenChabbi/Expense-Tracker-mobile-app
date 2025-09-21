import z from "zod";

export const transactionSchema = z.object({
  transactionType: z.union([z.literal("expense"), z.literal("income")]),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title must be at most 50 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  amount: z
    .number({ error: "Amount is required" })
    .gt(0, { error: "Amount must be greater than 0" }),
});
export type TransactionSchema = z.infer<typeof transactionSchema>;
