import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiUserPlus, FiHeart, FiHome, FiUser, FiLogOut, FiMenu, FiX, FiSearch, FiBell, FiSettings } from 'react-icons/fi';
import { useAuth } from "../Context/AuthContext";
import { useTranslation } from 'react-i18next';
import i18n from '../locales/i18n';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [favouritesCount, setFavouritesCount] = useState(0);
  const { t } = useTranslation();
  const languageOptions = [
    { value: 'bg', label: 'BG', flag: '🇧🇬' },
    { value: 'en', label: 'EN', flag: '🇬🇧' },
  ];

  useEffect(() => {
    if (!user) {
      const updateCount = () => {
        const favs = JSON.parse(localStorage.getItem('guest_favourites') || '[]');
        setFavouritesCount(favs.length);
      };
      updateCount();
      window.addEventListener('storage', updateCount);
      return () => window.removeEventListener('storage', updateCount);
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setUserMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-200">
                <span className="text-white font-bold text-lg">LE</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  Local Experts
                </span>
                <p className="text-xs text-gray-500 -mt-1">{t('find_your_perfect_match')}</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            >
              <FiHome className="mr-2" />
              {t('home')}
            </Link>
            {!user && (
              <Link
                to="/favourites"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <FiHeart className="mr-2" />
                {t('favourites')}{favouritesCount > 0 ? ` (${favouritesCount})` : ''}
              </Link>
            )}
            {/* Language Switcher */}
            <div className="relative ml-4">
              <select
                value={i18n.language}
                onChange={e => i18n.changeLanguage(e.target.value)}
                className="appearance-none pl-8 pr-6 py-1 rounded border border-gray-300 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm hover:border-blue-400 transition-all duration-150"
                style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill=\'gray\' height=\'20\' viewBox=\'0 0 20 20\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5H7z\'/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.25em' }}
              >
                {languageOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.flag} {opt.label}
                  </option>
                ))}
              </select>
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-lg">
                {languageOptions.find(opt => opt.value === i18n.language)?.flag}
              </span>
            </div>
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-500">{t('welcome_back')}</p>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.email}</p>
                      <p className="text-xs text-gray-500">{t('signed_in')}</p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiUser className="mr-3" />
                      {t('view_profile')}
                    </Link>
                    
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                    >
                      <FiLogOut className="mr-3" />
                      {t('sign_out')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <FiLogIn className="mr-2" />
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FiUserPlus className="mr-2" />
                  {t('register')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                onClick={() => setMenuOpen(false)}
              >
                <FiHome className="mr-3" />
                {t('home')}
              </Link>
              {!user && (
                <Link
                  to="/favourites"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiHeart className="mr-3" />
                  {t('favourites')}{favouritesCount > 0 ? ` (${favouritesCount})` : ''}
                </Link>
              )}
              {/* Language Switcher for mobile */}
              <div className="mt-4 relative">
                <select
                  value={i18n.language}
                  onChange={e => i18n.changeLanguage(e.target.value)}
                  className="appearance-none pl-8 pr-6 py-1 rounded border border-gray-300 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm hover:border-blue-400 transition-all duration-150 w-full"
                  style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill=\'gray\' height=\'20\' viewBox=\'0 0 20 20\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5H7z\'/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.25em' }}
                >
                  {languageOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.flag} {opt.label}
                    </option>
                  ))}
                </select>
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-lg">
                  {languageOptions.find(opt => opt.value === i18n.language)?.flag}
                </span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
