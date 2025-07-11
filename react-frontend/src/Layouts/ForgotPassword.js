import SEO from '../Components/Auth/Shared/SEO';
import { useState, useEffect } from 'react';
import { useForgotPasswordForm } from "../Models/useForgotPasswordForm";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import apiService from "../Services/apiService";

export default function ForgotPassword() {
  const { user, authChecked } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForgotPasswordForm();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authChecked && user) {
      navigate("/profile");
    }
  }, [authChecked, user, navigate]);

  const onSubmit = (data) => {
    setLoading(true);
    setStatus("");

    apiService.forgotPassword(data)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"))
      .finally(() => setLoading(false));
  };

  if (!authChecked) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <SEO
        title="Forgot Password - Local Experts"
        description="Reset your Local Experts account password. Enter your email to receive a reset link."
        url="https://yourdomain.com/forgot-password"
        image="https://yourdomain.com/og-image.jpg"
      />
      <div className="bg-white p-6 w-full max-w-sm rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-2">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-6">Enter your email to reset your password</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register("email")}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 transition cursor-pointer"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          {status === 'success' && (
            <div className="mt-4 text-green-600 text-sm text-center">
              Check your email for the reset link.
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 text-red-600 text-sm text-center">
              Something went wrong. Please try again.
            </div>
          )}
        </form>

        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:underline text-sm">← Go back to Home</Link>
        </div>
      </div>
    </div>
  );
}
