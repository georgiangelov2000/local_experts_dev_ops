import React, { useState } from "react";
import { useServicesForm } from "../../../../Models/Provider/useServicesForm";
import apiService from "../../../../Services/apiService";
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const onSubmit = async (formData) => {
    setSubmitStatus(null);
    try {
      const response = await apiService.saveProfileTab('services', formData);
      setSubmitStatus({ type: 'success', message: response.data.message });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.response?.data?.error || t('failed_to_save_services') });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitStatus && (
        <div className={`mb-2 text-sm rounded px-3 py-2 ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>{submitStatus.message}</div>
      )}
      {fields.map((field, index) => (
        <div key={field.id || index} className="bg-white rounded-xl shadow border border-gray-200 p-4 space-y-3 flex flex-col">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-xs text-gray-500">{t('service_price')}</label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register(`services.${index}.price`)}
                className="w-full border border-gray-300 rounded p-2 text-sm"
                placeholder={t('service_price_placeholder')}
              />
              {errors.services?.[index]?.price && (
                <p className="text-red-500 text-xs mt-1">{errors.services[index].price.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-xs text-gray-500">{t('service_description')}</label>
              <textarea
                {...register(`services.${index}.description`)}
                className="w-full border border-gray-300 rounded p-2 text-sm"
                rows={3}
                placeholder={t('service_description_placeholder')}
              ></textarea>
              {errors.services?.[index]?.description && (
                <p className="text-red-500 text-xs mt-1">{errors.services[index].description.message}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            className="flex items-center gap-1 text-red-500 text-xs hover:underline cursor-pointer mt-2"
          >
            <FiTrash2 className="inline" /> {t('remove_service')}
          </button>
        </div>
      ))}
      {fields.length < 10 && (
        <button
          type="button"
          onClick={() => append({ price: "", description: "" })}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded shadow cursor-pointer mt-2"
        >
          <FiPlus className="inline" /> {t('add_service')}
        </button>
      )}
      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow font-semibold transition-colors duration-200 mt-4"
      >
        {t('save_services')}
      </button>
    </form>
  );
}
