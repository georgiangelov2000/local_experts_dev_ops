import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const projectSchema = yup.object().shape({
  project_name: yup.string().nullable(),
  description: yup.string().max(500, "Project description is too long"),
  date_start: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr)),

  date_end: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr)),
  status: yup.number().oneOf([0, 1]).nullable(),
  image: yup.mixed().nullable(),
  video: yup.mixed().nullable(),
});

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

const profileSchema = yup.object().shape({
  business_name: yup.string().required("Business name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  description: yup.string().max(500, "Description is too long"),
  category_id: yup
    .number()
    .typeError("Category is required")
    .required("Category is required")
    .integer("Category must be an integer"),

  service_category_id: yup
    .number()
    .typeError("Service category is required")
    .required("Service category is required")
    .integer("Service category must be an integer"),
  image: yup
    .mixed()
    .nullable()
    .test("fileSize", "The file is too large", value => {
      return !value || (value && value[0]?.size <= 2 * 1024 * 1024);
    })
    .test("fileType", "Unsupported file type", value => {
      return !value || (value && ["image/jpeg", "image/png", "image/webp"].includes(value[0]?.type));
    }),

  projects: yup.array().of(projectSchema).max(3, "Up to 3 projects allowed").notRequired(),
  services: yup.array().of(serviceSchema).max(3, "Up to 3 projects allowed").notRequired()
});

export function useProfileForm(user = {}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      business_name: user.service_provider.business_name || "",
      email: user.email || "",
      description: user.service_provider.description || "",
      password: "",
      projects: user.projects?.length > 0
        ? user.projects
        : [
          {
            project_name: "",
            description: "",
            date_start: "",
            date_end: "",
            status: 1,
            image: null,
            video: null,
          },
        ],
      services: [{ price: "", description: "" }]
    },
    resolver: yupResolver(profileSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
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
