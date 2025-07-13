import { Link } from "react-router-dom"
import { FiMapPin, FiEye, FiThumbsUp, FiThumbsDown, FiHeart, FiStar, FiAward, FiUsers } from 'react-icons/fi';
import { FaStar, FaRegStar, FaStarHalfAlt, FaThumbsUp, FaThumbsDown, FaHeart } from 'react-icons/fa';
import useProviderActions from "../../../Hooks/useProviderActions";
import { useAuth } from "../../../Context/AuthContext";

export default function ListElement({ provider, likes, dislikes, favourites }) {
  const {
    isFavourite,
    isLiked,
    isDisliked,
    toggleFavourite,
    like,
    dislike
  } = useProviderActions(provider.id);
  const { user } = useAuth();

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

  return (
    <li className="mb-4">
      <Link
        to={`/providers/${provider.alias}`}
        className="block group"
      >
        <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-start space-x-6">
            {/* Image Container */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={
                    provider.media.length > 0
                      ? provider.media[0].url
                      : 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                  }
                  alt={provider.business_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Badges */}
              <div className="absolute -top-2 -left-2 flex flex-col space-y-1">
                {provider.service_category && (
                  <span className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-sm">
                    {provider.service_category}
                  </span>
                )}
                {provider.is_promoted && (
                  <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-sm">
                    <FiAward className="mr-1" />
                    Promoted
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-1">
                    {provider.business_name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {provider.description || "Professional service provider with excellent reputation and quality work."}
                  </p>
                </div>
                
                {/* Rating Badge */}
                <div className="flex-shrink-0 ml-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg px-3 py-2 text-center">
                    <div className="flex items-center justify-center mb-1">
                      <FiStar className="text-blue-600 text-sm mr-1" />
                      <span className="text-lg font-bold text-blue-600">
                        {provider.final_grade ? provider.final_grade.toFixed(1) : '0.0'}
                      </span>
                    </div>
                    <div className="text-xs text-blue-700">
                      {provider.reviews_count ?? 0} reviews
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Preview */}
              {provider.services && provider.services.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Services</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {provider.services.slice(0, 4).map((service, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-gray-700 truncate flex-1">{service.description}</span>
                        <span className="font-semibold text-blue-600 ml-2">${service.price}</span>
                      </div>
                    ))}
                    {provider.services.length > 4 && (
                      <div className="text-xs text-gray-500 italic col-span-full">
                        +{provider.services.length - 4} more services
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Stats Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {/* Location */}
                  {provider.locations?.length > 0 && (
                    <div className="flex items-center">
                      <FiMapPin className="mr-1 text-gray-400" />
                      <span className="truncate max-w-32">
                        {provider.locations.slice(0, 2).join(', ')}
                        {provider.locations.length > 2 && ` +${provider.locations.length - 2}`}
                      </span>
                    </div>
                  )}
                  
                  {/* Views */}
                  <div className="flex items-center">
                    <FiEye className="mr-1 text-gray-400" />
                    <span>{provider.views_count ?? 0}</span>
                  </div>
                  
                  {/* Stars */}
                  <div className="flex items-center">
                    {renderStars(provider.final_grade)}
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center text-green-600">
                    <span className="mr-1">👍</span>
                    <span className="font-medium">{provider.likes_count ?? 0}</span>
                  </div>
                  <div className="flex items-center text-red-600">
                    <span className="mr-1">👎</span>
                    <span className="font-medium">{provider.dislikes_count ?? 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
            {user && (
              <>
                <button
                  className="p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    dislike();
                  }}
                  title="Dislike"
                >
                  {dislikes?.includes(provider.id) ? (
                    <FaThumbsDown className="text-red-500 text-sm" />
                  ) : (
                    <FiThumbsDown className="text-gray-400 hover:text-red-500 text-sm" />
                  )}
                </button>
                <button
                  className="p-2 rounded-full hover:bg-green-50 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    like();
                  }}
                  title="Like"
                >
                  {likes?.includes(provider.id) ? (
                    <FaThumbsUp className="text-green-500 text-sm" />
                  ) : (
                    <FiThumbsUp className="text-gray-400 hover:text-green-500 text-sm" />
                  )}
                </button>
              </>
            )}
            
            <button
              className="p-2 rounded-full hover:bg-yellow-50 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                toggleFavourite();
              }}
              title="Add to Favorites"
            >
              {favourites?.includes(provider.id) ? (
                <FaHeart className="text-yellow-500 text-sm" />
              ) : (
                <FiHeart className="text-gray-400 hover:text-yellow-500 text-sm" />
              )}
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
}