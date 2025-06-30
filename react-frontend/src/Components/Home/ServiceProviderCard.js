import { Link } from "react-router-dom";
import { FiHeart, FiThumbsUp, FiThumbsDown, FiEye, FiMapPin } from "react-icons/fi";

export default function ServiceProviderCard({ provider }) {
  return (
    <Link
      to={`/providers/${provider.id}`}
      className="block hover:no-underline"
    >
      <div className="relative bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg hover:ring-2 hover:ring-blue-100 transition-transform transform hover:-translate-y-1 duration-200 dark:bg-gray-800 dark:border-gray-700">
        {/* Badge */}
        <div className="bg-yellow-400 text-yellow-900 absolute top-0 left-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-900 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow">
          Promoted
        </div>

        <img
          className="w-full h-44 object-cover"
          src={
            provider.media.length > 0
              ? provider.media[0].url
              : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
          }
          alt={provider.business_name}
        />

        <div className="p-4">
          {provider.service_category?.name && (
            <span className="inline-block text-xs font-medium bg-blue-600 text-white rounded-full px-3 py-0.5 mb-2">
              {provider.service_category.name}
            </span>
          )}

          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
            {provider.business_name}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
            {provider.description || "No description provided."}
          </p>

          <div className="flex items-center text-xs text-gray-500 mb-1">
            <FiMapPin className="mr-1" />
            {provider.location ?? "Plovdiv"}
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
            <div>Price: <span className="font-semibold">{provider.price ?? 10} BGN</span></div>
            <div className="flex items-center">
              <FiEye className="mr-1" /> {provider.views ?? 100}
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-500 mb-3">
            <div>Reviews: <span className="font-semibold">{provider.reviews_count ?? 12}</span></div>
          </div>

          <div className="flex space-x-3">
            <button
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              onClick={(e) => e.preventDefault()}
              title="Dislike"
            >
              <FiThumbsDown className="text-gray-500 hover:text-red-500" />
            </button>
            <button
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              onClick={(e) => e.preventDefault()}
              title="Like"
            >
              <FiThumbsUp className="text-gray-500 hover:text-green-500" />
            </button>
            <button
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              onClick={(e) => e.preventDefault()}
              title="Favorite"
            >
              <FiHeart className="text-gray-500 hover:text-pink-500" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
