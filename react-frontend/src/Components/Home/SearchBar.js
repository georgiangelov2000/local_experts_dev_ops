import Select from 'react-select';
import { FiMapPin, FiLayers, FiList, FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ state, dispatch, setSearchParams }) {

  const cityOptions = state.cities.map(c => ({ value: c.alias, label: c.name }));
  const categoryOptions = state.categories.map(c => ({ value: c.alias, label: c.name }));
  const serviceOptions = state.serviceCategories.map(s => ({ value: s.alias, label: s.name }));

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

  return (
    <div className="bg-gray-100 p-4 rounded-lg space-y-3 mb-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
          value={categoryOptions.find(opt => opt.value === state.filters.category_alias) || null}
          onChange={(option) => {
            dispatch({
              type: "UPDATE_FILTER",
              payload: { category_alias: option ? option.value : "" }
            });
          }}
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
          value={serviceOptions.find(opt => opt.value === state.filters.service_category_alias) || null}
          onChange={(option) => {
            dispatch({
              type: "UPDATE_FILTER",
              payload: { service_category_alias: option ? option.value : "" }
            });
          }}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
        <input
          type="text"
          value={state.filters.term || ""}
          onChange={(e) => {
            dispatch({
              type: "UPDATE_FILTER",
              payload: { term: e.target.value }
            });
          }}
          placeholder="Search term..."
          className="w-full border border-gray-300 bg-gray-300 rounded p-2 text-sm"
        />

        <Select
          options={state.sortOptions}
          value={state.sortOptions.find(opt => opt.value === state.filters.sort) || null}
          onChange={(option) => {
            dispatch({
              type: "UPDATE_FILTER",
              payload: { sort: option ? option.value : "" }
            });
          }}
          placeholder="Sort By"
          isClearable
          styles={customSelectStyles}
        />

        <div className="flex gap-2">
          <button
            onClick={applyFiltersToURL}
            className="bg-blue-600 text-sm text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-1"
          >
            <FiSearch />
            <span>Search</span>
          </button>

          {(state.filters.city_alias || state.filters.category_alias || state.filters.service_category_alias || state.filters.term || state.filters.sort) && (
            <button
              onClick={clearFilters}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 flex items-center space-x-1"
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
