import ServiceProviderCard from '../../../Home/ServiceProviderCard';
import { useFavourites } from '../../../../Models/User/useFavourites';

export default function Favourites({ user }) {
  const { favouriteProviders, loading, removeFavourite } = useFavourites(user);

  if (loading) return <div className="text-center text-blue-600">Loading...</div>;
  if (!favouriteProviders.length) return <div className="text-center text-gray-500">You have no favourites yet.</div>;

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {favouriteProviders.map(provider => (
        <ServiceProviderCard
          key={provider.id}
          provider={provider}
          showRemoveFavouriteButton
          onRemoveFavourite={() => removeFavourite(provider.id)}
        />
      ))}
    </div>
  );
} 