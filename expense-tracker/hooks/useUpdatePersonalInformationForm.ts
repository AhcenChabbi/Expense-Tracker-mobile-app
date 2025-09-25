import { updateUserSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useUpdatePersonalInformationForm() {
  return useForm({ resolver: zodResolver(updateUserSchema) });
}
