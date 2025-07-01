export default function ProfileTab({ user }) {
  return (
    <>
      <p className="mb-4 bg-gray-400 p-2 text-white">
        Попълнете информацията за вашия бизнес, за да се показва коректно пред клиентите.
      </p>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-sm">Name</label>
          <input
            type="text"
            defaultValue={user?.name}
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Email</label>
          <input
            type="email"
            defaultValue={user?.email}
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-sm">Description</label>
          <textarea
            placeholder="Tell us more about your business..."
            className="w-full border border-gray-300 rounded p-2 text-sm"
            rows={4}
          ></textarea>
        </div>
      </form>
    </>

  );
}
