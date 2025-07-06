import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiEye, FiThumbsUp, FiThumbsDown } from "react-icons/fi";

export default function RelatedProviders({ providers = [] }) {
  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {providers.length === 0 && (
          <p className="text-sm text-gray-500">No related providers found.</p>
        )}

        {providers.map((provider) => {
          const rating = Math.round(provider.final_grade || 0);
          return (
            <div
              key={provider.id}
              className="bg-white rounded-lg shadow border border-gray-100 hover:shadow-md transition p-3 flex flex-col"
            >
              <img
                src={
                  provider.media?.length > 0
                    ? provider.media[0].url
                    : "https://media.istockphoto.com/id/1444666625/photo/online-advertising-concept-ad-on-internet.jpg?s=612x612&w=0&k=20&c=Lp2QzOAMWOt4QaJRyk5aBUIkw6EgnsjcvDuDIktJ8yY="
                }
                alt={provider.business_name}
                className="w-full h-28 object-cover rounded mb-2"
              />

              <h4 className="text-sm font-semibold text-gray-800">{provider.business_name}</h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {provider.description || "No description available."}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                <strong>Category:</strong>{" "}
                {provider.service_category?.name || "N/A"}
              </p>

              <p className="text-xs text-gray-500">
                <strong>Email:</strong> {provider.user?.email || "N/A"}
              </p>

              {/* Rating stars */}
              <div className="flex items-center mt-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <FaStar key={`star-filled-${i}`} className="text-yellow-400 text-xs mr-0.5" />
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <FaRegStar key={`star-empty-${i}`} className="text-yellow-400 text-xs mr-0.5" />
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({provider.reviews_count ?? 0})
                </span>
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
                <div className="flex items-center">
                  <FiThumbsUp className="text-green-500 mr-1" />
                  {provider.likes_count ?? 0}
                </div>
                <div className="flex items-center">
                  <FiThumbsDown className="text-red-500 mr-1" />
                  {provider.dislikes_count ?? 0}
                </div>
                <div className="flex items-center">
                  <FiEye className="mr-1" />
                  {provider.views ?? 0}
                </div>
              </div>

              {/* Link */}
              <Link
                to={`/providers/${provider.alias}`}
                className="mt-2 text-blue-600 text-xs hover:underline"
              >
                View Profile
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
