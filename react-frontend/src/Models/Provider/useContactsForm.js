import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const contactsSchema = yup.object().shape({
  phone: yup.string().nullable().max(32, "Phone is too long"),
  email: yup.string().nullable().email("Invalid email format"),
  facebook: yup.string().nullable().max(255),
  instagram: yup.string().nullable().max(255),
  website: yup.string().nullable().url("Invalid URL"),
  address: yup.string().nullable().max(255),
});

export function useContactsForm(tabData = {}) {
  console.log('data',tabData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      phone: tabData.phone || "",
      email: tabData.email || "",
      facebook: tabData.facebook || "",
      instagram: tabData.instagram || "",
      website: tabData.website || "",
      address: tabData.address || "",
    },
    resolver: yupResolver(contactsSchema),
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
    control,
  };
} 