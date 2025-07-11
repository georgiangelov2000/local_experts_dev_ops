import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().required("New password is required").min(8, "Password must be at least 8 characters"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required("Please confirm your new password"),
});

export function useChangePasswordForm() {
  return useForm({
    resolver: yupResolver(changePasswordSchema),
  });
} 