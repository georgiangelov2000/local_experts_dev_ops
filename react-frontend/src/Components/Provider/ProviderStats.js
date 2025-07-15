import { FaStar, FaRegStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function ProviderStats({ provider }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-4 text-sm text-gray-700 mt-2">
      <div className="flex items-center">
        {/* <span className="text-green-500 font-semibold mr-1">👍</span> */}
        {provider.likes_count ?? 0} {t('likes')}
      </div>
      <div className="flex items-center">
        {/* <span className="text-red-500 font-semibold mr-1">👎</span> */}
        {provider.dislikes_count ?? 0} {t('dislikes')}
      </div>
      <div className="flex items-center">
        {/* <span className="text-blue-500 font-semibold mr-1">👁</span> */}
        {provider.views_count ?? 0} {t('views')}
      </div>
    </div>
  );
} 