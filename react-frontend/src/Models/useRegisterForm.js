import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const userSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirm_password: yup.string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  website: yup.string().url("Invalid website").nullable().notRequired(),
  phone: yup.string().nullable().notRequired(),
  address: yup.string().nullable().notRequired(),
  facebook: yup.string().nullable().notRequired(),
  instagram: yup.string().nullable().notRequired(),
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
  description: yup.string(),
  image: yup.mixed().nullable(),
  website: yup.string().url("Invalid website").nullable().notRequired(),
  phone: yup.string().nullable().notRequired(),
  address: yup.string().nullable().notRequired(),
  facebook: yup.string().nullable().notRequired(),
  instagram: yup.string().nullable().notRequired(),
});

export function useRegisterForm(type = 'user') {
  const schema = type === 'provider' ? providerSchema : userSchema;
  const defaultValues = type === 'provider'
    ? {
        business_name: '',
        email: '',
        password: '',
        confirm_password: '',
        category: '',
        service_category_id: '',
        description: '',
        image: null,
        website: '',
        phone: '',
        address: '',
        facebook: '',
        instagram: '',
      }
    : {
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        website: '',
        phone: '',
        address: '',
        facebook: '',
        instagram: '',
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
