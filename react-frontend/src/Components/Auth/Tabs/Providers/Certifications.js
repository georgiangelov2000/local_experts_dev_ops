import React, { useState } from "react";
import { useCertificationsForm } from "../../../../Models/Provider/useCertificationsForm";
import apiService from "../../../../Services/apiService";

export default function Certifications({ data }) {
  const {
    register,
    handleSubmit,
    errors,
    control,
    fields,
    append,
    remove,
    reset,
  } = useCertificationsForm(data);

  const [submitStatus, setSubmitStatus] = useState(null);
  const [previews, setPreviews] = useState({}); // { [index]: url }

  const onFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviews(prev => ({
        ...prev,
        [index]: url,
      }));
    }
  };

  const onSubmit = async (formData) => {
    setSubmitStatus(null);
    const fd = new FormData();

    if (formData.certifications.length > 0) {
      fd.append('certifications[]', '');
    }
  
    formData.certifications.forEach((cert, idx) => {
      fd.append(`certifications[${idx}][name]`, cert.name);
      fd.append(`certifications[${idx}][description]`, cert.description);
  
      const fileInput = document.querySelector(`input[name='certifications.${idx}.image']`);
      if (fileInput?.files?.[0]) {
        fd.append(`certifications[${idx}][image]`, fileInput.files[0]);
      }
    });
  
    // Debug form data
    for (let [key, value] of fd.entries()) {
      console.log(key, value);
    }
  
    console.log(fd);
    try {
      const response = await apiService.saveProfileTab('certifications', fd);
      setSubmitStatus({ type: 'success', message: response.data.message });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.error || 'Failed to save certifications.'
      });
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {submitStatus && (
        <div className={`mb-2 text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {submitStatus.message}
        </div>
      )}
      {fields.map((field, index) => (
        <div key={field.id || index} className="border rounded p-3 space-y-2">
          <div>
            <label className="block mb-1 font-medium text-xs text-gray-500">Name</label>
            <input
              type="text"
              {...register(`certifications.${index}.name`)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
            {errors.certifications?.[index]?.name && (
              <p className="text-red-500 text-xs mt-1">{errors.certifications[index].name.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-xs text-gray-500">Description</label>
            <textarea
              {...register(`certifications.${index}.description`)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
              rows={3}
            ></textarea>
            {errors.certifications?.[index]?.description && (
              <p className="text-red-500 text-xs mt-1">{errors.certifications[index].description.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-xs text-gray-500">Image</label>
            <input
              type="file"
              accept="image/*"
              {...register(`certifications.${index}.image`)}
              onChange={e => onFileChange(e, index)}
            />
            {previews[index] && (
              <img
                src={previews[index]}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded border"
              />
            )}
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
      <button
        type="button"
        onClick={() => append({ name: "", description: "", image: null })}
        className="bg-gray-800 text-white px-4 py-2 mr-2 cursor-pointer"
      >
        Add Certification
      </button>
      <button
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 mr-2 cursor-pointer"
      >
        Save Certifications
      </button>
    </form>
  );
} 