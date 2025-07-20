import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiMessageSquare, FiUser, FiCalendar, FiSend, FiCheckCircle, FiX } from 'react-icons/fi';
import apiService from '../../Services/apiService';
import { useReviewForm } from '../../Models/useReviewForm';
import { useAuth } from '../../Context/AuthContext';
import Pagination from '../Home/List/Pagination';
import ReviewsSkeleton from './ReviewsSkeleton';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Reviews({ reviews = [], serviceProviderId, onReviewAdded, pagination, onPageChange, reviewsLoading, reviewsError }) {
  const { user } = useAuth();
  const { register, handleSubmit, errors, reset } = useReviewForm(user, serviceProviderId);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { t } = useTranslation();

  const submitHandler = async (data) => {
    const payload = {
      ...data,
      user_id: user ? user.id : null,
      service_provider_id: serviceProviderId,
    };

    try {
      const response = await apiService.reviews(payload);
      if (onReviewAdded) {
        onReviewAdded(response.data);
      }
      reset();
      setAlertMessage(t('thank_you_review'));
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting review", error);
      setAlertMessage(t('error_review'));
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  if (reviewsLoading) {
    return (
      <div className="space-y-8">
        {showAlert && (
          <div className="flex items-center p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
            <FiCheckCircle className="flex-shrink-0 w-4 h-4" />
            <span className="sr-only">Info</span>
            <div className="ml-3 text-sm font-medium">
              {alertMessage}
            </div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
              onClick={() => setShowAlert(false)}
            >
              <span className="sr-only">Close</span>
              <FiX className="w-3 h-3" />
            </button>
          </div>
        )}
        <ReviewsSkeleton />
        {user && (
          <div className="border-t border-gray-100 pt-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <FiMessageSquare className="text-white text-sm" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{t('share_your_experience')}</h4>
              </div>
              <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('your_rating')}
                  </label>
                  <select
                    {...register("rating")}
                    className="w-full max-w-xs border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">{t('select_rating')}</option>
                    {[5, 4, 3, 2, 1].map((val) => (
                      <option key={val} value={val}>
                        {val} {t('star', { count: val })} - {val === 5 ? t('excellent') : val === 4 ? t('good') : val === 3 ? t('average') : val === 2 ? t('poor') : t('very_poor')}
                      </option>
                    ))}
                  </select>
                  {errors.rating && (
                    <p className="text-xs text-red-500 mt-1">{errors.rating.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('your_review')}
                  </label>
                  <textarea
                    {...register("review_text")}
                    placeholder={t('review_placeholder')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    rows="4"
                  />
                  {errors.review_text && (
                    <p className="text-xs text-red-500 mt-1">{errors.review_text.message}</p>
                  )}
                </div>
                <button 
                  type="submit" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
                >
                  <FiSend className="mr-2 text-sm" />
                  {t('submit_review')}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

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
      {showAlert && (
        <div className="flex items-center p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
          <FiCheckCircle className="flex-shrink-0 w-4 h-4" />
          <span className="sr-only">Info</span>
          <div className="ml-3 text-sm font-medium">
            {alertMessage}
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            onClick={() => setShowAlert(false)}
          >
            <span className="sr-only">Close</span>
            <FiX className="w-3 h-3" />
          </button>
        </div>
      )}
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
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <FiUser className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {review.consumer_email ? review.consumer_email.split('@')[0] : t('anonymous_user')}
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
                          {ratingValue}.0 {t('out_of_5')}
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('no_reviews_yet')}</h3>
              <p className="text-gray-500">{t('be_first_to_review')}</p>
            </div>
          </div>
        )}
      </div>
      {pagination && pagination.last_page > 1 && (
        <div className="border-t border-gray-100 pt-6">
          <Pagination
            pagination={pagination}
            onPageChange={onPageChange}
          />
        </div>
      )}
      {user ? (
        <div className="border-t border-gray-100 pt-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <FiMessageSquare className="text-white text-sm" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">{t('share_your_experience')}</h4>
            </div>
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('your_rating')}
                </label>
                <select
                  {...register("rating")}
                  className="w-full max-w-xs border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">{t('select_rating')}</option>
                  {[5, 4, 3, 2, 1].map((val) => (
                    <option key={val} value={val}>
                      {val} {t('star', { count: val })} - {val === 5 ? t('excellent') : val === 4 ? t('good') : val === 3 ? t('average') : val === 2 ? t('poor') : t('very_poor')}
                    </option>
                  ))}
                </select>
                {errors.rating && (
                  <p className="text-xs text-red-500 mt-1">{errors.rating.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('your_review')}
                </label>
                <textarea
                  {...register("review_text")}
                  placeholder={t('review_placeholder')}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  rows="4"
                />
                {errors.review_text && (
                  <p className="text-xs text-red-500 mt-1">{errors.review_text.message}</p>
                )}
              </div>
              <button 
                type="submit" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
              >
                <FiSend className="mr-2 text-sm" />
                {t('submit_review')}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-100 pt-8">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 text-center">
            <FiMessageSquare className="mx-auto text-gray-400 text-3xl mb-3" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">{t('want_to_share_experience')}</h4>
            <p className="text-gray-600 mb-4">{t('login_to_add_review')}</p>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              {t('login_to_review')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
