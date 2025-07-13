export default function ServiceProviderCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gray-200">
        {/* Badge Skeletons */}
        <div className="absolute top-3 left-3 space-y-2">
          <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* Rating Badge Skeleton */}
        <div className="absolute top-3 right-3">
          <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-5 space-y-4">
        {/* Business Name */}
        <div className="w-3/4 h-5 bg-gray-200 rounded"></div>

        {/* Description */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-200 rounded"></div>
          <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
        </div>

        {/* Services Preview */}
        <div className="space-y-2">
          <div className="w-16 h-3 bg-gray-200 rounded"></div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
              <div className="w-12 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
              <div className="w-10 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-200 rounded mr-2"></div>
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-3 h-3 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="w-8 h-3 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-200 rounded mr-1"></div>
            <div className="w-6 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-200 rounded mr-1"></div>
              <div className="w-4 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-200 rounded mr-1"></div>
              <div className="w-4 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
} 