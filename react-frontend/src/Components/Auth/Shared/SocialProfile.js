import React from 'react';

export default function SocialProfile({ user }) {
    if (!user.provider) {
        return <div className="text-gray-500">No social profile information available.</div>;
    }
    return (
        <div className="flex flex-col md:flex-row items-center pt-6 w-full max-w-xl">
            <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
                <img
                    src={user.provider === 'google' ? 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' : 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png'}
                    alt={user.provider}
                    className="w-20 h-20 md:w-32 md:h-32 object-contain"
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start md:pl-8">
                <h2 className="text-xl font-bold mb-2 text-blue-700">{user.social_name || user.email}</h2>
                <p className="text-gray-700 mb-1">Logged in with <span className="font-semibold">{user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}</span></p>
                <p className="text-gray-500 text-sm">{user.email}</p>
                {user.provider_id && (
                    <p className="text-gray-400 text-xs mt-2">Provider ID: {user.provider_id}</p>
                )}
            </div>
        </div>
    );
} 