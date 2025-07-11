import { useBasicProfileForm } from "../../../../Models/Provider/useBasicForm";
import Select from "react-select";
import { Controller } from "react-hook-form";
import apiService from "../../../../Services/apiService";
import { useState } from "react";

export default function Profile({ data }) {
  const { register, handleSubmit, errors, control } = useBasicProfileForm({ tabData: data });
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (formData) => {
    setSubmitStatus(null);
    try {
      const response = await apiService.saveProfileTab('basic', formData);
      setSubmitStatus({ type: 'success', message: response.data.message });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.response?.data?.error || 'Failed to save profile.' });
    }
  };

  if (!data) return null;

  // Prepare options for react-select
  const categoryOptions = (data.categories || []).map(cat => ({ value: cat.id, label: cat.name }));
  const serviceCategoryOptions = (data.service_categories || []).map(sub => ({ value: sub.id, label: sub.name }));
  const cityOptions = (data.cities || []).map(city => ({ value: city.id, label: city.name }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {submitStatus && (
        <div className={`mb-2 text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {submitStatus.message}
        </div>
      )}
      <div className="mt-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">Business Name</label>
        <input
          type="text"
          {...register("business_name")}
          className="w-full border border-gray-300 rounded p-2 text-sm"
        />
        {errors.business_name && (
          <p className="text-red-500 text-xs mt-1">{errors.business_name.message}</p>
        )}
      </div>
      <div className="mt-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">Business Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border border-gray-300 rounded p-2 text-sm"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="mt-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">Business Category</label>
        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={categoryOptions}
              value={categoryOptions.find(option => option.value === field.value) || null}
              onChange={option => field.onChange(option ? option.value : null)}
              isClearable
              placeholder="Select Category"
            />
          )}
        />
        {errors.category_id && (
          <p className="text-red-500 text-xs mt-1">{errors.category_id.message}</p>
        )}
      </div>
      <div className="mt-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">Offered Service Types</label>
        <Controller
          name="service_provovider_categories"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={serviceCategoryOptions}
              value={serviceCategoryOptions.filter(option => (field.value || []).includes(option.value))}
              onChange={selected => field.onChange(selected ? selected.map(opt => opt.value) : [])}
              isMulti
              placeholder="Select Service Types"
            />
          )}
        />
        {errors.service_provovider_categories && (
          <p className="text-red-500 text-xs mt-1">{errors.service_provovider_categories.message}</p>
        )}
      </div>
      <div className="mt-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">Operating Cities</label>
        <Controller
          name="cities"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={cityOptions}
              value={cityOptions.filter(option => (field.value || []).includes(option.value))}
              onChange={selected => field.onChange(selected ? selected.map(opt => opt.value) : [])}
              isMulti
              placeholder="Select Cities"
            />
          )}
        />
        {errors.cities && (
          <p className="text-red-500 text-xs mt-1">{errors.cities.message}</p>
        )}
      </div>
      <div className="md:col-span-2 mt-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">Business Description</label>
        <textarea
          placeholder="Tell us more about your business..."
          {...register("description")}
          className="w-full border border-gray-300 rounded p-2 text-sm"
          rows={4}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 mt-2 cursor-pointer"
      >
        Save
      </button>
    </form>
  );
}
