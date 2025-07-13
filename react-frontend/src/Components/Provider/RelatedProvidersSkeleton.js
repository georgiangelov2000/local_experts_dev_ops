export default function RelatedProvidersSkeleton() {
  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
          >
            {/* Image Skeleton */}
            <div className="relative h-48 bg-gray-200">
              {/* Category Badge Skeleton - Left side */}
              <div className="absolute top-3 left-3">
                <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
              </div>
              {/* Rating Badge Skeleton - Right side */}
              <div className="absolute top-3 right-5">
                <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              
              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="flex space-x-1">
                  <div className="w-12 h-5 bg-gray-200 rounded-full"></div>
                  <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex space-x-4">
                  <div className="w-8 h-3 bg-gray-200 rounded"></div>
                  <div className="w-8 h-3 bg-gray-200 rounded"></div>
                  <div className="w-8 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="w-12 h-3 bg-gray-200 rounded"></div>
              </div>

              {/* Button */}
              <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 