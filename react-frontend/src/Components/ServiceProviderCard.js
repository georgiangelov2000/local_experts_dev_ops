import { Link } from "react-router-dom";
import { FiHeart, FiThumbsUp, FiThumbsDown, FiMapPin } from "react-icons/fi";

export default function ServiceProviderCard({ provider }) {
  return (
    <Link
      to={`/providers/${provider.id}`}
      className="block"
    >
      <div className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
        {/* Promoted badge */}
        <div className="absolute top-[6px] left-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded">
          Promoted
        </div>

        <img
          className="w-full h-48 object-cover"
          src={
            provider.media.length > 0
              ? provider.media[0].url
              : 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
          }
          alt={provider.business_name}
        />

        <div className="p-4">
          <div>
            {provider.service_category?.name && (
              <span className="text-sm inline-block mb-2 bg-blue-600 text-white rounded px-2 py-0.5">
                {provider.service_category.name}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {provider.business_name}
          </h3>

          {provider.location && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <FiMapPin className="mr-1 text-blue-500" />
              {provider.location}
            </div>
          )}

          <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
            {provider.description}
          </p>

          <div className="flex space-x-2">
            <button
              className="text-gray-500 hover:text-red-500 cursor-pointer transition"
              title="Dislike"
              onClick={(e) => e.preventDefault()}
            >
              <FiThumbsDown />
            </button>
            <button
              className="text-gray-500 hover:text-green-500 cursor-pointer transition"
              title="Like"
              onClick={(e) => e.preventDefault()}
            >
              <FiThumbsUp />
            </button>
            <button
              className="text-gray-500 hover:text-pink-500 cursor-pointer transition"
              title="Favorite"
              onClick={(e) => e.preventDefault()}
            >
              <FiHeart />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
