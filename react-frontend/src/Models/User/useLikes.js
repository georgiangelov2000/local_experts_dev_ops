import { useEffect, useState } from 'react';
import apiService from '../../Services/apiService';

export function useLikes(user, data) {
  const [likedProviders, setLikedProviders] = useState(data?.likes || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && data.providers) {
      setLikedProviders(data.providers);
      setLoading(false);
      return;
    }
    if (user.like_ids && user.like_ids.length > 0) {
      setLoading(true);
      apiService.getProvidersByIds(user.like_ids).then(res => {
        setLikedProviders(res.data.providers || []);
      }).finally(() => setLoading(false));
    } else {
      setLikedProviders([]);
    }
  }, [user.like_ids, data]);

  const removeLike = async (providerId) => {
    await apiService.dislikeProvider(providerId);
    setLikedProviders(likedProviders.filter(p => p.id !== providerId));
  };

  return { likedProviders, loading, removeLike };
} 