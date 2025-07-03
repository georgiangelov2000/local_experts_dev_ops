import { useAuth } from "../Context/AuthContext";
import Profile from "../Components/Auth/Profile";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, authChecked } = useAuth();

  if (!authChecked) {
    return (
      <div className="max-w-md mx-auto p-4 mt-8 text-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Profile user={user} />;
}
