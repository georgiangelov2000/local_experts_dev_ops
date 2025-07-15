import { useEffect, useReducer, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { serviceReducer, initialServiceState } from '../../Reducers/serviceReducer';
import apiService from '../../Services/apiService';
import ServiceProviderCard from './ServiceProviderCard';
import ServiceProviderCardSkeleton from './ServiceProviderCardSkeleton';
import SearchBar from './SearchBar';
import List from './List';
import Categories from './Categories';
import { useAuth } from '../../Context/AuthContext';
import SEO from '../Auth/Shared/SEO';
import { useLocation } from 'react-router-dom';
import { FiGrid, FiList, FiSearch, FiFilter } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function Service() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [state, dispatch] = useReducer(serviceReducer, initialServiceState);
  const { user, authChecked, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  // Initialize favourites on load
  useEffect(() => {
    if (!authChecked) return;
    if (isAuthenticated && user) {
      // Fetch from API or use user.favourite_ids
      dispatch({
        type: 'SET_FAVOURITES',
        payload: { favourites: user.favourite_ids || [] },
      });
    } else {
      // Guest: load from localStorage
      const guestFavs = JSON.parse(localStorage.getItem('guest_favourites') || '[]');
      dispatch({
        type: 'SET_FAVOURITES',
        payload: { favourites: guestFavs },
      });
    }
  }, [user, authChecked, isAuthenticated]);

  // likes ,dislikes, favourites for auth users
  useEffect(() => {
    if (authChecked && user) {
      dispatch({
        type: 'SET_USER_ACTIONS',
        payload: {
          likes: user.like_ids,
          dislikes: user.dislike_ids,
          favourites: user.favourite_ids
        }
      });
    }
  }, [user, authChecked]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_START" });

      const paramsObj = Object.fromEntries(searchParams.entries());

      try {
        const response = await apiService.getAds({ params: paramsObj });

        dispatch({
          type: "FETCH_SUCCESS",
          payload: {
            categories: response.data.categories,
            cities: response.data.cities,
            providers: response.data.service_providers,
            pagination: response.data.pagination,
            serviceCategories: response.data.service_provider_categories,
            filtered: response.data.filtered,
            filters: response.data.filters,
            viewMode: (paramsObj.sort || paramsObj.category_alias || paramsObj.city_alias || paramsObj.term) ? 'list' : 'grid'
          }
        });
      } catch (err) {
        console.error("Error loading data:", err);
        dispatch({ type: "FETCH_ERROR" });
      }
    };

    fetchData();
  }, [searchParams]);

  // Toggle favourite handler
  const toggleFavourite = useCallback(
    async (providerId) => {
      if (isAuthenticated) {
        // Authenticated: call API to add/remove favourite
        try {
          const isFav = state.favourites.includes(providerId);
          if (isFav) {
            await apiService.removeFavourite(providerId);
          } else {
            await apiService.addFavourite(providerId);
          }
          // Update state
          dispatch({ type: 'TOGGLE_FAVOURITE', payload: { id: providerId } });
        } catch (err) {
          // Optionally show error toast
          console.error('Failed to update favourite:', err);
        }
      } else {
        // Guest: update localStorage
        let guestFavs = JSON.parse(localStorage.getItem('guest_favourites') || '[]');
        if (guestFavs.includes(providerId)) {
          guestFavs = guestFavs.filter(id => id !== providerId);
        } else {
          guestFavs.push(providerId);
        }
        localStorage.setItem('guest_favourites', JSON.stringify(guestFavs));
        dispatch({ type: 'TOGGLE_FAVOURITE', payload: { id: providerId } });
      }
    },
    [isAuthenticated, state.favourites]
  );

  // Dynamic SEO logic
  const filters = [];
  for (const [key, value] of searchParams.entries()) {
    if (value) filters.push(`${key}: ${value}`);
  }
  const title = filters.length
    ? `Providers matching ${filters.join(', ')} | Local Experts`
    : 'Find Service Providers | Local Experts';
  const description = filters.length
    ? `Browse service providers filtered by ${filters.join(', ')}.`
    : 'Browse and find the best service providers in your area.';
  const canonicalUrl = typeof window !== 'undefined'
    ? window.location.origin + location.pathname + location.search
    : location.pathname + location.search;
  const image = 'https://yourdomain.com/og-image.jpg'; // Replace with your real OG image

  // Loading state
  if (state.loading) {
    return (
      <>
        <SEO
          title={title}
          description={description}
          url={canonicalUrl}
          image={image}
        />
        <div className=" p-6 bg-white rounded-t-lg">
          <div className="flex justify-center items-center p-6">
            <FaSpinner className="animate-spin text-2xl text-blue-600" />
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ServiceProviderCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <SEO
        title={title}
        description={description}
        url={canonicalUrl}
        image={image}
      />
      <div className="bg-white rounded-t-lg p-2 sm:p-4 md:p-6 lg:p-8">
        <SearchBar 
          state={state} 
          dispatch={dispatch}
          setSearchParams={setSearchParams}
        />

        {state.viewMode === 'grid' ? (
          <>
            <Categories categories={state.categories} />
            
            {/* Providers Section Header */}
            <div className="flex flex-wrap items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{t('service_providers')}</h2>
              <span className="text-sm text-gray-500">{t('providers_found', { count: state.providers.length })}</span>
            </div>

            {/* Providers Grid */}
            {state.providers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                {state.providers.map((provider) => (
                  <ServiceProviderCard 
                    key={provider.id} 
                    provider={provider}
                    likes={state.likes}
                    dislikes={state.dislikes}
                    favourites={state.favourites}
                    toggleFavourite={toggleFavourite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-xl p-8">
                  <FiSearch className="mx-auto text-gray-400 text-4xl mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
                  <p className="text-gray-500 mb-4">
                    {state.filtered 
                      ? 'Try adjusting your search criteria or browse all categories.'
                      : 'Check back later for new service providers.'
                    }
                  </p>
                  {state.filtered && (
                    <button
                      onClick={() => setSearchParams({})}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FiFilter className="mr-2" />
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <List 
            state={state} 
            dispatch={dispatch}
            setSearchParams={setSearchParams}
            searchParams={searchParams} 
          />
        )}
      </div>
    </>
  );
}
