import { authSchema, AuthSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
export default function useSignUpForm() {
  return useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });
}
