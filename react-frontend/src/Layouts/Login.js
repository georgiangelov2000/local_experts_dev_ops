import SEO from '../Components/Auth/Shared/SEO';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useAuth } from "../Context/AuthContext";
import { useLoginForm } from "../Models/useLoginForm";
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { user, authChecked, login } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const { register, handleSubmit, errors, reset } = useLoginForm();
  const { t } = useTranslation();

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
      <SEO
        title="Login - Local Experts"
        description="Sign in to your Local Experts account to manage your profile and connect with providers."
        url="https://yourdomain.com/login"
        image="https://yourdomain.com/og-image.jpg"
      />
      <div className="bg-white p-6 w-full max-w-sm rounded-sm shadow-sm">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">{t('login')}</h2>

        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="mb-4 relative">
            <FiMail style={{ left: '18px' }} className="absolute left-3 top-1/2 transform text-gray-400" />
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              {t('email')}
            </label>
            <input
              {...register("email")} 
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="mb-4 relative">
            <FiLock style={{ left: '18px' }} className="absolute left-3 top-1/2 transform text-gray-400" />
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              {t('password')}
            </label>
            <input
              {...register("password")} 
              placeholder="Password" 
              type="password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md mt-4 cursor-pointer"
          >
            {t('submit')}
          </button>
          {submitError && <p className="text-red-500">{submitError}</p>}
        </form>

        <div className="flex justify-between items-center mt-6 flex-wrap text-sm">
          <Link to="/" className="text-blue-600 hover:underline flex items-center">
            {t('go_back_home')}
          </Link>
          <Link to="/forgot-password" className="text-blue-600 hover:underline flex items-center">
            {t('forgot_password')}
          </Link>
        </div>
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">{t('dont_have_account')}</span>{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            {t('sign_up')}
          </Link>
        </div>

      </div>
    </div>
  );
}
