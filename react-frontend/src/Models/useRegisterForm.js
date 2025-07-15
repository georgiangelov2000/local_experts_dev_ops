import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const userSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirm_password: yup.string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const providerSchema = yup.object({
  business_name: yup.string().required("Business name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirm_password: yup.string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  category: yup.string().required("Category is required"),
  service_category_id: yup.string().nullable().notRequired(),
});

export function useRegisterForm(type = 'user') {
  const schema = type === 'provider' ? providerSchema : userSchema;
  const defaultValues = type === 'provider'
    ? {
        email: '',
        password: '',
        confirm_password: '',
        category: '',
        service_category_id: '',
      }
    : {
        email: '',
        password: '',
        confirm_password: '',
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
    control
  };
}
