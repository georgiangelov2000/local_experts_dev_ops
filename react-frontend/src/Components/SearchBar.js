export default function SearchBar({ categories, cities, onSearch, filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row overflow-hidden rounded-lg bg-gray-100">
        <select
          name="city"
          value={filters.city}
          onChange={handleChange}
          className="text-sm text-gray-900 bg-gray-100 w-full md:w-auto border-0 md:border-r md:border-r-white focus:outline-none pb-5 pt-5"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="text-sm text-gray-900 bg-gray-100 w-full md:w-auto border-0 md:border-r md:border-r-white focus:outline-none pb-5 pt-5" >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input
          type="text"
          name="term"
          value={filters.term}
          onChange={handleChange}
          placeholder="Search..."
          className="text-sm text-gray-900 bg-gray-100 flex-1 border-0 focus:outline-none p-3"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-700 text-white text-sm font-medium px-4 py-2 hover:bg-blue-800 focus:outline-none"
        >
          Search
        </button>
      </div>
    </div>
  );
}
