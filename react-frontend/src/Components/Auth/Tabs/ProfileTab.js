export default function ProfileTab({ user, register, errors }) {
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
          className="w-full border border-gray-300 rounded p-2 text-sm"
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
          {...register("email", { required: true })}
          className="w-full border border-gray-300 rounded p-2 text-sm"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="md:col-span-2 mt-2">
        <label className="block mb-1 font-medium text-sm">Description</label>
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
    </>

  );
}
