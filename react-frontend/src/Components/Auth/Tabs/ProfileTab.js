import { useState } from "react";

export default function ProfileTab({ user, register, errors, categories = [], subcategories = [] }) {
  const [preview, setPreview] = useState(null);

  return (
    <>
      <p className="mb-4 bg-gray-400 p-2 text-white">
        Попълнете информацията за вашия бизнес, за да се показва коректно пред клиентите.
      </p>

      <div>
        <label className="block mb-1 font-medium text-sm">Name</label>
        <input
          type="text"
          defaultValue={user?.name}
          {...register("business_name")}
          className="w-full border border-gray-300 p-2 text-sm"
        />
        {errors.business_name && (
          <p className="text-red-500 text-xs mt-1">{errors.business_name.message}</p>
        )}
      </div>

      <div className="mt-2">
        <label className="block mb-1 font-medium text-sm">Email</label>
        <input
          type="email"
          defaultValue={user?.email}
          {...register("email")}
          className="w-full border border-gray-300 p-2 text-sm"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mt-2">
        <label className="block mb-1 font-medium text-sm">Category</label>
        <select
          {...register("category_id")}
          className="w-full border border-gray-300 p-2 text-sm"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="text-red-500 text-xs mt-1">{errors.category_id.message}</p>
        )}
      </div>

      <div className="mt-2">
        <label className="block mb-1 font-medium text-sm">Service Type</label>
        <select
          {...register("service_category_id")}
          className="w-full border border-gray-300 p-2 text-sm"
        >
          <option value="">Select Service Type</option>
          {subcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
        {errors.service_category_id && (
          <p className="text-red-500 text-xs mt-1">{errors.service_category_id.message}</p>
        )}
      </div>

      <div className="md:col-span-2 mt-2">
        <label className="block mb-1 font-medium text-sm">Description</label>
        <textarea
          placeholder="Tell us more about your business..."
          {...register("description")}
          className="w-full border border-gray-300 p-2 text-sm"
          rows={4}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="block mb-1 font-medium text-sm text-gray-700">Business Image</label>

        <div className="flex items-center gap-3">
          <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white shadow hover:bg-blue-700">
            Upload Image
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }
              })}
              className="hidden"
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Selected preview"
              className="w-16 h-16 rounded object-cover border"
            />
          )}
        </div>

        <span className="text-xs text-gray-500 mt-1 block">Accepted: JPG, PNG, WEBP — Max 2MB</span>

        {errors.image && (
          <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
        )}
      </div>

    </>
  );
}
