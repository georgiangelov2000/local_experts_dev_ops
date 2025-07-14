import React, { useState } from "react";
import { useServicesForm } from "../../../../Models/Provider/useServicesForm";
import apiService from "../../../../Services/apiService";

export default function Services({ data }) {
  const {
    register,
    handleSubmit,
    errors,
    control,
    fields,
    append,
    remove,
    reset,
  } = useServicesForm(data);

  const [submitStatus, setSubmitStatus] = useState(null);
  
  const onSubmit = async (formData) => {
    console.log(formData);
    // setSubmitStatus(null);
    // try {
    //   const response = await apiService.saveProfileTab('services', formData);
    //   setSubmitStatus({ type: 'success', message: response.data.message });
    // } catch (error) {
    //   setSubmitStatus({ type: 'error', message: error.response?.data?.error || 'Failed to save services.' });
    // }
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
            <label className="block mb-1 font-medium text-xs text-gray-500">Price</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register(`services.${index}.price`)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
            {errors.services?.[index]?.price && (
              <p className="text-red-500 text-xs mt-1">{errors.services[index].price.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-xs text-gray-500">Description</label>
            <textarea
              {...register(`services.${index}.description`)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
              rows={3}
            ></textarea>
            {errors.services?.[index]?.description && (
              <p className="text-red-500 text-xs mt-1">{errors.services[index].description.message}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 text-xs hover:underline cursor-pointer"
          >
            Remove Service
          </button>
        </div>
      ))}

      {fields.length < 3 && (
        <button
          type="button"
          onClick={() => append({ price: "", description: "" })}
          className="bg-gray-800 text-white px-4 py-2 mr-2"
        >
          Add Service
        </button>
      )}
      <button
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 mr-2 cursor-pointer"
      >
        Save Services
      </button>
    </form>
  );
}
