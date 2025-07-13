import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiMessageSquare, FiUser, FiCalendar, FiSend } from 'react-icons/fi';
import apiService from '../../Services/apiService';
import { useReviewForm } from '../../Models/useReviewForm';
import { useAuth } from '../../Context/AuthContext';
import Pagination from '../Home/List/Pagination';
import ReviewsSkeleton from './ReviewsSkeleton';

export default function Reviews({ reviews = [], serviceProviderId, onReviewAdded, pagination, onPageChange, reviewsLoading, reviewsError }) {
  const { user } = useAuth();
  const { register, handleSubmit, errors, reset } = useReviewForm(user, serviceProviderId);

  const submitHandler = async (data) => {
    const payload = {
      ...data,
      consumer_id: user ? user.id : null,
      service_provider_id: serviceProviderId,
    };

    try {
      const response = await apiService.reviews(payload);
      if (onReviewAdded) {
        onReviewAdded(response.data);
      }
      reset();
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };

  // Loading state
  if (reviewsLoading) {
    return (
      <div className="space-y-8">
        <ReviewsSkeleton />
        
        {/* Add Review Form - Show even during loading */}
        {user && (
          <div className="border-t border-gray-100 pt-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <FiMessageSquare className="text-white text-sm" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Share Your Experience</h4>
              </div>
              
              <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                {/* Rating Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Rating
                  </label>
                  <select
                    {...register("rating")}
                    className="w-full max-w-xs border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select rating</option>
                    {[5, 4, 3, 2, 1].map((val) => (
                      <option key={val} value={val}>
                        {val} Star{val !== 1 ? 's' : ''} - {val === 5 ? 'Excellent' : val === 4 ? 'Good' : val === 3 ? 'Average' : val === 2 ? 'Poor' : 'Very Poor'}
                      </option>
                    ))}
                  </select>
                  {errors.rating && (
                    <p className="text-xs text-red-500 mt-1">{errors.rating.message}</p>
                  )}
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    {...register("review_text")}
                    placeholder="Tell us about your experience with this service provider..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    rows="4"
                  />
                  {errors.review_text && (
                    <p className="text-xs text-red-500 mt-1">{errors.review_text.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <FiSend className="mr-2 text-sm" />
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Error state
  if (reviewsError) {
    return (
      <div className="space-y-8">
        <div className="text-center py-8">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg">
            <span className="text-sm">{reviewsError}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => {
            const ratingValue = Math.min(Number(review.rating) || 0, 5);
            const reviewDate = review.created_at ? new Date(review.created_at) : null;

            return (
              <div
                key={idx}
                className="group bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <FiUser className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {review.consumer_email ? review.consumer_email.split('@')[0] : 'Anonymous User'}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          {Array.from({ length: ratingValue }).map((_, i) => (
                            <FaStar key={`filled-${i}`} className="text-yellow-400 text-sm" />
                          ))}
                          {Array.from({ length: 5 - ratingValue }).map((_, i) => (
                            <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-sm" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {ratingValue}.0 out of 5
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {reviewDate && (
                    <div className="flex items-center text-xs text-gray-400">
                      <FiCalendar className="mr-1" />
                      {reviewDate.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  )}
                </div>

                {/* Review Content */}
                <div className="relative">
                  <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <blockquote className="text-gray-700 leading-relaxed pl-4">
                    "{review.review_text}"
                  </blockquote>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-xl p-8">
              <FiMessageSquare className="mx-auto text-gray-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-500">Be the first to share your experience with this service provider!</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {pagination && pagination.last_page > 1 && (
        <div className="border-t border-gray-100 pt-6">
          <Pagination
            pagination={pagination}
            onPageChange={onPageChange}
          />
        </div>
      )}

      {/* Add Review Form */}
      {user ? (
        <div className="border-t border-gray-100 pt-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <FiMessageSquare className="text-white text-sm" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Share Your Experience</h4>
            </div>
            
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              {/* Rating Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                <select
                  {...register("rating")}
                  className="w-full max-w-xs border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select rating</option>
                  {[5, 4, 3, 2, 1].map((val) => (
                    <option key={val} value={val}>
                      {val} Star{val !== 1 ? 's' : ''} - {val === 5 ? 'Excellent' : val === 4 ? 'Good' : val === 3 ? 'Average' : val === 2 ? 'Poor' : 'Very Poor'}
                    </option>
                  ))}
                </select>
                {errors.rating && (
                  <p className="text-xs text-red-500 mt-1">{errors.rating.message}</p>
                )}
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  {...register("review_text")}
                  placeholder="Tell us about your experience with this service provider..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  rows="4"
                />
                {errors.review_text && (
                  <p className="text-xs text-red-500 mt-1">{errors.review_text.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <FiSend className="mr-2 text-sm" />
                Submit Review
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-100 pt-8">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 text-center">
            <FiMessageSquare className="mx-auto text-gray-400 text-3xl mb-3" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Want to share your experience?</h4>
            <p className="text-gray-600 mb-4">Please log in to add a review and help others make informed decisions.</p>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Log In to Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
