export default function SearchBar() {
    return (
        <div className="mb-6">
            <div className="flex flex-col md:flex-row overflow-hidden rounded-lg bg-gray-100">
            <select
            className="text-sm text-gray-900 bg-gray-100 w-full md:w-auto border-0 md:border-r md:border-r-white focus:outline-none pb-5 pt-5"
        >
            <option value="">Select City</option>
            <option value="Sofia">Sofia</option>
            <option value="Plovdiv">Plovdiv</option>
            <option value="Varna">Varna</option>
            <option value="Burgas">Burgas</option>
        </select>

        <select
            className="text-sm text-gray-900 bg-gray-100 w-full md:w-auto border-0 md:border-r md:border-r-white focus:outline-none pb-5 pt-5"
        >
            <option value="">Select Category</option>
            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Painter">Painter</option>
            <option value="Landscaper">Landscaper</option>
        </select>
          <input
            type="text"
            placeholder="Search..."
            className="text-sm text-gray-900 bg-gray-100 flex-1 border-0 focus:outline-none pb-5 pt-5"
          />  
        <button className="bg-blue-700 text-white text-sm font-medium px-4 py-2 border-0 hover:bg-blue-800 focus:outline-none pb-5 pt-5 cursor-pointer">
            Search
        </button>
        </div>
      </div>
    );
  }
  