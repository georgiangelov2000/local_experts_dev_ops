import { useEffect, useState } from 'react';
import apiService from '../../Services/apiService';

export function useLikes(user) {
  const [likedProviders, setLikedProviders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.like_ids && user.like_ids.length > 0) {
      setLoading(true);
      apiService.getProvidersByIds(user.like_ids).then(res => {
        setLikedProviders(res.data.providers || []);
      }).finally(() => setLoading(false));
    } else {
      setLikedProviders([]);
    }
  }, [user.like_ids]);

  const removeLike = async (providerId) => {
    await apiService.dislikeProvider(providerId);
    setLikedProviders(likedProviders.filter(p => p.id !== providerId));
  };

  return { likedProviders, loading, removeLike };
} 