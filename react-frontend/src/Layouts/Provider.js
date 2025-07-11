import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../Services/apiService';
import RelatedProviders from '../Components/Provider/RelatedProviders';
import ProfileTab from '../Components/Provider/Tabs/ProfileTab';
import ProjectsTab from '../Components/Provider/Tabs/ProjectsTab';
import VideosTab from '../Components/Provider/Tabs/VideosTab';
import Reviews from '../Components/Provider/Reviews';
import { providerReducer, initialState } from '../Reducers/providerReducer';
import { FiPhone, FiMail, FiGlobe, FiStar } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import SEO from '../Components/Auth/Shared/SEO';

export default function Provider() {
  const { alias } = useParams();
  const [state, dispatch] = useReducer(providerReducer, initialState);
  const { provider, related, loading, activeTab, showContact } = state;

  const tabs = ['Profile', 'Projects', 'Videos'];

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });

    apiService.getAdById(alias)
      .then((response) => {
        dispatch({ type: 'SET_PROVIDER', payload: response.data.service_provider });
        dispatch({ type: 'SET_RELATED', payload: response.data.related_providers });
        apiService.registerView(alias); // trigger view count
      })
      .catch(err => console.error('Error loading provider:', err))
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  }, [alias]);

  if (loading) return <div className="text-center p-6">Loading provider details...</div>;
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
        {/* ... header and layout remain the same ... */}
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
                  {provider.reviews?.length || 0} reviews
                </span>
              </div>
              {/* Likes / Dislikes / Views */}
              <div className="flex items-center gap-4 text-sm text-gray-700 mt-2">
                <div className="flex items-center">
                  <span className="text-green-500 font-semibold mr-1">👍</span>
                  {provider.likes_count ?? 0} Likes
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 font-semibold mr-1">👎</span>
                  {provider.dislikes_count ?? 0} Dislikes
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 font-semibold mr-1">👁</span>
                  {provider.views_count ?? 0} Views
                </div>
              </div>


              <div className="flex flex-wrap gap-2 mt-2">
                {provider.contact?.phone && (
                  <a href={`tel:${provider.contact.phone}`} className="flex items-center text-blue-600 hover:underline text-sm">
                    <FiPhone className="mr-1" /> {provider.contact.phone}
                  </a>
                )}
                {provider.contact?.email && (
                  <a href={`mailto:${provider.contact.email}`} className="flex items-center text-blue-600 hover:underline text-sm">
                    <FiMail className="mr-1" /> {provider.contact.email}
                  </a>
                )}
                {provider.contact?.website && (
                  <a href={provider.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline text-sm">
                    <FiGlobe className="mr-1" /> Website
                  </a>
                )}
              </div>
            </div>
          </div>
          <div >
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
              onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab })}
              className={`pb-2 ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
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
                onClick={() => dispatch({ type: 'TOGGLE_CONTACT' })}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
              {/* ...contact form as before... */}
            </div>
          </div>
        )}
      </div>


      <h3 className="text-xl font-bold mt-5 mb-5">Reviews</h3>
      <div className="mx-auto max-w-7xl bg-white rounded-lg p-5">
        <Reviews reviews={provider.reviews} />
      </div>

      <h3 className="text-xl font-bold mt-5 mb-5">Related Providers</h3>
      <div className="mx-auto max-w-7xl bg-white rounded-lg">
        <RelatedProviders providers={related} />
      </div>
    </>
  );
}
