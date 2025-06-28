import { useEffect, useState } from 'react';
import apiService from '../../Services/apiService';
import ServiceProviderCard from './ServiceProviderCard';
import SearchBar from './SearchBar';
import List from './List'
import Categories from './Categories';

export default function Service() {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // or 'list'
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    city: '',
    category: '',
    term: ''
  });
  const fetchProviders = (filters = {}, pageNum = 1) => {
    setLoading(true);
    // Example: Adjust API call to include filters + pagination
    apiService.getAds({
      params: {
        category_id: filters.category,
        city_id: filters.city,
        term: filters.term,
        page: pageNum
      }
    })
      .then((response) => {
        setCategories(response.data.categories);
        setCities(response.data.cities);
        setProviders(response.data.service_providers);
        // If filters applied, switch view mode to list
        if (filters.category || filters.city || filters.term) {
          setViewMode('list');
        } else {
          setViewMode('grid');
        }
      })
      .catch((err) => {
        console.error('Error loading data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProviders({}, page);
  }, [page]);

  const handleSearch = (filters) => {
    setPage(1);
    fetchProviders(filters, 1);
  };

  const handleNextPage = () => setPage((p) => p + 1);
  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));

  if (loading) {
    return <div className="p-6 text-center">Loading service providers...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-t-lg">
      <SearchBar 
        categories={categories} 
        cities={cities} 
        onSearch={handleSearch} 
        filters={filters}
        setFilters={setFilters}
      />

      <Categories 
        categories = {categories}
      />

      {viewMode === 'grid' ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Providers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {providers.map((provider) => (
              <ServiceProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </>
      ) : (
        <>
          <List providers={providers} />
        </>
      )}

      {/* <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={handlePrevPage}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div> */}
    </div>
  );
}
