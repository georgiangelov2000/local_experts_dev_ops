import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  review_text: yup.string().trim().required("Comment cannot be empty."),
  rating: yup.number().min(1).max(5).required("Rating is required."),
  consumer_id: yup.number().nullable(), 
  service_provider_id: yup.number().required("Service provider is required."),
});

export function useReviewForm(user = {}, serviceProviderId = null) {
    const consumerId = user && user.id ? user.id : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      review_text: "",
      rating: 5,
      consumer_id: consumerId,
      service_provider_id: serviceProviderId,
    },
    resolver: yupResolver(schema),
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
    control,
  };
}
