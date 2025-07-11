import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const basicProfileSchema = yup.object().shape({
    business_name: yup.string().required("Business name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    description: yup.string().max(500, "Project description is too long"),
    category_id: yup
        .number()
        .typeError("Category is required")
        .required("Category is required")
        .integer("Category must be an integer"),
    service_category_id: yup
        .number()
        .typeError("Service type is required")
        .required("Service type is required")
        .integer("Service type must be an integer"),
    image: yup.mixed().nullable(), // avatar image, optional
});

export function useBasicProfileForm({tabData = {}}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
      } = useForm({
        defaultValues: {
            business_name: tabData.business_name || "",
            email: tabData.email || "",
            description: tabData.description || "",
            category_id: tabData.category_id || "",
            service_category_id: tabData.service_category_id || "",
            image: null,
        },
        resolver: yupResolver(basicProfileSchema),
      });

    return {
        register,
        handleSubmit,
        errors,
        reset,
        control,
    };
}