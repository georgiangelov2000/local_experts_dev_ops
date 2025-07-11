import { Link } from "react-router-dom";
import { FiHeart, FiThumbsUp, FiThumbsDown, FiEye, FiMapPin } from "react-icons/fi";
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import useProviderActions from "../../Hooks/useProviderActions";
import { useAuth } from "../../Context/AuthContext";

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
    like,
    dislike
  } = useProviderActions(provider.id);
  const { user } = useAuth();

  return (
    <Link
      to={`/providers/${provider.alias}`}
      className="block hover:no-underline"
    >
      <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:ring-2 hover:ring-blue-200 transition-transform transform hover:-translate-y-1 duration-300 dark:bg-gray-800 dark:border-gray-700">
        {/* Badge */}
        <div className="absolute top-0 left-2 bg-yellow-500 text-yellow-900 text-xs font-semibold px-2 py-0.5">
          Promoted
        </div>
        {/* Image */}
        <img
          className="w-full h-48 object-cover"
          src={
            provider.media.length > 0
              ? provider.media[0].url
              : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
          }
          alt={provider.business_name}
        />
        <div className="p-4 space-y-2">
          {provider.service_category && (
            <span className="inline-block text-xs font-semibold bg-blue-600 text-white rounded-full px-3 py-0.5">
              {provider.service_category}
            </span>
          )}
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {provider.business_name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {provider.description || "No description provided."}
          </p>
          {provider.services && provider.services.length > 0 && (
            <ul className="mt-2 mb-2 text-xs text-gray-700">
              {provider.services.map((service, idx) => (
                <li key={idx} className="flex justify-between border-b border-gray-100 py-1 last:border-b-0">
                  <span>{service.description}</span>
                  <span className="font-semibold text-blue-700">${service.price}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex items-center text-xs text-gray-500">
            <span className="flex items-center flex-wrap gap-1">
              {provider.locations?.length > 0 ? (
                provider.locations.map((city, idx) => (
                  <span key={idx} className="flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                    <FiMapPin className="mr-1" /> {city}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-500"></span>
              )}
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500 space-x-1">
            {(() => {
              const fullStars = Math.floor(provider.final_grade || 0);
              const halfStar = (provider.final_grade || 0) - fullStars >= 0.5;
              const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
              return (
                <>
                  {Array.from({ length: fullStars }).map((_, i) => (
                    <FaStar key={`star-filled-${i}`} className="text-yellow-400" />
                  ))}
                  {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
                  {Array.from({ length: emptyStars }).map((_, i) => (
                    <FaRegStar key={`star-empty-${i}`} className="text-yellow-400" />
                  ))}
                </>
              );
            })()}
            <span className="ml-2">({provider.reviews_count ?? 0} reviews)</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <FiEye className="mr-1" />  ({provider.views_count} Views)
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <span className="text-green-500 font-semibold mr-1">👍</span>
                <span>{provider.likes_count ?? 0}</span>
              </div>
              <div className="flex items-center">
                <span className="text-red-500 font-semibold mr-1">👎</span>
                <span>{provider.dislikes_count ?? 0}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4 pt-2 border-t border-gray-100 dark:border-gray-700 mt-2">
            {user && (
              <>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    dislike();
                  }}
                  title="Dislike"
                >
                  {dislikes?.includes(provider.id) ? (
                    <FaThumbsDown className="text-red-500" />
                  ) : (
                    <FiThumbsDown className="text-gray-500 hover:text-red-500" />
                  )}
                </button>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    like();
                  }}
                  title="Like"
                >
                  {likes?.includes(provider.id) ? (
                    <FaThumbsUp className="text-green-500" />
                  ) : (
                    <FiThumbsUp className="text-gray-500 hover:text-green-500" />
                  )}
                </button>
              </>
            )}
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                toggleFavourite();
              }}
              title="Favorite"
            >
              {favourites?.includes(provider.id) ? (
                <FaHeart className="text-yellow-500" />
              ) : (
                <FiHeart className="text-gray-500 hover:text-yellow-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
