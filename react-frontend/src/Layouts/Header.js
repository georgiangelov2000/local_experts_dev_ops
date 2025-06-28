import { Link } from 'react-router-dom';
import { FiLogIn, FiUserPlus, FiHeart, FiHome } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">Local Experts</span>
      </div>

      <nav className="flex items-center space-x-4">
        <Link
          to="/"
          className="flex items-center px-3 py-1 text-sm font-medium border border-white rounded hover:bg-white hover:text-blue-600 transition"
        >
          <FiHome className="mr-1" />
          Home
        </Link>

        <Link
          to="/favourites"
          className="flex items-center px-3 py-1 text-sm font-medium border border-white rounded hover:bg-white hover:text-blue-600 transition"
        >
          <FiHeart className="mr-1" />
          Favourites
        </Link>

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
      </nav>
    </header>
  );
}
