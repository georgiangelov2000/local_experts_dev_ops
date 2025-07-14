import { FaGoogle, FaFacebook, FaUserCircle } from 'react-icons/fa';

export default function ProviderSidebar({ user }) {
  if (!user) return null;
  const providerIcon = user.provider === 'google' ? <FaGoogle className="inline text-blue-500 ml-1" /> : user.provider === 'facebook' ? <FaFacebook className="inline text-blue-700 ml-1" /> : null;
  return (
    <aside className="w-full md:w-80 md:mr-8 mb-6 md:mb-0 bg-white rounded-lg shadow p-6 flex flex-col items-center">
      {user.avatar ? (
        <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover mb-3" />
      ) : (
        <FaUserCircle className="w-24 h-24 text-gray-300 mb-3" />
      )}
      <h2 className="text-xl font-bold text-gray-800 mb-1">{user.name || user.username}</h2>
      <p className="text-gray-500 mb-2">{user.email}</p>
      {user.provider && (
        <span className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
          Logged in with {user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}
          {providerIcon}
        </span>
      )}
    </aside>
  );
} 