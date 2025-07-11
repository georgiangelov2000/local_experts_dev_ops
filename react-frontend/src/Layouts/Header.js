import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiUserPlus, FiHeart, FiHome, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from "../Context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
        {/* LOGO + BURGER */}
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Logo"
              className="w-6 h-6"
            />
            <span className="text-xl font-bold">Local Experts</span>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* NAV */}
        <nav className={`flex-col md:flex-row md:flex md:items-center gap-2 md:gap-4 ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
          <Link
            to="/"
            className="flex items-center px-3 py-1 text-sm font-medium rounded hover:bg-white hover:text-blue-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            <FiHome className="mr-1" />
            Home
          </Link>

          {!user && (
            <Link
              to="/favourites"
              className="flex items-center px-3 py-1 text-sm font-medium rounded hover:bg-white hover:text-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              <FiHeart className="mr-1" />
              Favourites
            </Link>
          )}

          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center px-3 py-1 text-sm font-medium rounded hover:bg-white hover:text-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                <FiUser className="mr-1" />
                {user.email}
              </Link>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
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
                className="flex items-center px-3 py-1 text-sm font-medium border border-white/50 rounded hover:bg-white/10 transition"
                onClick={() => setMenuOpen(false)}
              >
                <FiLogIn className="mr-1" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center px-3 py-1 text-sm font-medium border border-white/50 rounded hover:bg-white/10 transition"
                onClick={() => setMenuOpen(false)}
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
