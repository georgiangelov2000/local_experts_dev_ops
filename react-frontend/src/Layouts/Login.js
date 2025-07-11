import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useAuth } from "../Context/AuthContext";
import { useLoginForm } from "../Models/useLoginForm";

export default function Login() {
  const { user, authChecked, login } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const { register, handleSubmit, errors, reset } = useLoginForm();

  useEffect(() => {
    if (authChecked && user) {
      navigate("/profile");
    }
  }, [authChecked, user, navigate]);

  const onSubmit = async (data) => {
    setSubmitError("");
    try {
      await login(data);
      navigate("/profile");
    } catch (err) {
      setSubmitError("Invalid credentials");
    }
  };


  if (!authChecked) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 w-full max-w-sm rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="mb-4 relative">
            <FiMail style={{ left: '18px' }} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              {...register("email")} 
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="mb-4 relative">
            <FiLock style={{ left: '18px' }} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              {...register("password")} 
              placeholder="Password" 
              type="password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2   hover:bg-blue-700 transition cursor-pointer">
            Sign In
          </button>
          {submitError && <p className="text-red-500">{submitError}</p>}
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
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">← Forgot password</Link>
        </div>

      </div>
    </div>
  );
}
