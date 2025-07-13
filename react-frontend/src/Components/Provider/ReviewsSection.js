import Reviews from './Reviews';
import { FiMessageSquare } from 'react-icons/fi';

export default function ReviewsSection({ 
  reviews, 
  pagination, 
  onPageChange, 
  serviceProviderId, 
  reviewsLoading, 
  reviewsError, 
  onReviewAdded,
  reviewsCount = 0 
}) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
          <FiMessageSquare className="text-orange-600 text-lg" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Customer Reviews
          </h3>
          {reviewsCount > 0 && (
            <p className="text-sm text-gray-500">
              {reviewsCount} review{reviewsCount !== 1 ? 's' : ''} from verified customers
            </p>
          )}
        </div>
        
        {reviewsCount > 0 && (
          <div className="flex items-center space-x-2 ml-auto">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              {reviewsCount} reviews
            </span>
          </div>
        )}
      </div>

      {/* Reviews Content */}
      <Reviews
        reviews={reviews}
        pagination={pagination}
        onPageChange={onPageChange}
        serviceProviderId={serviceProviderId}
        reviewsLoading={reviewsLoading}
        reviewsError={reviewsError}
        onReviewAdded={onReviewAdded}
      />
    </div>
  );
} 