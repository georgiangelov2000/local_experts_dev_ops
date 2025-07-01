import { FiPhone, FiMapPin } from 'react-icons/fi';

export default function ProfileTab({ provider }) {
  return (
    <>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">About</h3>
        <p className="text-sm text-gray-700">{provider.description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
      </div>
      <div className="mb-4">
        <h4 className="font-semibold mb-1">Services Offered</h4>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {(provider.services || []).map((service, idx) => (
            <li key={idx}>{service}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
