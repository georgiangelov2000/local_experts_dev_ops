import { FiPhone, FiMapPin } from 'react-icons/fi';

export default function ProfileTab({ provider }) {
  return (
    <>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">About</h3>
        <p className="text-sm text-gray-700">{provider.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <h4 className="font-semibold mb-1">Contact Information</h4>
          <div className="flex items-center text-sm text-gray-700">
            <FiPhone className="mr-2" /> {provider.phone || '(example) +359 888 123 456'}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Address</h4>
          <div className="flex items-center text-sm text-gray-700">
            <FiMapPin className="mr-2" /> {provider.address || 'No address set'}
          </div>
        </div>
        <div className="mb-4">
          <h4 class="font-semibold mb-1">Cities Served</h4>
          {provider.workspaces?.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {provider.workspaces.map((workspace, idx) => (
                <li
                  key={idx}
                  className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {workspace.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No cities specified.</p>
          )}
        </div>
      </div>

      <div className="mb-6 p-4 rounded-lg shadow-sm bg-white border border-gray-200">
        <h4 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">Certifications</h4>
        {provider.certifications?.length > 0 ? (
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
        ) : (
          <p className="text-sm text-gray-500">No certifications listed.</p>
        )}
      </div>

      <div className="mb-6 p-4 rounded-lg shadow-sm bg-white border border-gray-200">
        <h4 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">Services Offered</h4>
        <ul className="space-y-2">
          {(provider.services || []).map((service, idx) => (
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
    </>
  );
}
