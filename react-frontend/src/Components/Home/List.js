import ListElement from './List/ListElement';
import Pagination from './List/Pagination';
import { FiSearch, FiFilter, FiX, FiList } from 'react-icons/fi';

export default function List({ state, dispatch, searchParams, setSearchParams }) {
  const hasFilters = Object.keys(state.filtered || {}).length > 0;

  if (state.providers.length === 0) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Search Results</h2>
            <p className="text-gray-600">No providers found matching your criteria</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FiList className="text-white" />
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {hasFilters && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Active Filters</h3>
              <button
                onClick={() => setSearchParams({})}
                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiX className="mr-1" />
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(state.filtered).map(([key, value]) => (
                <span 
                  key={key} 
                  className="inline-flex items-center px-3 py-1 bg-white text-gray-700 text-sm rounded-full border border-blue-200 shadow-sm"
                >
                  <FiFilter className="mr-1 text-blue-500" />
                  {key}: {value}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-xl p-8">
            <FiSearch className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {hasFilters 
                ? 'Try adjusting your search criteria or browse all categories to find what you\'re looking for.'
                : 'Check back later for new service providers in your area.'
              }
            </p>
            <div className="flex items-center justify-center space-x-3">
              {hasFilters && (
                <button
                  onClick={() => setSearchParams({})}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiFilter className="mr-2" />
                  Clear Filters
                </button>
              )}
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Browse All Categories
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Search Results</h2>
          <p className="text-gray-600">
            {state.pagination.total} provider{state.pagination.total !== 1 ? 's' : ''} found
            {hasFilters && ' matching your criteria'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <FiList className="text-white" />
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {hasFilters && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Active Filters</h3>
            <button
              onClick={() => setSearchParams({})}
              className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiX className="mr-1" />
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(state.filtered).map(([key, value]) => (
              <span 
                key={key} 
                className="inline-flex items-center px-3 py-1 bg-white text-gray-700 text-sm rounded-full border border-blue-200 shadow-sm"
              >
                <FiFilter className="mr-1 text-blue-500" />
                {key}: {value}
              </span>
            ))}
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
              Page: {state.pagination.current_page} / {state.pagination.last_page}
            </span>
          </div>
        </div>
      )}

      {/* Results List */}
      <div className="space-y-4">
        {state.providers.map((provider, index) => (
          <ListElement 
            key={provider.id} 
            provider={provider}
            likes={state.likes}
            dislikes={state.dislikes}
            favourites={state.favourites}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <Pagination
          pagination={state.pagination}
          onPageChange={(page) => {
            const params = new URLSearchParams(Object.fromEntries(searchParams.entries()));
            params.set('page', page);
            setSearchParams(params);
          }}
        />
      </div>
    </div>
  );
}
