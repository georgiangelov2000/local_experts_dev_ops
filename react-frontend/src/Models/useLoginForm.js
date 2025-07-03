import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
    control,
  };
}
