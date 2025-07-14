import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../Context/AuthContext';
import ServiceProviderCard from '../Components/Home/ServiceProviderCard';
import SEO from '../Components/Auth/Shared/SEO';
import apiService from '../Services/apiService';
import { FaSpinner } from 'react-icons/fa';

// Helper to get cached providers from localStorage
function getCachedProviders(ids) {
  const cache = JSON.parse(localStorage.getItem('provider_cache') || '{}');
  const now = Date.now();
  const validProviders = [];
  const missingIds = [];
  ids.forEach(id => {
    if (cache[id] && now - cache[id].timestamp < 60 * 60 * 1000) { // 1 hour cache
      validProviders.push(cache[id].data);
    } else {
      missingIds.push(id);
    }
  });
  return { validProviders, missingIds };
}

export default function Favourites() {
  const { isAuthenticated, authChecked } = useAuth();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toggle favourite for guest users
  const toggleFavourite = useCallback((providerId) => {
    let guestFavs = JSON.parse(localStorage.getItem('guest_favourites') || '[]');
    if (guestFavs.includes(providerId)) {
      guestFavs = guestFavs.filter(id => id !== providerId);
      // Optionally remove from cache as well
      // const cache = JSON.parse(localStorage.getItem('provider_cache') || '{}');
      // delete cache[providerId];
      // localStorage.setItem('provider_cache', JSON.stringify(cache));
    } else {
      guestFavs.push(providerId);
    }
    localStorage.setItem('guest_favourites', JSON.stringify(guestFavs));
    // Update providers list
    setProviders(prev => prev.filter(p => guestFavs.includes(p.id)));
    // This will also trigger header count update via storage event
  }, []);

  useEffect(() => {
    async function fetchFavourites() {
      setLoading(true);
      if (!authChecked) return;
      if (!isAuthenticated) {
        const guestFavs = JSON.parse(localStorage.getItem('guest_favourites') || '[]');
        const { validProviders, missingIds } = getCachedProviders(guestFavs);
        let fetchedProviders = [];
        if (missingIds.length > 0) {
          const res = await apiService.getProvidersByIds(missingIds);
          fetchedProviders = res.data.providers || [];
          // Update cache
          const cache = JSON.parse(localStorage.getItem('provider_cache') || '{}');
          fetchedProviders.forEach(provider => {
            cache[provider.id] = { data: provider, timestamp: Date.now() };
          });
          localStorage.setItem('provider_cache', JSON.stringify(cache));
        }
        setProviders([...validProviders, ...fetchedProviders]);
      }
      setLoading(false);
    }
    fetchFavourites();
  }, [isAuthenticated, authChecked]);

  if (!authChecked) return null;
  if (isAuthenticated) {
    return (
      <div className="p-6 bg-white rounded-t-lg text-center text-gray-500">
        Favourites are only available for guests.
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Your Favourites - Local Experts"
        description="View your favourite service providers on Local Experts."
        url="https://yourdomain.com/favourites"
        image="https://yourdomain.com/og-image.jpg"
      />
      <div className="p-6 bg-white rounded-t-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Your Favourites</h1>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="animate-spin text-3xl text-blue-600" />
          </div>
        ) : providers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <ServiceProviderCard 
                key={provider.id} 
                provider={provider} 
                favourites={providers.map(p => p.id)}
                toggleFavourite={toggleFavourite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>You have no favourites yet. Start adding some providers!</p>
          </div>
        )}
      </div>
    </>
  );
}
  