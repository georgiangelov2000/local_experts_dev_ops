import { useBasicForm } from '../../../../Models/User/useBasicForm';
import { FaUserCircle } from 'react-icons/fa';
import { useRef, useState } from 'react';

export default function Profile({ user }) {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, onSubmit, avatar, setValue } = useBasicForm(user);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || '');
  const fileInputRef = useRef();

  // Handle avatar file change
  const onAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setValue('avatar', reader.result); // Optionally send base64 or handle upload
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center space-x-4 mb-4">
        {avatarPreview ? (
          <img src={avatarPreview} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <FaUserCircle className="w-20 h-20 text-gray-300" />
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name || user.username}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Name</label>
        <input {...register('name')} type="text" className="w-full border border-gray-300 rounded p-2 text-sm" />
        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name.message}</div>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input {...register('email')} type="email" className="w-full border border-gray-300 rounded p-2 text-sm" readOnly />
      </div>
      <div className="mt-4">
        <label className="block mb-1 font-medium text-xs text-gray-500">Avatar Image</label>
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <img
              className="h-16 w-16 object-cover rounded-full border border-gray-200"
              src={avatarPreview || 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'}
              alt="Current avatar"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            style={{ maxWidth: 220 }}
            onChange={onAvatarChange}
            ref={fileInputRef}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, JPEG up to 2MB.</p>
      </div>
      {isSubmitSuccessful && <div className="text-green-600 mb-2">Profile updated successfully.</div>}
      <div className="flex justify-end">
        <button type="submit" className="bg-gray-800 text-white px-4 py-2 mt-2 cursor-pointer" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Profile'}</button>
      </div>
    </form>
  );
} 