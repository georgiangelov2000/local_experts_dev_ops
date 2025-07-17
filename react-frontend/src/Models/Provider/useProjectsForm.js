import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const projectSchema = yup.object().shape({
  project_name: yup.string().nullable(),
  description: yup.string(),
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

const projectsFormSchema = yup.object().shape({
  projects: yup.array().of(projectSchema).max(3, "Up to 3 projects allowed"),
});

export function useProjectsForm(tabData = {}) {
  // Map tabData to ensure all fields are present for each project
  const mappedProjects = Array.isArray(tabData)
  
    ? tabData.map(project => ({
        id: project.id,
        project_name: project.project_name || '',
        description: project.description || '',
        date_start: project.date_start || '',
        date_end: project.date_end || '',
        status: project.status || 0,
        image: null, // always null for initial load (for file input)
        image_url: project.image_url || '', // <-- map image_url from backend
        link: project.link || '',
      }))
    : [
        {
          project_name: '',
          description: '',
          date_start: '',
          date_end: '',
          status: 0,
          image: null,
          image_url: '',
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
      projects: mappedProjects,
    },
    resolver: yupResolver(projectsFormSchema),
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