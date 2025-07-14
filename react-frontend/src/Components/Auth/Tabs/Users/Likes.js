import ServiceProviderCard from '../../../Home/ServiceProviderCard';
import { useLikes } from '../../../../Models/User/useLikes';

export default function Likes({ user, data }) {
  const { likedProviders, loading, removeLike } = useLikes(user, data);

  if (loading) return <div className="text-center text-blue-600">Loading...</div>;
  if (!likedProviders.length) return <div className="text-center text-gray-500">You have no liked providers yet.</div>;

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {likedProviders.map(provider => (
        <ServiceProviderCard
          key={provider.id}
          provider={provider}
          showDislikeButton
          onDislike={() => removeLike(provider.id)}
        />
      ))}
    </div>
  );
} 