import { FaStar, FaRegStar } from 'react-icons/fa';
import apiService from '../../Services/apiService';
import { useReviewForm } from '../../Models/useReviewForm';
import { useAuth } from '../../Context/AuthContext';

export default function Reviews({ reviews = [], serviceProviderId, onReviewAdded }) {
  const { user } = useAuth();
  const { register, handleSubmit, errors, reset } = useReviewForm(user, serviceProviderId);

  const submitHandler = async (data) => {
    console.log(1);
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
      // Може да добавиш toast или друго известие
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => {
            const ratingValue = Math.min(Number(review.rating) || 0, 5);

            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: ratingValue }).map((_, i) => (
                      <FaStar key={`filled-${i}`} className="text-yellow-400" />
                    ))}
                    {Array.from({ length: 5 - ratingValue }).map((_, i) => (
                      <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">
                    {review.created_at ? new Date(review.created_at).toLocaleDateString() : ""}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "{review.review_text}"
                </p>
                {review.consumer_email && (
                  <p className="text-xs text-gray-500 mt-1">By {review.consumer_email}</p>
                )}
              </div>
            );
          })

        ) : (
          <div className="text-sm text-gray-500">No reviews yet.</div>
        )}
      </div>

      {user ? (
        <form onSubmit={handleSubmit(submitHandler)} className="border-t border-gray-100 pt-4 space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Add a review</h4>
          <textarea
            {...register("review_text")}
            placeholder="Write your comment..."
            className="w-full border border-gray-300 rounded p-2 text-sm"
            rows="3"
          />
          {errors.review_text && (
            <p className="text-xs text-red-500">{errors.review_text.message}</p>
          )}

          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500">Rating:</label>
            <select
              {...register("rating")}
              className="border border-gray-300 rounded p-1 text-sm"
            >
              {[5, 4, 3, 2, 1].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          {errors.rating && (
            <p className="text-xs text-red-500">{errors.rating.message}</p>
          )}

          <button type="submit" className="bg-blue-600 text-white py-1.5 px-3 text-sm hover:bg-blue-700 cursor-pointer">
            Submit Review
          </button>
        </form>
      ) : (
        <div className="border-t border-gray-100 pt-4 text-sm text-gray-500">
          Please log in to add a review.
        </div>
      )}
    </div>
  );
}
