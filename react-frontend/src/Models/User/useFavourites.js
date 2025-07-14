import { useEffect, useState } from 'react';
import apiService from '../../Services/apiService';

export function useFavourites(user, data) {
  const [favouriteProviders, setFavouriteProviders] = useState(data?.favourites || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && data.favourites) {
      setFavouriteProviders(data.favourites);
      setLoading(false);
      return;
    }
    if (user.favourite_ids && user.favourite_ids.length > 0) {
      setLoading(true);
      apiService.getProvidersByIds(user.favourite_ids).then(res => {
        setFavouriteProviders(res.data.favourites || []);
      }).finally(() => setLoading(false));
    } else {
      setFavouriteProviders([]);
    }
  }, [user.favourite_ids, data]);

  const removeFavourite = async (providerId) => {
    await apiService.removeFavourite(providerId);
    setFavouriteProviders(favouriteProviders.filter(p => p.id !== providerId));
  };

  return { favouriteProviders, loading, removeFavourite };
} 