import React, { useReducer, useEffect, useState } from 'react';
import { providerProfileReducer, initialState } from '../../../Reducers/providerProfileReducer';
import apiService from '../../../Services/apiService';
import Profile from "../Tabs/Providers/Profile";
import Password from "../Tabs/Providers/Password";
import Contacts from "../Tabs/Providers/Contacts";
import Projects from "../Tabs/Providers/Projects";
import Services from "../Tabs/Providers/Services";
import Preview from "../Tabs/Providers/Preview";
import Certifications from "../Tabs/Providers/Certifications";
import { FiUser, FiFolder, FiBriefcase, FiPhone, FiAward, FiLock, FiEye } from 'react-icons/fi';
import SocialProfile from '../Shared/SocialProfile';
import { useNavigate } from 'react-router-dom';

export default function Provider({ user }) {
    console.log(user);
    const [state, dispatch] = useReducer(providerProfileReducer, initialState);
    const [tabData, setTabData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fullProfile, setFullProfile] = useState(null);

    const providerTabs = [
        { id: "basic", name: "Profile", icon: <FiUser /> },
        { id: "projects", name: "Projects", icon: <FiFolder /> },
        { id: "services", name: "Services", icon: <FiBriefcase /> },
        { id: "certifications", name: "Certifications", icon: <FiAward /> },
        { id: "contacts", name: "Contacts", icon: <FiPhone /> },
        { id: "password", name: "Change Password", icon: <FiLock /> },
        { id: "preview", name: "Preview", icon: <FiEye /> },
    ];

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(null);
        if (state.activeTab === 'preview') {
            // Fetch full profile for preview
            apiService.getProfilePreview()
                .then(res => setFullProfile(res.data))
                .catch(err => setError(err.response?.data?.error || 'Failed to load profile preview.'))
                .finally(() => setLoading(false));
        } else if(state.activeTab !== "password") {
            apiService.toggleTab(state.activeTab)
                .then(res => setTabData(res.data))
                .catch(err => setError(err.response?.data?.error || 'Failed to load data.'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [state.activeTab]);

    // console.log(tabData);
    const renderTabContent = () => {
        if (loading) return <div className="text-center text-blue-600">Loading...</div>;
        if (error) return <div className="text-center text-red-600">{error}</div>;
        if (state.activeTab === 'preview') {
            if (!fullProfile) return null;
            return <Preview data={fullProfile} />;
        }
        if (!tabData) return null;
        switch (state.activeTab) {
            case 'basic':
                return <Profile data={tabData} />;
            case 'projects':
                return <Projects data={tabData} />;
            case 'services':
                return <Services data={tabData} />;
            case 'certifications':
                return <Certifications data={tabData} />;
            case 'contacts':
                return <Contacts data={tabData} />;
            case 'password':
                return <Password />;
            default:
                return <div className="text-center text-gray-500">No data.</div>;
        }
    };

    return (
        <>

            <div className="flex flex-wrap gap-2 bg-gray-50 border-0">
                <SocialProfile user={user} />
            </div>
            <div className='flex flex-wrap gap-2 bg-gray-50 p-5 border-0 items-center'>
            {providerTabs.map(tab => (
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
                {/* View Public Profile Button */}
                {user?.alias && (
                  <button
                    className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded shadow transition"
                    onClick={() => navigate(`/providers/${user.alias}`)}
                    type="button"
                  >
                    View Public Profile
                  </button>
                )}
            </div>

            <div className="bg-white p-4 min-h-720">
                {renderTabContent()}
            </div>
        </>
    );
}