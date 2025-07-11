import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const serviceSchema = yup.object().shape({
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  description: yup
    .string()
    .required("Description is required")
    .max(1000, "Description is too long"),
});

const servicesFormSchema = yup.object().shape({
  services: yup.array().of(serviceSchema).max(3, "Up to 3 services allowed"),
});

export function useServicesForm(tabData = {}) {
  // Map tabData to ensure all fields are present for each service
  const mappedServices = Array.isArray(tabData)
    ? tabData.map(service => ({
        id: service.id,
        price: typeof service.price !== 'undefined' ? service.price : '',
        description: service.description || '',
      }))
    : [
        {
          price: '',
          description: '',
        },
      ];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      services: mappedServices,
    },
    resolver: yupResolver(servicesFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
    control,
    fields,
    append,
    remove,
  };
} 