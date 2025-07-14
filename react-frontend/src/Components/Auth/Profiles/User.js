import React, { useReducer, useEffect, useState } from 'react';
import { userProfileReducer, initialState } from '../../../Reducers/userProfileReducer';
import Profile from '../Tabs/Users/Profile';
import Password from '../Tabs/Users/Password';
import Likes from '../Tabs/Users/Likes';
import Favourites from '../Tabs/Users/Favourites';
import { FiUser, FiHeart, FiThumbsUp, FiLock } from 'react-icons/fi';
import apiService from '../../../Services/apiService';

export default function User({ user }) {
    const [state, dispatch] = useReducer(userProfileReducer, initialState);
    const [tabData, setTabData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userTabs = [
        { id: 'basic', name: 'Profile', icon: <FiUser /> },
        { id: 'likes', name: 'Likes', icon: <FiThumbsUp /> },
        { id: 'favourites', name: 'Favourites', icon: <FiHeart /> },
        { id: 'password', name: 'Change Password', icon: <FiLock /> },
    ];

    useEffect(() => {
        setLoading(true);
        setError(null);
        setTabData(null);
        if (state.activeTab === 'password') {
            setLoading(false);
            setTabData(null);
            return;
        }
        apiService.getProfileTab(state.activeTab)
            .then(res => setTabData(res.data))
            .catch(() => setError('Failed to load tab data.'))
            .finally(() => setLoading(false));
    }, [state.activeTab]);

    const renderTabContent = () => {
        if (loading) return <div className="text-center text-blue-600">Loading...</div>;
        if (error) return <div className="text-center text-red-600">{error}</div>;
        switch (state.activeTab) {
            case 'basic':
                return <Profile user={user} data={tabData} />;
            case 'likes':
                return <Likes user={user} data={tabData} />;
            case 'favourites':
                return <Favourites user={user} data={tabData} />;
            case 'password':
                return <Password user={user} />;
            default:
                return <div className="text-center text-gray-500">No data.</div>;
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-2 bg-gray-50 p-5 border-0 items-center">
                {userTabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`text-sm flex items-center gap-2 py-2 px-3 rounded transition cursor-pointer 
                            ${state.activeTab === tab.id ? 'bg-gray-700 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab.id })}
                    >
                        {tab.icon}
                        <span>{tab.name}</span>
                    </button>
                ))}
            </div>
            <div className="bg-white p-4 min-h-720">
                {renderTabContent()}
            </div>
        </>
    );
}
