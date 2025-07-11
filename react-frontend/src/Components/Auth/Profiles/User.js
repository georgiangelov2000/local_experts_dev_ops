import React, { useReducer } from 'react';
import Favouries from '../Tabs/Users/Favourites';
import Likes from '../Tabs/Users/Likes';
import Dislikes from '../Tabs/Users/Dislikes';
import Contacts from '../Tabs/Users/Contacts';
import { FiUser, FiHeart, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { userProfileReducer, initialState } from '../../../Reducers/userProfileReducer';
import SocialProfile from '../Shared/SocialProfile';

export default function User({ user }) {
    const [state, dispatch] = useReducer(userProfileReducer, initialState);

    const userTabs = [
        {
            id: 'profile',
            name: 'Profile',
            component: <Contacts user={user} />,
            icon: <FiUser className="text-lg" />
        },
        {
            id: 'favourites',
            name: 'Favourites',
            component: <Favouries user={user} />,
            icon: <FiHeart className="text-lg text-pink-500" />
        },
        {
            id: 'likes',
            name: 'Likes',
            component: <Likes user={user} />,
            icon: <FiThumbsUp className="text-lg text-green-500" />
        },
        {
            id: 'dislikes',
            name: 'Dislikes',
            component: <Dislikes user={user} />,
            icon: <FiThumbsDown className="text-lg text-red-500" />
        }
    ];

    const activeTab = userTabs.find(tab => tab.id === state.activeTab);

    return (
        <>
            <SocialProfile user = {user} />
            <div className="flex flex-wrap gap-2 bg-white p-3 rounded-lg shadow mb-6">
                {userTabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`flex items-center gap-2 py-2 px-3 rounded transition cursor-pointer 
                            ${state.activeTab === tab.id ? 'bg-gray-200 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab.id })}
                    >
                        {tab.icon}
                        <span>{tab.name}</span>
                    </button>
                ))}
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                {activeTab?.component}
            </div>
        </>
    );
}
