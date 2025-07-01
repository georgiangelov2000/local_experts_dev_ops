export default function ServicesTab() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg mt-5 text-sm text-gray-700 space-y-4">
        <h3 className="text-lg font-bold mb-4">Add a New Service</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 font-medium text-xs text-gray-500">Category</label>
            <select className="w-full border border-gray-300 rounded p-2 text-sm">
              <option value="">Select Category</option>
              <option>Cleaning</option>
              <option>Electrician</option>
              <option>Plumbing</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium text-xs text-gray-500">Subcategory</label>
            <select className="w-full border border-gray-300 rounded p-2 text-sm">
              <option value="">Select Subcategory</option>
              <option>Deep Cleaning</option>
              <option>Installation</option>
              <option>Repair</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
  