import { useEffect, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiService from '../Services/apiService';
import { providerReducer, initialState } from '../Reducers/providerReducer';

export const useProvider = (alias) => {
  const [state, dispatch] = useReducer(providerReducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    provider,
    related,
    relatedCount,
    reviews,
    loading,
    reviewsLoading,
    reviewsError,
    activeTab,
    showContact
  } = state;

  // Load provider data
  useEffect(() => {
    if (!alias) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    const page = parseInt(searchParams.get('page')) || 1;

    apiService.getAdById(alias, page)
      .then((response) => {
        dispatch({ type: 'SET_PROVIDER', payload: response.data.service_provider });
        dispatch({ type: 'SET_RELATED', payload: response.data.related_providers });
        dispatch({ type: 'SET_RELATED_COUNT', payload: response.data.related_providers_count || 0 });
        dispatch({ type: 'SET_REVIEWS', payload: response.data.reviews });
        // apiService.registerView(alias);
      })
      .catch(err => {
        console.error('Error loading provider:', err);
        dispatch({ type: 'SET_REVIEWS_ERROR', payload: 'Failed to load provider data.' });
      })
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  }, [alias, searchParams]);

  // Handle pagination
  const onPageChange = (page) => {
    const params = new URLSearchParams(Object.fromEntries(searchParams.entries()));
    params.set('page', page);
    setSearchParams(params);
    
    dispatch({ type: 'SET_REVIEWS_LOADING', payload: true });
    dispatch({ type: 'SET_REVIEWS_ERROR', payload: null });
    
    apiService.getAdById(alias, page)
      .then((response) => {
        dispatch({ type: 'SET_REVIEWS', payload: response.data.reviews });
      })
      .catch((err) => {
        console.error('Error loading reviews:', err);
        dispatch({ type: 'SET_REVIEWS_ERROR', payload: 'Failed to load reviews.' });
      })
      .finally(() => dispatch({ type: 'SET_REVIEWS_LOADING', payload: false }));
  };

  // Handle tab changes
  const setActiveTab = (tab) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  // Handle contact modal
  const toggleContact = () => {
    dispatch({ type: 'TOGGLE_CONTACT' });
  };

  return {
    // State
    provider,
    related,
    relatedCount,
    reviews,
    loading,
    reviewsLoading,
    reviewsError,
    activeTab,
    showContact,
    
    // Actions
    onPageChange,
    setActiveTab,
    toggleContact,
    
    // Computed values
    currentPage: parseInt(searchParams.get('page')) || 1,
  };
}; 