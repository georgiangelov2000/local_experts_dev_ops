import React, { useState } from "react";
import { useChangePasswordForm } from "../../../../Models/useChangePasswordForm";
import apiService from '../../../../Services/apiService';

export default function Password() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useChangePasswordForm();
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (formData) => {
    setSubmitStatus(null);
    try {
      await apiService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        newPassword_confirmation: formData.confirmPassword,
      });
      setSubmitStatus({ type: 'success', message: 'Password changed successfully.' });
      reset();
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to change password.';
      setSubmitStatus({ type: 'error', message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {submitStatus && (
        <div className={`mb-2 text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{submitStatus.message}</div>
      )}
      <div>
        <label className="block mb-1 font-medium text-xs text-gray-500">Current Password</label>
        <input
          type="password"
          {...register("currentPassword")}
          className="w-full border border-gray-300 rounded p-2"
        />
        {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>}
      </div>
      <div>
        <label className="block mb-1 font-medium text-xs text-gray-500">New Password</label>
        <input
          type="password"
          {...register("newPassword")}
          className="w-full border border-gray-300 rounded p-2"
        />
        {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
      </div>
      <div>
        <label className="block mb-1 font-medium text-xs text-gray-500">Confirm New Password</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full border border-gray-300 rounded p-2"
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 mt-2 cursor-pointer"
      >
        Change Password
      </button>
    </form>
  );
}
