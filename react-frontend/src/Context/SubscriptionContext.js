import { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../Services/apiService';
import { useAuth } from './AuthContext';

const SubscriptionContext = createContext();

export function SubscriptionProvider({ children }) {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const [promotion, setPromotion] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all plans
  useEffect(() => {
    apiService.getSubscriptionPlans().then(res => setPlans(res.data));
  }, []);

  // Fetch my subscriptions and promotion status if user is provider
  useEffect(() => {
    if (user && user.provider_id) {
      setLoading(true);
      apiService.getProviderSubscriptions(user.provider_id)
        .then(res => setMySubscriptions(res.data))
        .catch(() => setMySubscriptions([]));
      apiService.checkProviderPromotion(user.provider_id)
        .then(res => setPromotion(res.data.promoted))
        .catch(() => setPromotion(false))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const subscribe = async (planId) => {
    if (!user?.provider_id) return;
    setLoading(true);
    await apiService.subscribeProvider(user.provider_id, planId);
    // Refresh
    const [subs, promo] = await Promise.all([
      apiService.getProviderSubscriptions(user.provider_id),
      apiService.checkProviderPromotion(user.provider_id)
    ]);
    setMySubscriptions(subs.data);
    setPromotion(promo.data.promoted);
    setLoading(false);
  };

  const unsubscribe = async () => {
    if (!user?.provider_id) return;
    setLoading(true);
    await apiService.unsubscribeProvider(user.provider_id);
    // Refresh
    const [subs, promo] = await Promise.all([
      apiService.getProviderSubscriptions(user.provider_id),
      apiService.checkProviderPromotion(user.provider_id)
    ]);
    setMySubscriptions(subs.data);
    setPromotion(promo.data.promoted);
    setLoading(false);
  };

  return (
    <SubscriptionContext.Provider value={{ plans, mySubscriptions, promotion, subscribe, unsubscribe, loading }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
} 