import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiService from '../../Services/apiService';
import ServiceProviderCard from './ServiceProviderCard';
import SearchBar from './SearchBar';
import List from './List';
import Categories from './Categories';

export default function Service() {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [providers, setProviders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [serviceCategories, setServiceCategories] = useState([]);
  const [filters, setFilters] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const fetchProviders = (paramsObj) => {
    setLoading(true);
    apiService.getAds({ params: paramsObj })
      .then((response) => {
        setCategories(response.data.categories);
        setCities(response.data.cities);
        setProviders(response.data.service_providers);
        setPagination(response.data.pagination);
        setServiceCategories(response.data.service_provider_categories)
        setFilters(response.data)
        if (paramsObj.category_alias || paramsObj.term || paramsObj.city_alias) {
          setViewMode('list');
        } else {
          setViewMode('grid');
        }
      })
      .catch((err) => console.error('Error loading data:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const paramsObj = Object.fromEntries(searchParams.entries());
    fetchProviders(paramsObj);
  }, [searchParams]);

  const handleSearch = (filters) => {
    const newParams = new URLSearchParams();
    if (filters.city) newParams.set('city_alias', filters.city);
    if (filters.category) newParams.set('category_alias', filters.category);
    if (filters.service_category) newParams.set('service_category_alias', filters.service_category);
    if (filters.term) newParams.set('term', filters.term);
    newParams.set('page', 1);
    setSearchParams(newParams);
  };

  const handlePageChange = (pageNum) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', pageNum);
    setSearchParams(newParams);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading service providers...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-t-lg">
      <SearchBar
        categories={categories}
        cities={cities}
        serviceCategories={serviceCategories}
        onSearch={handleSearch}
        filters={{
          city: searchParams.get('city_id') || '',
          category: searchParams.get('category_id') || '',
          service_category: searchParams.get('service_category_id') || '',
          term: searchParams.get('term') || ''
        }}
      />

      {viewMode === 'grid' ? (
        <>
          <Categories categories={categories} />
          <h2 className="text-xl font-semibold mb-4">Providers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {providers.map((provider) => (
              <ServiceProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </>
      ) : (
        <List
           providers={providers} 
           filters={filters}
           pagination={pagination} 
           onPageChange={handlePageChange}
           serviceCategories = {serviceCategories} 
        />
      )}
    </div>
  );
}
