import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../Services/apiService';
import RelatedProviders from '../Components/Provider/RelatedProviders';
import { FiPhone, FiMail, FiGlobe, FiStar, FiMapPin } from 'react-icons/fi';

export default function Provider() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Profile');
  const [showContact, setShowContact] = useState(false);

  const tabs = ['Profile', 'Projects', 'Reviews', 'Videos'];

  useEffect(() => {
    setLoading(true);
    apiService.getAdById(id)
      .then((response) => {
        setProvider(response.data.service_provider);
        setRelated(response.data.related_providers);
      })
      .catch((err) => {
        console.error('Error loading provider:', err);
      })
      .finally(() => setLoading(false));
  }, [id]);

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
              <p className="text-gray-600">{provider.service_category?.name || 'Service Provider'}</p>
              <div className="flex items-center mt-1">
                {[...Array(4)].map((_, i) => (
                  <FiStar key={i} className="text-yellow-400 mr-1" />
                ))}
                <FiStar className="text-yellow-400 mr-1 opacity-50" />
                <span className="text-sm text-gray-600 ml-2">
                  {provider.reviews?.length || 0} reviews
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {provider.phone && (
                  <a
                    href={`tel:${provider.phone}`}
                    className="flex items-center text-blue-600 hover:underline text-sm"
                  >
                    <FiPhone className="mr-1" /> Call
                  </a>
                )}
                {provider.email && (
                  <a
                    href={`mailto:${provider.email}`}
                    className="flex items-center text-blue-600 hover:underline text-sm"
                  >
                    <FiMail className="mr-1" /> Email
                  </a>
                )}
                {provider.website && (
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline text-sm"
                  >
                    <FiGlobe className="mr-1" /> Website
                  </a>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowContact(true)}
            className="mt-4 sm:mt-0 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
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
        {activeTab === 'Profile' && (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">About</h3>
              <p className="text-sm text-gray-700">{provider.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold mb-1">Contact Information</h4>
                <div className="flex items-center text-sm text-gray-700">
                  <FiPhone className="mr-2" /> (example) +359 888 123 456
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Address</h4>
                <div className="flex items-center text-sm text-gray-700">
                  <FiMapPin className="mr-2" /> No address set
                </div>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Services Offered</h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>Leak repair</li>
                <li>Pipe installation</li>
                <li>Drain cleaning</li>
              </ul>
            </div>
          </>
        )}

        {activeTab === 'Projects' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {provider?.user_projects?.map((project) => (
              <div key={project.id} className="bg-gray-100 rounded-lg shadow-sm overflow-hidden">
                <img
                  src={project.image_url || "https://media.istockphoto.com/id/1444666625/photo/online-advertising-concept-ad-on-internet.jpg?s=612x612&w=0&k=20&c=Lp2QzOAMWOt4QaJRyk5aBUIkw6EgnsjcvDuDIktJ8yY="}
                  alt={project.project_name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-2">
                  <h4 className="font-medium text-sm mb-1">{project.project_name}</h4>
                  <p className="text-xs text-gray-600 mb-1">{project.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(project.date_start).toLocaleDateString()} - {new Date(project.date_end).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {provider?.user_projects?.length === 0 && (
              <div className="text-sm text-gray-500">No projects available.</div>
            )}
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div className="space-y-2">
            {provider.reviews && provider.reviews.length > 0 ? (
              provider.reviews.map((review) => (
                <div key={review.id} className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">"{review.review_text}"</p>
                  <div className="flex items-center mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 mr-1 text-xs" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 mr-1 opacity-30 text-xs" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">Posted on {new Date(review.created_at).toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            )}
          </div>
        )}

        {activeTab === 'Videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Sample Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        )}

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
      <div>
        <h3 className="text-xl font-bold mt-5 mb-5">Related Providers</h3>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white rounded-lg">
          <RelatedProviders providers={related} />
        </div>
      </div>
    </>
  );
}
