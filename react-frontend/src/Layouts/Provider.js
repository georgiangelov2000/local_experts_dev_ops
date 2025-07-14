import { useParams } from 'react-router-dom';
import RelatedProvidersSection from '../Components/Provider/RelatedProvidersSection';
import ProfileTab from '../Components/Provider/Tabs/ProfileTab';
import ProjectsTab from '../Components/Provider/Tabs/ProjectsTab';
import VideosTab from '../Components/Provider/Tabs/VideosTab';
import ReviewsSection from '../Components/Provider/ReviewsSection';
import ProviderStats from '../Components/Provider/ProviderStats';
import ProviderContact from '../Components/Provider/ProviderContact';
import { useProvider } from '../Hooks/useProvider';
import { FaStar, FaRegStar, FaSpinner } from 'react-icons/fa';
import SEO from '../Components/Auth/Shared/SEO';

export default function Provider() {
  const { alias } = useParams();
  const {
    provider,
    related,
    relatedCount,
    reviews,
    loading,
    reviewsLoading,
    reviewsError,
    activeTab,
    showContact,
    onPageChange,
    setActiveTab,
    toggleContact
  } = useProvider(alias);
  const tabs = ['Profile', 'Projects', 'Videos'];

  if (loading) return (
    <div className="flex justify-center items-center p-6">
      <FaSpinner className="animate-spin text-2xl text-blue-600" />
    </div>
  );
  if (!provider) return <div className="text-center p-6 text-red-600">Provider not found.</div>;

  // Dynamic SEO values
  const seoTitle = provider.business_name
    ? `${provider.business_name} - ${provider.service_category || 'Service Provider'} | Local Experts`
    : 'Provider Profile - Local Experts';
  const seoDescription = provider.description
    ? provider.description.slice(0, 160)
    : `Explore ${provider.business_name || 'this service provider'}'s profile, reviews, and projects on Local Experts.`;
  const seoImage = provider.media && provider.media.length > 0
    ? provider.media[0].url
    : 'https://yourdomain.com/og-image.jpg';
  const seoUrl = `https://yourdomain.com/provider/${alias}`;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        url={seoUrl}
        image={seoImage}
      />
      <div className="bg-white rounded-lg p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center">
            <img
              src={
                provider.media?.length > 0
                  ? provider.media[0].url
                  : 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_items_boosted&w=740'
              }
              alt={provider.business_name}
              className="w-24 h-24 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{provider.business_name}</h2>
              <p className="text-gray-600">{provider.service_category || 'Service Provider'}</p>
              <div className="flex items-center mt-1">
                {Array.from({ length: Math.floor(provider.final_grade || 0) }).map((_, i) => (
                  <FaStar key={`filled-${i}`} className="text-yellow-400 mr-1" />
                ))}
                {Array.from({ length: 5 - Math.floor(provider.final_grade || 0) }).map((_, i) => (
                  <FaRegStar key={`empty-${i}`} className="text-yellow-400 mr-1 opacity-50" />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {provider.reviews_count || 0} reviews
                </span>
              </div>
              
              <ProviderStats provider={provider} />
              <ProviderContact contact={provider.contact} />
            </div>
          </div>
          <div>
            <div className="flex items-center mb-3">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="John Doe"
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            <div className="text-xs text-gray-600">
              Logged in with:
              <span className="ml-1 font-medium text-blue-600">Facebook</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-100 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600 cursor-pointer'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Profile' && <ProfileTab provider={provider} />}
        {activeTab === 'Projects' && <ProjectsTab projects={provider.projects} />}
        {activeTab === 'Videos' && <VideosTab videos={provider.videos || []} />}

        {/* Contact Modal */}
        {showContact && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <button
                onClick={toggleContact}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
              {/* Contact form content */}
            </div>
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="mx-auto max-w-7xl bg-white rounded-lg p-6 mb-3 mt-3">
        <ReviewsSection
          reviews={reviews.data}
          pagination={reviews}
          onPageChange={onPageChange}
          serviceProviderId={provider.id}
          reviewsLoading={reviewsLoading}
          reviewsError={reviewsError}
          reviewsCount={provider.reviews_count || 0}
        />
      </div>

      {/* Related Providers Section */}
      <div className="mx-auto max-w-7xl bg-white rounded-lg p-6">
        <RelatedProvidersSection 
          providers={related} 
          count={relatedCount} 
          loading={loading}
        />
      </div>
    </>
  );
}
