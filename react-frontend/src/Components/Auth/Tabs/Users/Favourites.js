import ServiceProviderCard from '../../../Home/ServiceProviderCard';
import { useFavourites } from '../../../../Models/User/useFavourites';
import { useTranslation } from 'react-i18next';

export default function Favourites({ user, data }) {
  const { favouriteProviders, loading, removeFavourite } = useFavourites(user, data);
  const { t } = useTranslation();

  if (loading) return <div className="text-center text-blue-600">{t('loading')}</div>;
  if (!favouriteProviders.length) return <div className="text-center text-gray-500">{t('no_favourites')}</div>;

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{t('favourites')}</h2>
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
    </>
  );
} 