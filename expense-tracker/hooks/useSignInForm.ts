import { authSchema, AuthSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
export default function useSignInForm() {
  return useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });
}
