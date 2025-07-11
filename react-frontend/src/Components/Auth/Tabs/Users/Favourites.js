import React from 'react';
import ServiceProviderCard from '../../../Home/ServiceProviderCard';

export default function Favouries({ user }) {
    return (
        <div className="p-6 bg-gray-50 rounded-t-lg">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {user.favourites.map(favourite => (
                    <ServiceProviderCard key={favourite.id} provider={favourite} />
                ))}
            </div>
        </div>
    );
}
