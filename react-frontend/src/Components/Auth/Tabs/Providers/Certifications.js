import React, { useState } from "react";
import { useCertificationsForm } from "../../../../Models/Provider/useCertificationsForm";
import apiService from "../../../../Services/apiService";
import { FiPlus, FiTrash2, FiAward, FiImage } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
  
    if (formData.certifications && formData.certifications.length > 0) {
      formData.certifications.forEach((cert, idx) => {
        fd.append(`certifications[${idx}][name]`, cert.name);
        fd.append(`certifications[${idx}][description]`, cert.description || '');
        if (cert.image && cert.image[0] instanceof File) {
          fd.append(`certifications[${idx}][image]`, cert.image[0]);
        }        
      });
    }

    console.log(fd);
  
    try {
      const response = await apiService.saveProfileTab(fd);
      setSubmitStatus({ type: 'success', message: response.data.message });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.error || t('failed_to_save_certifications'),
      });
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitStatus && (
        <div className={`mb-2 text-sm rounded px-3 py-2 ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>{submitStatus.message}</div>
      )}
      {fields.map((field, index) => (
        <div key={field.id || index} className="bg-white rounded-xl shadow border border-gray-200 p-4 space-y-3 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-900">{t('certification')} #{index + 1}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">{t('certification_name')}</label>
              <input
                type="text"
                {...register(`certifications.${index}.name`)}
                placeholder={t('certification_name_placeholder')}
                className="w-full border border-gray-300 rounded p-2 text-sm"
              />
              {errors.certifications?.[index]?.name && (
                <p className="text-red-500 text-xs mt-1">{errors.certifications[index].name.message}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t('certification_description')}</label>
            <textarea
              {...register(`certifications.${index}.description`)}
              placeholder={t('certification_description_placeholder')}
              className="w-full border border-gray-300 rounded p-2 text-sm"
              rows={3}
            ></textarea>
            {errors.certifications?.[index]?.description && (
              <p className="text-red-500 text-xs mt-1">{errors.certifications[index].description.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t('certification_link')} ({t('optional')})</label>
            <input
              type="url"
              {...register(`certifications.${index}.link`)}
              placeholder={t('certification_link_placeholder')}
              className="w-full border border-gray-300 rounded p-2 text-sm mb-2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1"><FiImage className="inline" />{t('certification_image')}</label>
            {/* Show existing image if present in data */}
            {field.image_file && (
              <img
                src={field.image_file}
                alt={t('certification_image')}
                className="mb-2 w-32 h-32 object-cover rounded border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              {...register(`certifications.${index}.image`)}
              onChange={e => onFileChange(e, index)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
            <span className="text-xs text-gray-400">{t('image_upload_hint')}</span>
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
            className="flex items-center gap-1 text-red-500 text-xs hover:underline cursor-pointer mt-2"
          >
            <FiTrash2 className="inline" /> {t('remove_certification')}
          </button>
        </div>
      ))}
      {fields.length < 10 && (
        <button
          type="button"
          onClick={() => append({ name: "", description: "", image: null })}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded shadow cursor-pointer mt-2"
        >
          <FiPlus className="inline" /> {t('add_certification')}
        </button>
      )}
      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow font-semibold transition-colors duration-200 mt-4"
      >
        {t('save_certifications')}
      </button>
    </form>
  );
} 