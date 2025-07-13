import Select from 'react-select';
import { FiMapPin, FiLayers, FiList, FiSearch, FiX, FiFilter, FiSliders } from 'react-icons/fi';

export default function SearchBar({ state, dispatch, setSearchParams }) {

  const cityOptions = state.cities.map(c => ({ value: c.alias, label: c.name }));
  const categoryOptions = state.categories.map(c => ({ value: c.alias, label: c.name }));
  const serviceOptions = state.serviceCategories.map(s => ({ value: s.alias, label: s.name }));

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb',
      borderWidth: '1px',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      minHeight: '48px',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#dbeafe',
      borderRadius: '8px',
      padding: '2px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#1e40af',
      fontWeight: '500',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#1e40af',
      borderRadius: '6px',
      ':hover': {
        backgroundColor: '#ef4444',
        color: 'white',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
      fontSize: '0.875rem',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? '#eff6ff'
        : 'white',
      color: '#111827',
      padding: '12px 16px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      '&:active': {
        backgroundColor: '#dbeafe',
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#111827',
      fontSize: '0.875rem',
    }),
    input: (provided) => ({
      ...provided,
      fontSize: '0.875rem',
    }),
  };

  const applyFiltersToURL = () => {
    const params = new URLSearchParams();
    if (state.filters.city_alias) params.set('city_alias', state.filters.city_alias);
    if (state.filters.category_alias) params.set('category_alias', state.filters.category_alias);
    if (state.filters.service_category_alias) params.set('service_category_alias', state.filters.service_category_alias);
    if (state.filters.term) params.set('term', state.filters.term);
    if (state.filters.sort) params.set('sort', state.filters.sort);

    setSearchParams(params);
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
    setSearchParams({});
  };

  const hasActiveFilters = state.filters.city_alias || state.filters.category_alias || state.filters.service_category_alias || state.filters.term || state.filters.sort;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mr-5">
          <FiSearch className="text-white text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Find Service Providers</h2>
          <p className="text-gray-600">Search and filter to find the perfect professional for your needs</p>
        </div>
      </div>

      {/* Search Filters */}
      <div className="space-y-4">
        {/* First Row - Location, Category, Service */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiMapPin className="inline mr-2 text-blue-500" />
              Location
            </label>
            <Select
              options={cityOptions}
              value={
                state.filters.city_alias
                  ? state.filters.city_alias.split(",").map(alias =>
                      cityOptions.find(opt => opt.value === alias)
                    ).filter(Boolean)
                  : []
              }
              onChange={(option) => {
                dispatch({
                  type: "UPDATE_FILTER",
                  payload: {
                    city_alias: option ? option.map(o => o.value).join(",") : ""
                  }
                });
              }}
              placeholder="Select cities..."
              isClearable
              isMulti
              formatOptionLabel={(data) => (
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-blue-500" />
                  <span>{data.label}</span>
                </div>
              )}
              styles={customSelectStyles}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiLayers className="inline mr-2 text-green-500" />
              Category
            </label>
            <Select
              options={categoryOptions}
              value={categoryOptions.find(opt => opt.value === state.filters.category_alias) || null}
              onChange={(option) => {
                dispatch({
                  type: "UPDATE_FILTER",
                  payload: { category_alias: option ? option.value : "" }
                });
              }}
              placeholder="Select category..."
              isClearable
              formatOptionLabel={(data) => (
                <div className="flex items-center gap-2">
                  <FiLayers className="text-green-500" />
                  <span>{data.label}</span>
                </div>
              )}
              styles={customSelectStyles}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiList className="inline mr-2 text-purple-500" />
              Service Type
            </label>
            <Select
              options={serviceOptions}
              value={serviceOptions.find(opt => opt.value === state.filters.service_category_alias) || null}
              onChange={(option) => {
                dispatch({
                  type: "UPDATE_FILTER",
                  payload: { service_category_alias: option ? option.value : "" }
                });
              }}
              placeholder="Select service..."
              isClearable
              formatOptionLabel={(data) => (
                <div className="flex items-center gap-2">
                  <FiList className="text-purple-500" />
                  <span>{data.label}</span>
                </div>
              )}
              styles={customSelectStyles}
            />
          </div>
        </div>

        {/* Second Row - Search Term, Sort, Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiSearch className="inline mr-2 text-orange-500" />
              Search Term
            </label>
            <input
              type="text"
              value={state.filters.term || ""}
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_FILTER",
                  payload: { term: e.target.value }
                });
              }}
              placeholder="Search for providers, services, or keywords..."
              className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiSliders className="inline mr-2 text-gray-500" />
              Sort By
            </label>
            <Select
              options={state.sortOptions}
              value={state.sortOptions.find(opt => opt.value === state.filters.sort) || null}
              onChange={(option) => {
                dispatch({
                  type: "UPDATE_FILTER",
                  payload: { sort: option ? option.value : "" }
                });
              }}
              placeholder="Sort results..."
              isClearable
              styles={customSelectStyles}
            />
          </div>

          <div className="flex items-end space-x-3">
            <button
              onClick={applyFiltersToURL}
              className={`flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${hasActiveFilters ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <FiSearch className="text-lg" />
              <span>Search</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center space-x-2 font-medium cursor-pointer"
              >
                <FiX />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center">
              <FiFilter className="mr-2 text-blue-500" />
              Active Filters
            </h3>
            <button
              onClick={clearFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {state.filters.city_alias && (
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                <FiMapPin className="mr-1" />
                Cities: {state.filters.city_alias.split(',').length} selected
              </span>
            )}
            {state.filters.category_alias && (
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                <FiLayers className="mr-1" />
                {categoryOptions.find(opt => opt.value === state.filters.category_alias)?.label}
              </span>
            )}
            {state.filters.service_category_alias && (
              <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                <FiList className="mr-1" />
                {serviceOptions.find(opt => opt.value === state.filters.service_category_alias)?.label}
              </span>
            )}
            {state.filters.term && (
              <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                <FiSearch className="mr-1" />
                "{state.filters.term}"
              </span>
            )}
            {state.filters.sort && (
              <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                <FiSliders className="mr-1" />
                {state.sortOptions.find(opt => opt.value === state.filters.sort)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
