import { Link } from "react-router-dom";


export default function ServiceProviderCard({ provider }) {
    return (
      <div className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <img className="w-full h-48 object-cover"
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
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
            {provider.business_name}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
            {provider.description}
          </p>
            <Link
            to={`/providers/${provider.id}`}
            className="inline-flex items-center text-sm text-blue-600 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    );
  }
  