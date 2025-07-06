import { useEffect, useState } from 'react';
import Select from 'react-select';
import { FiSearch, FiX, FiMapPin, FiLayers, FiList } from 'react-icons/fi';

export default function SearchBar({ categories, cities, serviceCategories, onSearch, filters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (name, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    onSearch({
      ...localFilters,
      city_alias: localFilters.city ? localFilters.city.map(c => c.value).join(',') : '',
      category_alias: localFilters.category?.value || '',
      service_category_id: localFilters.service_category?.value || '',
      sort: localFilters.sort?.value || '',
      term: localFilters.term || ''
    });
  };


  const handleClear = () => {
    const cleared = {
      city: [],
      category: null,
      service_category: null,
      term: '',
      sort: null
    };
    setLocalFilters(cleared);
    onSearch({
      city_alias: '',
      category: '',
      service_category: '',
      term: '',
      sort: ''
    });
  };

  const hasActiveFilters =
    localFilters.term ||
    (localFilters.city && localFilters.city.length > 0) ||
    localFilters.category ||
    localFilters.service_category ||
    localFilters.sort;

  // Options
  const cityOptions = cities.map(c => ({ value: c.alias, label: c.name }));
  const categoryOptions = categories.map(c => ({ value: c.alias, label: c.name }));
  const serviceOptions = serviceCategories.map(s => ({ value: s.id, label: s.name }));
  const sortOptions = [
    { value: 'promoted', label: 'Promoted First' },
    { value: 'reviews_desc', label: 'Reviews: High to Low' },
    { value: 'reviews_asc', label: 'Reviews: Low to High' },
    { value: 'views_desc', label: 'Views: High to Low' },
    { value: 'views_asc', label: 'Views: Low to High' },
    { value: 'likes_desc', label: 'Likes: High to Low' },
    { value: 'likes_asc', label: 'Likes: Low to High' }
  ];

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#d1d5db', // Tailwind bg-gray-100
      borderColor: 'transparent',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      minHeight: '40px',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#e5e7eb', // Tailwind bg-gray-200
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#374151', // Tailwind text-gray-700
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#6b7280', // Tailwind text-gray-500
      ':hover': {
        backgroundColor: '#f87171', // Tailwind red-400
        color: 'white',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af', // Tailwind text-gray-400
      fontSize: '0.875rem', // text-sm
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? '#e0f2fe' // Tailwind blue-100
        : 'white',
      color: '#111827', // Tailwind text-gray-900
      padding: '8px 12px',
      cursor: 'pointer',
    }),
  };


  return (
    <div className="bg-gray-100 p-4 rounded-lg space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Select
          options={cityOptions}
          value={localFilters.city}
          onChange={(option) => handleChange('city', option)}
          placeholder="Select City(s)"
          isClearable
          isMulti
          formatOptionLabel={(data) => (
            <div className="flex items-center gap-2">
              <FiMapPin className="text-gray-500" />
              <span className="text-sm">{data.label}</span>
            </div>
          )}
          styles={customSelectStyles}
        />
        <Select
          options={categoryOptions}
          value={localFilters.category}
          onChange={(option) => handleChange('category', option)}
          placeholder="Select Category"
          isClearable
          formatOptionLabel={(data) => (
            <div className="flex items-center gap-2">
              <FiLayers className="text-gray-500" />
              <span className="text-sm">{data.label}</span>
            </div>
          )}
          styles={customSelectStyles}
        />

        <Select
          options={serviceOptions}
          value={localFilters.service_category}
          onChange={(option) => handleChange('service_category', option)}
          placeholder="Select Service"
          isClearable
          formatOptionLabel={(data) => (
            <div className="flex items-center gap-2">
              <FiList className="text-gray-500" />
              <span className="text-sm">{data.label}</span>
            </div>
          )}
          styles={customSelectStyles}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <input
          type="text"
          name="term"
          value={localFilters.term || ''}
          onChange={(e) => handleChange('term', e.target.value)}
          placeholder="Search term..."
          className="w-full border border-gray-300 bg-gray-300 rounded p-2 text-sm"
          styles={customSelectStyles}

        />

        <Select
          options={sortOptions}
          value={localFilters.sort}
          onChange={(option) => handleChange('sort', option)}
          placeholder="Sort By"
          isClearable
          className="text-sm"
          styles={customSelectStyles}

        />

        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-sm text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-1 cursor-pointer"
          >
            <FiSearch />
            <span>Search</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleClear}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 flex items-center space-x-1 cursor-pointer"
            >
              <FiX />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
