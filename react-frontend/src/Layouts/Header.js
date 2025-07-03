import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiUserPlus, FiHeart, FiHome, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from "../Context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-5 mb-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Logo"
            className="w-6 h-6"
          />
          <span className="text-xl font-bold">Local Experts</span>
        </div>

        <nav className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center px-3 py-1 text-sm font-medium border-0 rounded hover:bg-white hover:text-blue-600 transition"
          >
            <FiHome className="mr-1" />
            Home
          </Link>

          <Link
            to="/favourites"
            className="flex items-center px-3 py-1 text-sm font-medium border-0 rounded hover:bg-white hover:text-blue-600 transition"
          >
            <FiHeart className="mr-1" />
            Favourites
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center px-3 py-1 text-sm font-medium border-0 rounded hover:bg-white hover:text-blue-600 transition"
              >
                <FiUser className="mr-1" />
                {user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-1 text-sm font-medium border border-white rounded hover:bg-white hover:text-blue-600 transition cursor-pointer"
              >
                <FiLogOut className="mr-1" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center px-3 py-1 text-sm font-medium border border-white rounded hover:bg-white hover:text-blue-600 transition"
              >
                <FiLogIn className="mr-1" />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center px-3 py-1 text-sm font-medium border border-white rounded hover:bg-white hover:text-blue-600 transition"
              >
                <FiUserPlus className="mr-1" />
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
