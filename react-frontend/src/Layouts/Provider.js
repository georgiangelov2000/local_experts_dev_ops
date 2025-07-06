import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../Services/apiService';
import RelatedProviders from '../Components/Provider/RelatedProviders';
import { FiPhone, FiMail, FiGlobe, FiStar } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import ProfileTab from '../Components/Provider/Tabs/ProfileTab';
import ProjectsTab from '../Components/Provider/Tabs/ProjectsTab';
import VideosTab from '../Components/Provider/Tabs/VideosTab';
import Reviews from '../Components/Provider/Reviews';

export default function Provider() {
  const { alias } = useParams();
  const [provider, setProvider] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Profile');
  const [showContact, setShowContact] = useState(false);

  const tabs = ['Profile', 'Projects', 'Videos'];

  useEffect(() => {
    setLoading(true);
    apiService.getAdById(alias)
      .then((response) => {
        setProvider(response.data.service_provider);
        setRelated(response.data.related_providers);
      })
      .catch((err) => {
        console.error('Error loading provider:', err);
      })
      .finally(() => setLoading(false));
  }, [alias]);

  if (loading) {
    return <div className="text-center p-6">Loading provider details...</div>;
  }

  if (!provider) {
    return <div className="text-center p-6 text-red-600">Provider not found.</div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg p-6">
        {/* Header */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 cursor-pointer">
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
                  {provider.views ?? 0} Views
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
          <button
            onClick={() => setShowContact(true)}
            className="mt-4 sm:mt-0 text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm px-5 py-2.5 cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-100 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                : 'text-gray-600 hover:text-blue-600 cursor-pointer'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Profile' && <ProfileTab provider={provider} />}
        {activeTab === 'Projects' && <ProjectsTab projects={provider.projects} />}
        {activeTab === 'Videos' && <VideosTab videos={provider.videos || ['https://www.youtube.com/embed/dQw4w9WgXcQ']} />}

        {/* Contact modal */}
        {showContact && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fade-in-up relative">
              <button
                onClick={() => setShowContact(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold mb-4">Contact {provider.business_name}</h3>
              <form>
                <div className="mb-3">
                  <label className="block text-sm mb-1">Your Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded p-2" />
                </div>
                <div className="mb-3">
                  <label className="block text-sm mb-1">Your Email</label>
                  <input type="email" className="w-full border border-gray-300 rounded p-2" />
                </div>
                <div className="mb-3">
                  <label className="block text-sm mb-1">Message</label>
                  <textarea className="w-full border border-gray-300 rounded p-2" rows="3"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold mt-5 mb-5">Reviews</h3>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white rounded-lg p-5">
        <Reviews reviews={provider.reviews} />
      </div>

      <h3 className="text-xl font-bold mt-5 mb-5">Related Providers</h3>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white rounded-lg">
        <RelatedProviders providers={related} />
      </div>
    </>
  );
}
