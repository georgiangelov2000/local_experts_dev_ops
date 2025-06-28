import { Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white  p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to your account</p>

        <form>
          <div className="mb-4 relative">
          <FiMail
              className="absolute top-1/2 transform -translate-y-1/2 text-gray-400"
              style={{ left: '18px' }}  // Or whatever value you want
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <FiLock 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              style={{ left: '18px' }}  // Or whatever value you want
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
