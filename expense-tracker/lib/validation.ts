import { categoryKeys } from "@/constants/category-icons";
import { z } from "zod";
const passwordSchema = z
  .string({ error: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters" })
  .max(32, { message: "Password must be at most 32 characters" })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Password must contain uppercase, lowercase, number, and special character.",
    }
  );
export const authSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: passwordSchema,
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
  code: z
    .string()
    .min(1, { error: "Code is required" })
    .max(6, { error: "Code must be at most 6 characters" }),
});

export type EmailVerificationSchema = z.infer<typeof emailVerificationSchema>;

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(20, { message: "First name must be at most 20 characters" })
    .regex(/^[A-Za-z]+$/, { message: "First name can only contain letters" })
    .optional(),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(20, { message: "Last name must be at most 20 characters" })
    .regex(/^[A-Za-z]+$/, { message: "Last name can only contain letters" })
    .optional(),

  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    })
    .optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const updateUserPasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
    signOutOfOtherSessions: z.boolean().default(false),
  })
  .refine(
    ({ currentPassword, newPassword }) => {
      return currentPassword !== newPassword;
    },
    {
      error: "New password must be different from the current password",
      path: ["newPassword"],
    }
  )
  .refine(
    ({ newPassword, confirmNewPassword }) => {
      return newPassword === confirmNewPassword;
    },
    {
      error: "New password and confirm password must match",
      path: ["confirmNewPassword"],
    }
  );

export type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>;
