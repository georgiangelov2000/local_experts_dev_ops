import React, { useState } from "react";
import { useProjectsForm } from "../../../../Models/Provider/useProjectsForm";
import apiService from "../../../../Services/apiService";

export default function Projects({ data }) {
  const {
    register,
    handleSubmit,
    errors,
    control,
    fields,
    append,
    remove,
    reset,
  } = useProjectsForm(data);

  const [submitStatus, setSubmitStatus] = useState(null);
  const [previews, setPreviews] = useState({}); // { [index]: { image: url, video: url } }

  const onFileChange = (e, index, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviews(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          [type]: url,
        },
      }));
    }
  };

  const onSubmit = async (formData) => {
    setSubmitStatus(null);
    try {
      const response = await apiService.saveProfileTab('projects', formData);
      setSubmitStatus({ type: 'success', message: response.data.message });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.response?.data?.error || 'Failed to save projects.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {submitStatus && (
        <div className={`mb-2 text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {submitStatus.message}
        </div>
      )}
      {fields.map((proj, index) => (
        <div key={proj.id || index} className="border rounded p-3 space-y-2">
          <input
            type="text"
            {...register(`projects.${index}.project_name`, { required: "Project name is required" })}
            placeholder="Project Name"
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />
          <textarea
            {...register(`projects.${index}.description`)}
            placeholder="Description"
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />

          <div className="flex gap-2">
            <input
              type="datetime-local"
              {...register(`projects.${index}.date_start`)}
              className="w-1/2 border border-gray-300 rounded p-2 text-sm"
            />

            <input
              type="datetime-local"
              {...register(`projects.${index}.date_end`)}
              className="w-1/2 border border-gray-300 rounded p-2 text-sm"
            />
          </div>
          <select
            {...register(`projects.${index}.status`)}
            className="w-full border border-gray-300 rounded p-2 text-sm"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                {...register(`projects.${index}.image`)}
                onChange={e => onFileChange(e, index, 'image')}
              />
              {previews[index]?.image && (
                <img
                  src={previews[index].image}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded border"
                />
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept="video/*"
                {...register(`projects.${index}.video`)}
                onChange={e => onFileChange(e, index, 'video')}
              />
              {previews[index]?.video && (
                <video
                  src={previews[index].video}
                  controls
                  className="mt-2 w-32 h-32 object-cover rounded border"
                />
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 text-xs hover:underline cursor-pointer"
          >
            Remove
          </button>
        </div>
      ))}
      {fields.length < 3 && (
        <button
          type="button"
          onClick={() =>
            append({
              project_name: "",
              description: "",
              date_start: "",
              date_end: "",
              status: 1,
              image: null,
              video: null,
            })
          }
          className="bg-gray-800 text-white px-4 py-2 mr-2"
        >
          Add Project
        </button>
      )}
      <button
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 cursor-pointer"
      >
        Save Projects
      </button>
    </form>
  );
}
