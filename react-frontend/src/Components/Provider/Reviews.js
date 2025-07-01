import { useState } from 'react';
import { FiStar } from 'react-icons/fi';

export default function Reviews({ reviews = [], onAddReview }) {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }

    // Изпрати към родител или API
    if (onAddReview) {
      onAddReview({
        review_text: newComment,
        rating: newRating,
        created_at: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9),
      });
    }

    setNewComment('');
    setNewRating(5);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 opacity-30" />
                  ))}
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed italic">
                "{review.review_text}"
              </p>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No reviews yet.</div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-100 pt-4 space-y-3"
      >
        <h4 className="text-sm font-medium text-gray-700">Add a review</h4>
        <textarea
          className="w-full border border-gray-300 rounded p-2 text-sm"
          rows="3"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>

        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500">Rating:</label>
          <select
            value={newRating}
            onChange={(e) => setNewRating(parseInt(e.target.value))}
            className="border border-gray-300 rounded p-1 text-sm"
          >
            {[5, 4, 3, 2, 1].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white py-1.5 px-3 text-sm hover:bg-blue-700 cursor-pointer"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
