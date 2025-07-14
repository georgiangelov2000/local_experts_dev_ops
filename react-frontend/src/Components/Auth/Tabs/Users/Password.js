import { usePasswordForm } from '../../../../Models/User/usePasswordForm';

export default function Password() {
  const { register, handleSubmit, formState: { errors }, onSubmit, loading, error, success } = usePasswordForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Current Password</label>
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
            className="bg-gray-800 text-white px-4 py-2 mt-2 cursor-pointer"
            disabled={loading}>
            {loading ? 'Saving...' : 'Save Password'}
            </button>
      </div>
    </form>
  );
} 