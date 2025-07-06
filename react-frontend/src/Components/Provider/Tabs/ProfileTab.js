import { FiPhone, FiMapPin, FiMail, FiGlobe } from 'react-icons/fi';

export default function ProfileTab({ provider }) {
  return (
    <>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">About</h3>
        <p className="text-sm text-gray-700">{provider.description}</p>
      </div>

      <div>
        <h4 className="font-semibold mb-1">Contact Information</h4>
        <div className="space-y-1 text-sm text-gray-700">
          {provider.contact?.phone && (
            <div className="flex items-center">
              <FiPhone className="mr-2" /> {provider.contact.phone}
            </div>
          )}
          {provider.contact?.email && (
            <div className="flex items-center">
              <FiMail className="mr-2" /> {provider.contact.email}
            </div>
          )}
          {provider.contact?.website && (
            <div className="flex items-center">
              <FiGlobe className="mr-2" />
              <a href={provider.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {provider.contact.website}
              </a>
            </div>
          )}
          {provider.contact?.address && (
            <div className="flex items-center">
              <FiMapPin className="mr-2" /> {provider.contact.address}
            </div>
          )}
          {provider.contact?.facebook && (
            <div className="flex items-center">
              <span className="mr-2">📘</span>
              <a href={provider.contact.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Facebook
              </a>
            </div>
          )}
          {provider.contact?.instagram && (
            <div className="flex items-center">
              <span className="mr-2">📸</span>
              <a href={provider.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Instagram
              </a>
            </div>
          )}
        </div>
      </div>


      {provider.certifications?.length > 0 && (
        <div className="mb-6 mt-4">
          <h4 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">Certifications</h4>
          <ul className="space-y-3">
            {provider.certifications.map((cert, idx) => (
              <li key={idx} className="bg-gray-50 rounded p-3 hover:bg-gray-100">
                <p className="text-sm font-semibold text-gray-800">{cert.name}</p>
                <p className="text-xs text-gray-600 mb-1">{cert.description}</p>
                {cert.image_url && (
                  <a
                    href={cert.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    View Certificate Image
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {provider.services?.length > 0 && (
        <div className="mb-6 mt-4">
          <h4 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">Services Offered</h4>
          <ul className="space-y-2">
            {provider.services.map((service, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-50 rounded px-3 py-2 hover:bg-gray-100"
              >
                <span className="text-sm text-gray-700">{service.description}</span>
                <span className="text-sm font-medium text-gray-900">{service.price} лв</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
