import SEO from '../Components/Auth/Shared/SEO';
import { useAuth } from "../Context/AuthContext";
import Profile from "../Components/Auth/Profile";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, authChecked } = useAuth();

  // Dynamic SEO values
  const seoTitle = user && user.social_name
    ? `${user.social_name} - Profile | Local Experts`
    : 'Your Profile - Local Experts';
  const seoDescription = user && user.social_name
    ? `View and manage the profile of ${user.social_name} on Local Experts. Edit your details, projects, and more.`
    : 'View and manage your profile, projects, services, and more on Local Experts.';
  const seoImage = user && user.provider === 'google'
    ? 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    : user && user.provider === 'facebook'
      ? 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png'
      : 'https://yourdomain.com/og-image.jpg';
  const seoUrl = 'https://yourdomain.com/profile';

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        url={seoUrl}
        image={seoImage}
      />
      {(!authChecked) ? (
        <div className="max-w-md mx-auto p-4 mt-8 text-center">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      ) : !user ? (
        <Navigate to="/login" replace />
      ) : (
        <Profile user={user} />
      )}
    </>
  );
}
