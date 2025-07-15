import { usePasswordForm } from '../../../../Models/User/usePasswordForm';
import { useTranslation } from 'react-i18next';

export default function Password() {
  const { register, handleSubmit, formState: { errors }, onSubmit, loading, error, success } = usePasswordForm();
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{t('change_password')}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
          {t('password')}
        </label>
        <input {...register('current')} type="password" className="w-full border border-gray-300 rounded p-2 text-sm" required />
        {errors.current && <div className="text-red-500 text-xs mt-1">{errors.current.message}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">New Password</label>
        <input {...register('next')} type="password" className="w-full border border-gray-300 rounded p-2 text-sm" required />
        {errors.next && <div className="text-red-500 text-xs mt-1">{errors.next.message}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Confirm New Password</label>
        <input {...register('confirm')} type="password" className="w-full border border-gray-300 rounded p-2 text-sm" required />
        {errors.confirm && <div className="text-red-500 text-xs mt-1">{errors.confirm.message}</div>}
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <div className="flex justify-end">
        <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md mt-4"
            disabled={loading}>
            {t('submit')}
            </button>
      </div>
    </form>
  );
} 