import { useState } from 'react';
import { FiPhone, FiMapPin, FiStar } from 'react-icons/fi';
import RelatedProviders from '../Components/RelatedProviders';

export default function ProviderDetailsPage() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [showContact, setShowContact] = useState(false);

  const tabs = ['Profile', 'Projects', 'Reviews', 'Videos'];

  return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center">
            <img
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_items_boosted&w=740"
              alt="Provider"
              className="w-24 h-24 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Richard Davis</h2>
              <p className="text-gray-600">Licensed Plumber</p>
              <div className="flex items-center mt-1">
                {[...Array(4)].map((_, i) => (
                  <FiStar key={i} className="text-yellow-400 mr-1" />
                ))}
                <FiStar className="text-yellow-400 mr-1 opacity-50" />
                <span className="text-sm text-gray-600 ml-2">25 reviews</span>
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
        <div className="flex space-x-6 border-b mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-blue-600'
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
              <p className="text-sm text-gray-700">
                Experienced licensed plumber specializing in residential plumbing repairs, installations,
                and maintenance. Committed to providing high-quality service with a focus on customer satisfaction.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold mb-1">Contact Information</h4>
                <div className="flex items-center text-sm text-gray-700">
                  <FiPhone className="mr-2" /> (555) 123-4567
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Address</h4>
                <div className="flex items-center text-sm text-gray-700">
                  <FiMapPin className="mr-2" /> 123 Elm St, Springfield
                </div>
              </div>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h4 className="font-semibold mb-1">Certifications</h4>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Licensed Plumber</span>, National Certification Authority
                </p>
              </div>
              <button className="bg-blue-700 text-white text-sm font-medium px-3 py-1 rounded hover:bg-blue-800">
                View
              </button>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Services Offered</h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>Leak repair</li>
                <li>Pipe installation</li>
                <li>Drain cleaning</li>
                <li>Water heater repair</li>
              </ul>
            </div>
          </>
        )}

        {activeTab === 'Projects' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((p) => (
              <div key={p} className="bg-gray-100 rounded-lg shadow-sm overflow-hidden">
                <img src="https://via.placeholder.com/400x200" alt="" className="w-full h-40 object-cover" />
                <div className="p-2">
                  <h4 className="font-medium text-sm mb-1">Project {p} Title</h4>
                  <p className="text-xs text-gray-600">Short description of project {p}.</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div className="space-y-2">
            {[1, 2].map((r) => (
              <div key={r} className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-700">"Richard did an excellent job! Highly recommend."</p>
                <span className="text-xs text-gray-500">- Customer {r}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((v) => (
              <div key={v} className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title={`Video ${v}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showContact && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fade-in-up relative">
              <button
                onClick={() => setShowContact(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold mb-4">Contact Richard Davis</h3>
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
  );
}
