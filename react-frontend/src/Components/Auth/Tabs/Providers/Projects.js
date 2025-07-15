import React, { useState } from "react";
import { useProjectsForm } from "../../../../Models/Provider/useProjectsForm";
import apiService from "../../../../Services/apiService";
import { FiPlus, FiTrash2, FiImage, FiVideo } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
      setSubmitStatus({ type: 'error', message: error.response?.data?.error || t('failed_to_save_projects') });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitStatus && (
        <div className={`mb-2 text-sm rounded px-3 py-2 ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>{submitStatus.message}</div>
      )}
      {fields.map((proj, index) => (
        <div key={proj.id || index} className="bg-white rounded-xl shadow border border-gray-200 p-4 space-y-3 flex flex-col">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">{t('project_name')}</label>
              <input
                type="text"
                {...register(`projects.${index}.project_name`, { required: t('project_name_required') })}
                placeholder={t('project_name_placeholder')}
                className="w-full border border-gray-300 rounded p-2 text-sm"
              />
              {errors.projects?.[index]?.project_name && (
                <p className="text-red-500 text-xs mt-1">{errors.projects[index].project_name.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">{t('status')}</label>
              <select
                {...register(`projects.${index}.status`)}
                className="w-full border border-gray-300 rounded p-2 text-sm"
              >
                <option value={1}>{t('active')}</option>
                <option value={0}>{t('inactive')}</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t('description')}</label>
            <textarea
              {...register(`projects.${index}.description`)}
              placeholder={t('project_description_placeholder')}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">{t('date_start')}</label>
              <input
                type="datetime-local"
                {...register(`projects.${index}.date_start`)}
                className="w-full border border-gray-300 rounded p-2 text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">{t('date_end')}</label>
              <input
                type="datetime-local"
                {...register(`projects.${index}.date_end`)}
                className="w-full border border-gray-300 rounded p-2 text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1"><FiImage className="inline" />{t('project_image')}</label>
              <input
                type="file"
                accept="image/*"
                {...register(`projects.${index}.image`)}
                onChange={e => onFileChange(e, index, 'image')}
                className="w-full border border-gray-300 rounded p-2 text-sm"
              />
              <span className="text-xs text-gray-400">{t('image_upload_hint')}</span>
              {previews[index]?.image && (
                <img
                  src={previews[index].image}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded border"
                />
              )}
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1"><FiVideo className="inline" />{t('project_video')}</label>
              <input
                type="file"
                accept="video/*"
                {...register(`projects.${index}.video`)}
                onChange={e => onFileChange(e, index, 'video')}
                className="w-full border border-gray-300 rounded p-2 text-sm"
              />
              <span className="text-xs text-gray-400">{t('video_upload_hint')}</span>
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
            className="flex items-center gap-1 text-red-500 text-xs hover:underline cursor-pointer mt-2"
          >
            <FiTrash2 className="inline" /> {t('remove_project')}
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
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded shadow cursor-pointer mt-2"
        >
          <FiPlus className="inline" /> {t('add_project')}
        </button>
      )}
      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow font-semibold transition-colors duration-200 mt-4"
      >
        {t('save_projects')}
      </button>
    </form>
  );
}
