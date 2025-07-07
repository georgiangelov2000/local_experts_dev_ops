import { useEffect, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import { serviceReducer, initialServiceState } from '../../Reducers/serviceReducer';
import apiService from '../../Services/apiService';
import ServiceProviderCard from './ServiceProviderCard';
import SearchBar from './SearchBar';
import List from './List';
import Categories from './Categories';

export default function Service() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(serviceReducer, initialServiceState);

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

  if (state.loading) {
    return <div className="p-6 text-center">Loading service providers...</div>;
  }

  return (
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
              <ServiceProviderCard key={provider.id} provider={provider} />
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
  );
}
