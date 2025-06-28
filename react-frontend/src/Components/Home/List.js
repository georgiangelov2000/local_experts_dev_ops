import { Link } from 'react-router-dom';
import { FiMapPin, FiHeart, FiThumbsUp, FiThumbsDown, FiEye, FiStar } from 'react-icons/fi';

export default function List({ providers }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>

      <ul className="list-none pl-0">
        {providers.map((provider, index) => (
          <li key={provider.id} className={`relative ${index === 0 ? '' : 'border-t-0 border-l-0 border-r-0'}`}>
            <Link
              to={`/providers/${provider.id}`}
              className="pb-2 flex items-start bg-gray-100 transition group rounded-lg"
            >
              {/* Promoted badge */}
              <div className="absolute top-0 left-2 bg-yellow-100 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded">
                Promoted
              </div>

              {/* Image */}
              <div className="mr-2 p-4">
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
    </div>
  );
}
