import { Link } from 'react-router-dom';
import { FiMapPin, FiEye, FiThumbsUp, FiThumbsDown, FiHeart } from 'react-icons/fi';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

export default function List({ providers, filters, pagination, onPageChange }) {
  const totalPages = Math.ceil(pagination.total / pagination.per_page);
  console.log(filters);
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Search Results</h2>
      <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 space-x-2">
        {filters.term && (
          <span className="inline-flex items-center bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
            Term: <span className="ml-1 font-medium">{filters.term}</span>
          </span>
        )}
        {filters.category_name && (
          <span className="inline-flex items-center bg-green-50 text-green-700 px-2 py-0.5 rounded">
            Category: <span className="ml-1 font-medium">{filters.category_name}</span>
          </span>
        )}
        {filters.service_category_name && (
          <span className="inline-flex items-center bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
            Service: <span className="ml-1 font-medium">{filters.service_category_name}</span>
          </span>
        )}
      </div>

      {providers.length === 0 ? (
        <div className="text-gray-600 text-center p-6 bg-gray-50 rounded-lg">
          No providers found matching your criteria.
        </div>
      ) : (
        <>
          <ul className="list-none pl-0">
            {providers.map((provider, index) => (
              <li key={provider.id} className="relative">
                <Link
                  to={`/providers/${provider.alias}`}
                  className="flex items-start bg-gray-100 transition group mb-2 rounded-lg"
                >
                  {/* Promoted badge */}
                  <div className="absolute top-0 left-2 bg-yellow-500 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded">
                    Promoted
                  </div>

                  {/* Image */}
                  <div className="mr-2 flex-shrink-0" style={{ maxWidth: '200px' }}>
                    <img
                      src={
                        provider.media.length > 0
                          ? provider.media[0].url
                          : 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
                      }
                      alt={provider.business_name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-between p-4 flex-1">
                    <div>
                      <h3 className="text-lg font-bold text-blue-600 group-hover:underline mb-1">
                        {provider.business_name}
                      </h3>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                        {provider.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-2 text-xs text-gray-600">
                        {provider.locations?.map((loc, idx) => (
                          <span
                            key={idx}
                            className="flex items-center bg-gray-100 rounded-full"
                          >
                            <FiMapPin className="mr-1" /> {loc}
                          </span>
                        ))}
                        <span className="flex items-center bg-gray-100 rounded-full">
                          <FiEye className="mr-1" /> {provider.views ?? 0} views
                        </span>
                        <span className="flex items-center bg-gray-100 rounded-full">
                          👍 {provider.likes_count ?? 0}
                        </span>
                        <span className="flex items-center bg-gray-100 rounded-full">
                          👎 {provider.dislikes_count ?? 0}
                        </span>
                      </div>

                      <div className="flex items-center text-xs text-gray-500">
                        <div className="flex items-center">
                          {(() => {
                            const fullStars = Math.floor(provider.final_grade || 0);
                            const halfStar = (provider.final_grade || 0) - fullStars >= 0.5;
                            const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
                            return (
                              <>
                                {Array.from({ length: fullStars }).map((_, i) => (
                                  <FaStar key={`star-filled-${i}`} className="text-yellow-400 w-4 h-4" />
                                ))}
                                {halfStar && <FaStarHalfAlt className="text-yellow-400 w-4 h-4" />}
                                {Array.from({ length: emptyStars }).map((_, i) => (
                                  <FaRegStar key={`star-empty-${i}`} className="text-yellow-400 w-4 h-4" />
                                ))}
                              </>
                            );
                          })()}
                        </div>
                        <span className="ml-2">({provider.reviews_count ?? 0} reviews)</span>
                      </div>
                    </div>


                    {/* Actions */}
                    <div className="flex space-x-2 mt-2">
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
                </Link>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <nav aria-label="Page navigation example" className="mt-4">
            <ul className="inline-flex -space-x-px text-base h-10">
              <li>
                <button
                  onClick={() => pagination.current_page > 1 && onPageChange(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                  className={`flex items-center justify-center px-4 h-10 bg-gray-200 text-gray-400 ${pagination.current_page === 1
                    ? 'cursor-not-allowed'
                    : 'hover:text-white transition'
                    }`}
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page}>
                  <button
                    onClick={() => onPageChange(page)}
                    className={`flex items-center justify-center px-4 h-10 ml-1 mr-1 ${pagination.current_page === page
                      ? 'bg-gray-200 text-gray-400'
                      : 'bg-gray-200 hover:text-white transition'
                      }`}
                  >
                    {page}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={() => pagination.current_page < totalPages && onPageChange(pagination.current_page + 1)}
                  disabled={pagination.current_page === totalPages}
                  className={`flex items-center justify-center px-4 h-10 ${pagination.current_page === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:text-white transition'
                    }`}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>


        </>
      )}
    </div>
  );
}
