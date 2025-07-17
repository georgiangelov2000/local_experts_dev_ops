import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const certificationSchema = yup.object().shape({
  name: yup.string().required("Certification name is required").max(255),
  description: yup.string().nullable().max(500),
  image: yup.mixed().nullable(),
});

const certificationsFormSchema = yup.object().shape({
  certifications: yup.array().of(certificationSchema),
});

export function useCertificationsForm(tabData = {}) {
  // Map tabData to ensure all fields are present for each certification
  const mappedCertifications = Array.isArray(tabData)
    ? tabData.map(cert => ({
        id: cert.id,
        name: cert.name || '',
        description: cert.description || '',
        image: null, // always null for initial load (for file input)
        image_file: cert.image_file || cert.image || '',
        link: cert.link || '', // <-- add link field
      }))
    : [
        {
          name: '',
          description: '',
          image: null,
          image_file: '',
          link: '',
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
      certifications: mappedCertifications,
    },
    resolver: yupResolver(certificationsFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
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