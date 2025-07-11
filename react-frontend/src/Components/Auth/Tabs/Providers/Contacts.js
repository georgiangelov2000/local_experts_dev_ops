import React, { useState } from "react";
import { useContactsForm } from "../../../../Models/Provider/useContactsForm";
import apiService from "../../../../Services/apiService";

export default function Contacts({ data }) {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    control,
  } = useContactsForm(data);

  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (formData) => {
    setSubmitStatus(null);
    try {
      const response = await apiService.saveProfileTab('contacts', formData);
      setSubmitStatus({ type: 'success', message: response.data.message });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.response?.data?.error || 'Failed to save contacts.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {submitStatus && (
        <div className={`mb-2 text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {submitStatus.message}
        </div>
      )}
      <div className="mb-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">Phone</label>
        <input
          type="tel"
          {...register("phone")}
          className="w-full border border-gray-300 rounded p-2 text-sm"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>
      <div className="mb-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border border-gray-300 rounded p-2 text-sm"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div className="mb-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">Facebook</label>
        <input
          type="text"
          {...register("facebook")}
          className="w-full border border-gray-300 rounded p-2 text-sm"
        />
        {errors.facebook && <p className="text-red-500 text-xs mt-1">{errors.facebook.message}</p>}
      </div>
      <div className="mb-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">Instagram</label>
        <input
          type="text"
          {...register("instagram")}
          className="w-full border border-gray-300 rounded p-2 text-sm"
        />
        {errors.instagram && <p className="text-red-500 text-xs mt-1">{errors.instagram.message}</p>}
      </div>
      <div className="mb-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">Website</label>
        <input
          type="url"
          {...register("website")}
          className="w-full border border-gray-300 rounded p-2 text-sm"
        />
        {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>}
      </div>
      <div className="mb-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">Address</label>
        <input
          type="text"
          {...register("address")}
          className="w-full border border-gray-300 rounded p-2 text-sm"
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 mt-2 cursor-pointer"
      >
        Save Contacts
      </button>
    </form>
  );
}
