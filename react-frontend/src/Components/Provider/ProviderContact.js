import { FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

export default function ProviderContact({ contact }) {
  if (!contact) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {contact.phone && (
        <a href={`tel:${contact.phone}`} className="flex items-center text-blue-600 hover:underline text-sm">
          <FiPhone className="mr-1" /> {contact.phone}
        </a>
      )}
      {contact.email && (
        <a href={`mailto:${contact.email}`} className="flex items-center text-blue-600 hover:underline text-sm">
          <FiMail className="mr-1" /> {contact.email}
        </a>
      )}
      {contact.website && (
        <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline text-sm">
          <FiGlobe className="mr-1" /> Website
        </a>
      )}
    </div>
  );
} 