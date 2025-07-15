import ServiceProviderCard from '../../../Home/ServiceProviderCard';
import { useLikes } from '../../../../Models/User/useLikes';
import { useTranslation } from 'react-i18next';

export default function Likes({ user, data }) {
  const { likedProviders, loading, removeLike } = useLikes(user, data);
  const { t } = useTranslation();

  if (loading) return <div className="text-center text-blue-600">{t('loading')}</div>;
  if (!likedProviders.length) return <div className="text-center text-gray-500">{t('no_liked_providers')}</div>;

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{t('your_liked_providers')}</h2>
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
    </>
  );
} 