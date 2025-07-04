import { Link } from "react-router-dom";
import { FiHeart, FiThumbsUp, FiThumbsDown, FiEye, FiMapPin } from "react-icons/fi";
import useProviderActions from "../../Hooks/useProviderActions";

export default function ServiceProviderCard({ provider }) {
  const {
    isFavourite,
    isLiked,
    isDisliked,
    toggleFavourite,
    like,
    dislike
  } = useProviderActions(provider.id);


  return (
    <Link
      to={`/providers/${provider.id}`}
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
          {provider.service_category?.name && (
            <span className="inline-block text-xs font-semibold bg-blue-600 text-white rounded-full px-3 py-0.5">
              {provider.service_category.name}
            </span>
          )}

          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {provider.business_name}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {provider.description || "No description provided."}
          </p>

          <div className="flex items-center text-xs text-gray-500">
            <FiMapPin className="mr-1" />
            {provider.location ?? "Plovdiv"}
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <div>
              <span className="font-semibold">{provider.price ?? 10} BGN</span>
            </div>
            <div className="flex items-center">
              <FiEye className="mr-1" /> {provider.views ?? 100}
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <FiThumbsUp className="mr-1 text-green-500" />
                <span>{provider.likes_count ?? 0}</span>
              </div>
              <div className="flex items-center">
                <FiThumbsDown className="mr-1 text-red-500" />
                <span>{provider.dislikes_count ?? 0}</span>
              </div>
            </div>
            <div>Reviews: <span className="font-semibold">{provider.reviews_count ?? 12}</span></div>
          </div>

          <div className="flex justify-center space-x-4 pt-2 border-t border-gray-100 dark:border-gray-700 mt-2">
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              onClick={(e) => {
                e.preventDefault();
                dislike();
              }}
              title="Dislike"
            >
              <FiThumbsDown className={isDisliked ? "text-red-500" : "text-gray-500 hover:text-red-500"} />
            </button>

            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              onClick={(e) => {
                e.preventDefault();
                like();
              }}
              title="Like"
            >
              <FiThumbsUp className={isLiked ? "text-green-500" : "text-gray-500 hover:text-green-500"} />
            </button>

            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              onClick={(e) => {
                e.preventDefault();
                toggleFavourite();
              }}
              title="Favorite"
            >
              <FiHeart className={isFavourite ? "text-yellow-500" : "text-gray-500 hover:text-yellow-500"} />
            </button>
          </div>
        </div>
      </div>

    </Link>
  );
}
