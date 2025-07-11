import { useEffect, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import { serviceReducer, initialServiceState } from '../../Reducers/serviceReducer';
import apiService from '../../Services/apiService';
import ServiceProviderCard from './ServiceProviderCard';
import SearchBar from './SearchBar';
import List from './List';
import Categories from './Categories';
import { useAuth } from '../../Context/AuthContext';
import SEO from '../Auth/Shared/SEO';
import { useLocation } from 'react-router-dom';

export default function Service() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [state, dispatch] = useReducer(serviceReducer, initialServiceState);
  const { user, authChecked } = useAuth();

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

  if (state.loading) {
    return <div className="p-6 text-center">Loading service providers...</div>;
  }

  return (
    <>
      <SEO
        title={title}
        description={description}
        url={canonicalUrl}
        image={image}
      />
      <div className="p-6 bg-white rounded-t-lg">
        <SearchBar 
          state={state} 
          dispatch={dispatch}
          setSearchParams={setSearchParams}
        />

        {state.viewMode === 'grid' ? (
          <>
            <Categories categories={state.categories} />
            <h2 className="text-xl font-semibold mb-4">Providers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
              {state.providers.map((provider) => (
                <ServiceProviderCard 
                  key={provider.id} 
                  provider={provider}
                  likes={state.likes}
                  dislikes={state.dislikes}
                  favourites={state.favourites}
                />
              ))}
            </div>
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
