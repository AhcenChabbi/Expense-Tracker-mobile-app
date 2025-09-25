import { updateUserPasswordSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useChangeUserPassword() {
  return useForm({
    resolver: zodResolver(updateUserPasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      signOutOfOtherSessions: false,
    },
  });
}
