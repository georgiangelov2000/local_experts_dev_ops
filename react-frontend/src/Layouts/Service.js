import { useEffect, useState } from 'react';
import apiService from '../Services/apiService';
import ServiceProviderCard from '../Components/ServiceProviderCard';
import SearchBar from '../Components/SearchBar';

export default function Service() {
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getAds()
      .then((response) => {
        setCategories(response.data.categories);
        setProviders(response.data.service_providers);
      })
      .catch((err) => {
        console.error('Error loading data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading service providers...</div>;
  }

  return (
    <>
    <div className="p-6">
      <SearchBar />
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat, index) => (
          <span
            key={index}
            className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {/* Replace this placeholder with your actual icon */}
            <svg
              className="w-4 h-4 mr-1 text-blue-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-1h2v1zm0-2H9V7h2v4z" />
            </svg>
            {cat.name}
          </span>
        ))}
      </div>


      <h2 className="text-xl font-semibold mb-4">Providers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {providers.map((provider) => (
          <ServiceProviderCard key={provider.id} provider={provider} />
        ))}
      </div>

      <div className="text-center">
        <button
          className="inline-block bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          View More
        </button>
      </div>
    </div>
    </>
  );
}
