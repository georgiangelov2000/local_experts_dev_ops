import Select from 'react-select';
import { FiMapPin, FiLayers, FiList, FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ state, dispatch, setSearchParams, searchParams }) {

  // Options
  const cityOptions = state.cities.map(c => ({ value: c.alias, label: c.name }));
  const categoryOptions = state.categories.map(c => ({ value: c.alias, label: c.name }));
  const serviceOptions = state.serviceCategories.map(s => ({ value: s.id, label: s.name }));

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

  const handleSearch = () => {
    dispatch({
      type: "APPLY_FILTERS",
      payload: {
        city_alias: state.filters.city_alias,
        category_alias: state.filters.category_alias,
        service_category_alias: state.filters.service_category_alias,
        term: state.filters.term,
        sort: state.filters.sort
      }
    });
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
          onChange={option => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <input
          type="text"
          name="term"
          value={state.filters.term ?? ""}
          onChange={e => {
            dispatch({
              type: "UPDATE_FILTER",
              payload: { term: e.target.value }
            });
          }}
          placeholder="Search term..."
          className="w-full border border-gray-300 bg-gray-300 rounded p-2 text-sm"
          styles={customSelectStyles}
        />
        <Select
          options={state.sortOptions}
          value={state.sortOptions.find(option => option.value === state.filters.sort) || null}
          onChange={(option) => {
            dispatch({
              type: "UPDATE_FILTER",
              payload: { sort: option ? option.value : "" }
            });
          }}
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

          {searchParams.size > 0 && (
            <button
              onClick={() => {
                dispatch({ type: "CLEAR_FILTERS" });
                setSearchParams({});
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 flex items-center space-x-1 cursor-pointer"
            >
              <FiX />
              <span>Clear</span>
            </button>
          )}
        </div>

      </div>
    </div >
  );
}
