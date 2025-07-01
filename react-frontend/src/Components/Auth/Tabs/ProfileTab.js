export default function ProfileTab({ user }) {
    return (
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
        <div>
          <label className="block mb-1 font-medium text-sm">City</label>
          <select className="w-full border border-gray-300 rounded p-2 text-sm">
            <option value="">Select City</option>
            <option>Sofia</option>
            <option>Plovdiv</option>
            <option>Varna</option>
          </select>
        </div>
      </form>
    );
  }
  