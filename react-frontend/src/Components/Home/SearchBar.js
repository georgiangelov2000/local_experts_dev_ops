import { useEffect, useState } from 'react';
import { FiMapPin, FiLayers, FiList, FiSearch, FiFilter, FiX } from 'react-icons/fi';

export default function SearchBar({ categories, cities, serviceCategories, onSearch, filters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    setLocalFilters({
      ...localFilters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = () => {
    onSearch(localFilters);
  };

  const handleClear = () => {
    const cleared = {
      city: '',
      category: '',
      service_category: '',
      term: '',
      sort: ''
    };
    setLocalFilters(cleared);
    onSearch(cleared);
  };

  // Check if any filter is active
  const hasActiveFilters = Object.values(localFilters).some(value => value !== '');

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row overflow-hidden rounded-lg bg-gray-100 gap-2 md:gap-0">
        {/* City */}
        <div className="relative w-full md:w-auto">
          <FiMapPin className="ml-2 absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <select
            name="city"
            value={localFilters.city}
            onChange={handleChange}
            className="cursor-pointer pl-8 text-sm text-gray-900 bg-gray-100 w-full border-0 md:border-r md:border-r-white focus:outline-none pb-5 pt-5"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.alias} value={city.alias}>{city.name}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="relative w-full md:w-auto">
          <FiLayers className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <select
            name="category"
            value={localFilters.category}
            onChange={handleChange}
            className="cursor-pointer pl-8 text-sm text-gray-900 bg-gray-100 w-full border-0 md:border-r md:border-r-white focus:outline-none pb-5 pt-5"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.alias} value={cat.alias}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Service Category */}
        <div className="relative w-full md:w-auto">
          <FiList className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <select
            name="service_category"
            value={localFilters.service_category || ''}
            onChange={handleChange}
            className="cursor-pointer pl-8 text-sm text-gray-900 bg-gray-100 w-full border-0 md:border-r md:border-r-white focus:outline-none pb-5 pt-5"
          >
            <option value="">Select Service</option>
            {serviceCategories.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search term */}
        <input
          type="text"
          name="term"
          value={localFilters.term}
          onChange={handleChange}
          placeholder="Search..."
          className="text-sm text-gray-900 bg-gray-100 flex-1 border-0 focus:outline-none p-3"
        />

        {/* Sort */}
        <div className="relative w-full md:w-auto">
          <FiFilter className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <select
            name="sort"
            value={localFilters.sort || ''}
            onChange={handleChange}
            className="pl-8 text-sm text-gray-900 bg-gray-100 w-full border-0 focus:outline-none pb-5 pt-5"
          >
            <option value="">Sort By</option>
            <option value="promoted">Promoted First</option>
            <option value="reviews_desc">Reviews: High to Low</option>
            <option value="reviews_asc">Reviews: Low to High</option>
            <option value="views_desc">Views: High to Low</option>
            <option value="views_asc">Views: Low to High</option>
          </select>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="bg-blue-700 text-white text-sm font-medium px-4 py-2 hover:bg-blue-800 focus:outline-none inline-flex items-center space-x-2 cursor-pointer"
        >
          <FiSearch className="text-white" />
          <span>Search</span>
        </button>

        {/* Conditionally show Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="bg-gray-300 text-gray-700 text-sm font-medium px-4 py-2 hover:bg-gray-400 focus:outline-none inline-flex items-center space-x-2 cursor-pointer"
          >
            <FiX className="text-gray-700" />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}
