import { Link } from 'react-router-dom';
import { FiMapPin, FiEye, FiStar, FiThumbsUp, FiThumbsDown, FiHeart } from 'react-icons/fi';

export default function List({ providers, pagination, onPageChange }) {
  console.log(pagination);
  const totalPages = Math.ceil(pagination.total / pagination.per_page);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>

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
                  to={`/providers/${provider.id}`}
                  className="flex items-start bg-gray-100 transition group mb-2 rounded-lg"
                >
                  {/* Promoted badge */}
                  <div className="absolute top-0 left-2 bg-yellow-100 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded">
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
                      <h3 className="text-lg font-bold text-blue-600 group-hover:underline">
                        {provider.business_name}
                      </h3>
                      <p className="text-sm text-gray-700">{provider.description}</p>

                      <div className="flex flex-wrap text-xs text-gray-600 mt-1 space-x-2">
                        <span className="flex items-center">
                          <FiMapPin className="mr-1" /> {provider.location || 'Unknown'}
                        </span>
                        <span className="flex items-center">
                          <FiEye className="mr-1" /> {provider.views || 123} views
                        </span>
                        <span className="flex items-center">
                          <FiStar className="mr-1 text-yellow-400" /> {provider.reviews || 5} reviews
                        </span>
                        <span className="font-bold text-gray-800">
                          {provider.price ? `${provider.price} BGN` : '10 BGN'}
                        </span>
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
                  className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight bg-white border border-e-0 border-gray-300 rounded-s-lg ${pagination.current_page === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer'
                    }`}
                  disabled={pagination.current_page === 1}
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page}>
                  <button
                    onClick={() => onPageChange(page)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${pagination.current_page === page
                        ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 cursor-default'
                        : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 cursor-pointer'
                      }`}
                  >
                    {page}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={() => pagination.current_page < totalPages && onPageChange(pagination.current_page + 1)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight bg-white border border-gray-300 rounded-e-lg ${pagination.current_page === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer'
                    }`}
                  disabled={pagination.current_page === totalPages}
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
