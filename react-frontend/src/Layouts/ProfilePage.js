import { useEffect, useState } from 'react';
import Profile from '../Components/Auth/Profile';
import apiService from '../Services/apiService';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      apiService.auth()
        .then(res => {
          setUser(res.data);
          setError(false);
        })
        .catch(() => {
          console.error("Failed to load user");
          setError(true);
        });
    }, []);

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-red-100 text-red-700 p-4 rounded-md mt-8 text-center">
        <h2 className="text-lg font-bold">Error</h2>
        <p>Unable to load your profile. Please try again or log in again.</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-4 mt-8 text-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return <Profile user={user} />;
}
