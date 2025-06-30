import { Link } from "react-router-dom";

export default function RelatedProviders({ providers = [] }) {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {providers.length === 0 && (
          <p className="text-sm text-gray-500">No related providers found.</p>
        )}
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-lg shadow p-3 hover:shadow-md transition"
          >
            <img
              src={
                provider.media?.length > 0
                  ? provider.media[0].url
                  : "https://media.istockphoto.com/id/1444666625/photo/online-advertising-concept-ad-on-internet.jpg?s=612x612&w=0&k=20&c=Lp2QzOAMWOt4QaJRyk5aBUIkw6EgnsjcvDuDIktJ8yY="
              }
              alt={provider.business_name}
              className="w-full h-24 object-cover rounded mb-2 object-contain"
            />
            <h4 className="text-sm font-semibold">{provider.business_name}</h4>
            <p className="text-xs text-gray-600 mb-1">
              {provider.description || "No description available."}
            </p>
            <p className="text-xs text-gray-500 mb-1">
              <strong>Category:</strong>{" "}
              {provider.service_category?.name || "N/A"}
            </p>
            <p className="text-xs text-gray-500 mb-1">
              <strong>Service:</strong>{" "}
              {provider.service_category?.description || "N/A"}
            </p>
            <p className="text-xs text-gray-500 mb-2">
              <strong>Email:</strong> {provider.user?.email || "N/A"}
            </p>
            <Link
              to={`/providers/${provider.id}`}
              className="text-blue-600 text-xs hover:underline cursor-pointer"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
