import { categoryKeys } from "@/constants/category-icons";
import { z } from "zod";
export const authSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be at most 32 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain uppercase, lowercase, number, and special character.",
      }
    ),
});

export type AuthSchema = z.infer<typeof authSchema>;
export const transactionSchema = z.object({
  transactionType: z.union([z.literal("expense"), z.literal("income")]),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title must be at most 50 characters" }),
  category: z.enum(categoryKeys, { error: "Please select a valid category" }),
  amount: z
    .number({ error: "Amount is required" })
    .gt(0, { error: "Amount must be greater than 0" }),
});
export type TransactionSchema = z.infer<typeof transactionSchema>;

export const emailVerificationSchema = z.object({
  code: z.string().min(1, { error: "Code is required" }),
});

export type EmailVerificationSchema = z.infer<typeof emailVerificationSchema>;
