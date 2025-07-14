import React, { useEffect, useState } from 'react';
import ServiceProviderCard from '../../../Home/ServiceProviderCard';
import apiService from '../../../../Services/apiService';

export default function Favourites({ user }) {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        async function fetchProviders() {
            if (user && user.favourite_ids && user.favourite_ids.length > 0) {
                // Assume an API exists to fetch providers by IDs
                const res = await apiService.getProvidersByIds(user.favourite_ids);
                setProviders(res.data.providers || []);
            } else {
                setProviders([]);
            }
        }
        fetchProviders();
    }, [user]);

    if (!providers.length) {
        return <div className="text-center text-gray-500">You have no favourites yet.</div>;
    }

    return (
        <div className="p-6 bg-gray-50 rounded-t-lg">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {providers.map(provider => (
                    <ServiceProviderCard key={provider.id} provider={provider} />
                ))}
            </div>
        </div>
    );
}
