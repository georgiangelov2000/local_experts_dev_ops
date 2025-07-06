import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import apiService from '../Services/apiService';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [status, setStatus] = useState('');

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    apiService.resetPassword({
      email,
      token,
      password,
      password_confirmation: passwordConfirmation
    })
      .then(() => {
        setStatus('success');
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch(() => {
        setStatus('error');
      });
  };

  if (!token || !email) {
    return <div className="text-center mt-10 text-red-600">Invalid reset link.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 w-full max-w-sm rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 transition cursor-pointer"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-green-600 text-sm text-center">
            Password reset successful! Redirecting to login...
          </p>
        )}

        {status === 'error' && (
          <p className="mt-4 text-red-600 text-sm text-center">
            Reset failed. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
