import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import apiService from '../Services/apiService';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
  
    apiService.login(formData)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        navigate('/profile');
      })
      .catch((err) => {
        const serverMessage = err.response?.data?.error || "Something went wrong.";
        setError(serverMessage);
      });
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 w-full max-w-sm rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to your account</p>

        {error && (
          <div className="mb-4 text-red-600 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <FiMail style={{ left: '18px' }} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <FiLock style={{ left: '18px' }} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2   hover:bg-blue-700 transition cursor-pointer"
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

        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:underline text-sm">← Go back to Home</Link>
        </div>
      </div>
    </div>
  );
}
