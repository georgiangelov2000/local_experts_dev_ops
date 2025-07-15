import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiEye, FiThumbsUp, FiThumbsDown, FiMapPin, FiArrowRight } from "react-icons/fi";
import { useTranslation } from 'react-i18next';

export default function RelatedProviders({ providers = [] }) {
  const { t } = useTranslation();
  if (providers.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="bg-gray-50 rounded-lg p-8">
          <FiMapPin className="mx-auto text-gray-400 text-3xl mb-3" />
          <p className="text-gray-500 font-medium">{t('noRelatedProvidersFound')}</p>
          <p className="text-sm text-gray-400 mt-1">{t('similarServiceProviders')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:p-0 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {providers.map((provider) => {
          const rating = Math.round(provider.final_grade || 0);
          const hasImage = provider.media?.length > 0;
          
          return (
            <div
              key={provider.id}
              className="group bg-white lg:rounded-xl lg:shadow-sm lg:border lg:border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={
                    hasImage
                      ? provider.media[0].url
                      : "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  }
                  alt={provider.business_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-5">
                  <span className="inline-block text-xs font-semibold bg-blue-600 text-white rounded-full px-3 py-1 shadow-sm">
                    {provider.service_category}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-5 bg-blue-600 rounded-full">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                    <FaStar className="text-yellow-400 text-xs mr-1" />
                    <span className="text-xs font-semibold text-white">{rating}.0</span>
                  </div>
                </div>

                {/* Hover Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3">
                    <Link
                      to={`/providers/${provider.alias}`}
                      className="inline-flex items-center text-white text-sm font-medium hover:text-blue-200 transition-colors"
                    >
                      View Profile
                      <FiArrowRight className="ml-1 text-xs" />
                    </Link>
                  </div>
                </div> */}
              </div>

              {/* Content Section */}
              <div className="p-4">
                {/* Provider Name */}
                <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {provider.business_name}
                </h4>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                  {provider.description || "Professional service provider with excellent track record."}
                </p>

                {/* Locations */}
                {provider.locations?.length > 0 && (
                  <div className="flex items-center mb-3">
                    <FiMapPin className="text-gray-400 text-sm mr-2" />
                    <div className="flex flex-wrap gap-1">
                      {provider.locations.slice(0, 2).map((city, idx) => (
                        <span 
                          key={idx} 
                          className="inline-flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                          {city}
                        </span>
                      ))}
                      {provider.locations.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{provider.locations.length - 2} {t('location').toLowerCase()}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Stats Row */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <FiEye className="mr-1" />
                      <span>{provider.views_count || 0} {t('views')}</span>
                    </div>
                    <div className="flex items-center">
                      <FiThumbsUp className="mr-1 text-green-500" />
                      <span>{provider.likes_count || 0} {t('likes')}</span>
                    </div>
                    <div className="flex items-center">
                      <FiThumbsDown className="mr-1 text-red-500" />
                      <span>{provider.dislikes_count || 0} {t('dislikes')}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    {provider.reviews_count || 0} {t('reviews')}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  <Link
                    to={`/providers/${provider.alias}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    View Profile
                    <FiArrowRight className="ml-2 text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
