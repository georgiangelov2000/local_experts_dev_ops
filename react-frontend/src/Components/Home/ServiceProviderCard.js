import { Link } from "react-router-dom";
import { FiHeart, FiThumbsUp, FiThumbsDown, FiEye, FiMapPin, FiStar, FiClock, FiAward } from "react-icons/fi";
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaThumbsUp, FaThumbsDown, FaRegHeart } from 'react-icons/fa';
import useProviderActions from "../../Hooks/useProviderActions";
import { useAuth } from "../../Context/AuthContext";
import { useTranslation } from 'react-i18next';

export default function ServiceProviderCard({
  provider,
  likes,
  dislikes,
  favourites,
}) {
  const {
    isFavourite,
    isLiked,
    isDisliked,
    toggleFavourite,
    toggleLike,
    toggleDislike,
    loading,
    error
  } = useProviderActions(provider.id);
  const { user } = useAuth();
  const { t } = useTranslation();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    const halfStar = (rating || 0) - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <FaStar key={`star-filled-${i}`} className="text-yellow-400 text-sm" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-400 text-sm" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <FaRegStar key={`star-empty-${i}`} className="text-yellow-400 text-sm" />
        ))}
      </div>
    );
  };

  const isFavourited = favourites && favourites.includes(provider.id);

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
      <Link
        to={`/providers/${provider.alias}`}
        className="block hover:no-underline"
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={
              Array.isArray(provider.media) && provider.media.length > 0
                ? provider.media[0].url
                : "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            }
            alt={provider.business_name}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Top Badges */}
          <div className="absolute top-3 left-5 flex flex-col space-y-2">
            {provider.service_category && (
              <span className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-sm">
                {provider.service_category}
              </span>
            )}
            {provider.is_promoted && (
              <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-sm">
                <FiAward className="mr-1" />
                Promoted
              </span>
            )}
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-6 bg-blue-600 rounded-full">
            <div className="backdrop-blur-sm rounded-full px-3 py-1 flex items-center shadow-sm">
              <FiStar className="text-yellow-400 text-sm mr-1" />
              <span className="text-sm font-semibold text-white">
                {provider.final_grade ? provider.final_grade.toFixed(1) : '0.0'}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Business Name */}
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
            {provider.business_name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {provider.description || t('find_service_providers')}
          </p>

          {/* Services Preview */}
          {Array.isArray(provider.services) && provider.services.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{t('service_type')}</h4>
              <div className="space-y-1">
                {provider.services.slice(0, 2).map((service, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 truncate flex-1">{service.description}</span>
                    <span className="font-semibold text-blue-600 ml-2">${service.price}</span>
                  </div>
                ))}
                {provider.services.length > 2 && (
                  <div className="text-xs text-gray-500 italic">
                    +{provider.services.length - 2} {t('service_type').toLowerCase()}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Location */}
          {Array.isArray(provider.locations) && provider.locations.length > 0 && (
            <div className="flex items-center text-xs text-gray-500">
              <FiMapPin className="mr-1 text-gray-400" />
              <span className="truncate">
                {provider.locations.slice(0, 2).join(', ')}
                {provider.locations.length > 2 && ` +${provider.locations.length - 2} ${t('location').toLowerCase()}`}
              </span>
            </div>
          )}

          {/* Stats Row */}
          <div className="flex flex-wrap items-center justify-between pt-3 border-t border-gray-100 mb-2">
            {/* Rating & Reviews */}
            <div className="flex items-center space-x-2 mb-2">
              {renderStars(provider.final_grade)}
              <span className="text-xs text-gray-500">
                ({provider.reviews_count ?? 0} {t('reviews')})
              </span>
            </div>

            {/* Views */}
            <div className="flex items-center text-xs text-gray-500">
              <FiEye className="mr-1" />
              {provider.views_count ?? 0} {t('views')}
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-gray-500">
                {/* <span className="mr-1">👍</span> */}
                <span className="font-medium">{provider.likes_count ?? 0} {t('likes')}</span>
              </div>
              <div className="flex items-center text-gray-500">
                {/* <span className="mr-1">👎</span> */}
                <span className="font-medium">{provider.dislikes_count ?? 0} {t('dislikes')}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            {user && (
              <>
                <button
                  className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-300"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDislike();
                  }}
                  title="Dislike"
                >
                  {isDisliked ? (
                    <FaThumbsDown className="text-red-500 text-sm" />
                  ) : (
                    <FiThumbsDown className="text-gray-400 hover:text-red-500 text-sm" />
                  )}
                </button>
                <button
                  className="p-2 rounded-full hover:bg-green-100 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-300"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleLike();
                  }}
                  title="Like"
                >
                  {isLiked ? (
                    <FaThumbsUp className="text-green-500 text-sm" />
                  ) : (
                    <FiThumbsUp className="text-gray-400 hover:text-green-500 text-sm" />
                  )}
                </button>
              </>
            )}
          </div>
          
          <button
            aria-label={isFavourite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={toggleFavourite}
            className={`p-2 rounded-full hover:bg-yellow-100 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-300 ${isFavourite ? 'bg-yellow-100' : ''}`}
            title={isFavourite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavourite ? (
              <FaHeart className="text-yellow-500 text-sm" />
            ) : (
              <FiHeart className="text-gray-400 hover:text-yellow-500 text-sm" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
