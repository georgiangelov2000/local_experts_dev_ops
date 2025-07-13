import RelatedProviders from './RelatedProviders';
import RelatedProvidersSkeleton from './RelatedProvidersSkeleton';
import { FiUsers } from 'react-icons/fi';

export default function RelatedProvidersSection({ providers, count, loading = false }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
            <FiUsers className="text-blue-600 text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Related Providers
            </h3>
            {!loading && count > 0 && (
              <p className="text-sm text-gray-500">
                {count} similar service provider{count !== 1 ? 's' : ''} in your area
              </p>
            )}
          </div>
        </div>
        
        {!loading && count > 0 && (
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {count} found
            </span>
          </div>
        )}
      </div>

      {/* Providers Grid */}
      {loading ? (
        <RelatedProvidersSkeleton />
      ) : (
        <RelatedProviders providers={providers} />
      )}
    </div>
  );
} 