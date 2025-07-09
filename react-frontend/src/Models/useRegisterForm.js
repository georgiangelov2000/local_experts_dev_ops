import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Yup схема за регистрация
const registerSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirm_password: yup.string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  type: yup.string().required("Type is required") // Добавяне на поле за тип
});

export function useRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      type: "" // Default type, can be changed based on your requirements
    },
    resolver: yupResolver(registerSchema),
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
    control
  };
}
