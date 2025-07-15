import SEO from '../Components/Auth/Shared/SEO';
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, forwardRef } from 'react';
import apiService from '../Services/apiService';
import { FiMail, FiLock, FiKey, FiBriefcase } from 'react-icons/fi';
import { FaFacebook } from 'react-icons/fa';
import { useRegisterForm } from "../Models/useRegisterForm";
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';

// FloatingInput component for modern floating label input fields
const FloatingInput = forwardRef(({ icon, label, error, ...props }, ref) => (
  <div className="relative">
    <input
      ref={ref}
      {...props}
      className={`peer block w-full rounded-lg border border-gray-300 bg-transparent px-4 pt-5 pb-2 text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200 ${error ? 'border-red-400' : ''}`}
      placeholder=" "
    />
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</span>
    <label className="absolute left-10 top-2 text-gray-500 text-sm font-medium pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
      {label}
    </label>
    {error && <p className="text-red-500 text-xs mt-1 ml-1">{error.message}</p>}
  </div>
));

FloatingInput.displayName = 'FloatingInput';

export default function Register() {
  const [tab, setTab] = useState('user');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [categories, setCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [loadingServiceCategories, setLoadingServiceCategories] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const socialPopupRef = useRef(null);

  const { t } = useTranslation();

  // Use the correct form hook for each tab
  const userForm = useRegisterForm('user');
  const providerForm = useRegisterForm('provider');

  useEffect(() => {
    apiService.getCategories().then(res => {
      setCategories(res.data);
    });
  }, []);

  const handleCategoryChange = (e) => {
    const catId = providerForm.control._formValues.category;
    if (catId) {
      setLoadingServiceCategories(true);
      apiService.getCategoryById(catId)
        .then(res => {
          setServiceCategories(res.data);
        })
        .finally(() => setLoadingServiceCategories(false));
    } else {
      setServiceCategories([]);
    }
  };

  const handleTab = (tabName) => {
    setTab(tabName);
    setMessage({ text: '', type: '' });
    userForm.reset();
    providerForm.reset();
  };

  const onSubmitUser = (data) => {
    apiService.register({ ...data, type: 3 })
      .then((res) => {
        setMessage({ text: res.data.message || t('registration_successful'), type: "success" });
        userForm.reset();
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || t('registration_failed');
        setMessage({ text: errorMsg, type: "error" });
      });
  };

  const onSubmitProvider = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value ?? '');
      }
    });
    formData.append('type', 2);
    apiService.register(formData, true)
      .then((res) => {
        setMessage({ text: res.data.message || t('registration_successful'), type: "success" });
        providerForm.reset();
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || t('registration_failed');
        setMessage({ text: errorMsg, type: "error" });
      });
  };

  const handleSocialRegister = (provider) => {
    setSocialLoading(true);
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const url = `http://localhost:8000/api/v1/auth/${provider}/redirect`;
    const popup = window.open(url, 'socialLogin', `width=${width},height=${height},left=${left},top=${top}`);
    socialPopupRef.current = popup;
    const handleMessage = (event) => {
      if (event.origin !== 'http://localhost:8000') return;
      const { email_exists, profile, error } = event.data;
      setSocialLoading(false);
      if (email_exists) {
        setMessage({ text: error || t('email_already_registered'), type: 'error' });
      } else if (profile) {
        setTab('user');
        userForm.reset({
          username: profile.name || '',
          email: profile.email || '',
        });
        setMessage({ text: t('social_profile_loaded'), type: 'success' });
      }
      window.removeEventListener('message', handleMessage);
      if (socialPopupRef.current) socialPopupRef.current.close();
    };
    window.addEventListener('message', handleMessage);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <SEO
        title={t('register_title')}
        description={t('register_description')}
        url="https://yourdomain.com/register"
        image="https://yourdomain.com/og-image.jpg"
      />
      <div className="bg-white w-full max-w-2xl rounded-sm shadow-xl border border-gray-100 p-0 md:p-10 transition-all duration-300">
        <div className="flex justify-center mb-6 mt-6">
          <button
            className={`flex-1 py-3 px-2 rounded-l-xl text-lg font-semibold transition-all duration-200 ${tab === 'user' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}
            onClick={() => handleTab('user')}
            type="button"
            aria-selected={tab === 'user'}
          >
            {t('registerAsUser')}
          </button>
          <button
            className={`flex-1 py-3 px-2 rounded-r-xl text-lg font-semibold transition-all duration-200 ${tab === 'provider' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}
            onClick={() => handleTab('provider')}
            type="button"
            aria-selected={tab === 'provider'}
          >
            {t('registerAsProvider')}
          </button>
        </div>
        {message.text && (
          <div className={`mb-4 p-3 text-sm rounded-lg font-medium text-center ${message.type === 'success'
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
            {message.text}
          </div>
        )}
        <div className="px-4 md:px-0 pb-8">
          {tab === 'user' && (
            <form onSubmit={userForm.handleSubmit(onSubmitUser)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <FloatingInput
                  icon={<FiMail />}
                  label={t('email_placeholder')}
                  placeholder={t('email_placeholder')}
                  error={userForm.errors.email}
                  {...userForm.register('email')}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <FloatingInput
                  icon={<FiLock />}
                  label={t('password')}
                  placeholder={t('password_placeholder')}
                  type="password"
                  error={userForm.errors.password}
                  {...userForm.register('password')}
                />
                <FloatingInput
                  icon={<FiKey />}
                  label={t('confirm_password_placeholder')}
                  placeholder={t('confirm_password_placeholder')}
                  type="password"
                  error={userForm.errors.confirm_password}
                  {...userForm.register('confirm_password')}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md mt-4 cursor-pointer"
              >
                {t('submit')}
              </button>
            </form>
          )}
          {tab === 'provider' && (
            <form onSubmit={providerForm.handleSubmit(onSubmitProvider)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  icon={<FiBriefcase />}
                  label={t('business_name_placeholder')}
                  placeholder={t('business_name_placeholder')}
                  error={providerForm.errors.business_name}
                  {...providerForm.register('business_name')}
                />
                <FloatingInput
                  icon={<FiMail />}
                  label={t('email_placeholder')}
                  placeholder={t('email_placeholder')}
                  error={providerForm.errors.email}
                  {...providerForm.register('email')}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  icon={<FiLock />}
                  label={t('password_placeholder')}
                  placeholder={t('password_placeholder')}
                  type="password"
                  error={providerForm.errors.password}
                  {...providerForm.register('password')}
                />
                <FloatingInput
                  icon={<FiKey />}
                  label={t('confirm_password_placeholder')}
                  placeholder={t('confirm_password_placeholder')}
                  type="password"
                  error={providerForm.errors.confirm_password}
                  {...providerForm.register('confirm_password')}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900">{t('category')}</label>
                <select
                  {...providerForm.register("category")}
                  className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5 rounded-lg"
                  defaultValue=""
                  onChange={e => {
                    providerForm.register("category").onChange(e);
                    handleCategoryChange(e);
                  }}
                >
                  <option value="">{t('select_category')}</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {providerForm.errors.category && <p className="text-red-500 text-xs mt-1">{providerForm.errors.category.message}</p>}
              </div>
              {providerForm.control._formValues.category && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900">{t('select_service_type')}</label>
                  <select
                    {...providerForm.register("service_category_id")}
                    className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5 rounded-lg"
                    defaultValue=""
                    disabled={loadingServiceCategories}
                  >
                    <option value="">{loadingServiceCategories ? t('loading') : t('select_service_type')}</option>
                    {serviceCategories.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                  {providerForm.errors.service_category_id && <p className="text-red-500 text-xs mt-1">{providerForm.errors.service_category_id.message}</p>}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md mt-4 cursor-pointer"
              >
                {t('submit')}
              </button>
            </form>
          )}
          <div className="my-8 flex items-center justify-center">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="px-4 text-gray-400 text-sm font-medium">{t('or_sign_up_with')}</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center">
            <button
              type="button"
              onClick={() => handleSocialRegister('google')}
              className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 shadow-sm"
              disabled={socialLoading}
            >
              <FcGoogle className="text-xl" />
              {t('continue_with_google')}
            </button>
            <button
              type="button"
              onClick={() => handleSocialRegister('facebook')}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 shadow-sm"
              disabled={socialLoading}
            >
              <FaFacebook className="text-xl" />
              {t('continue_with_meta')}
            </button>
          </div>
          {socialLoading && <div className="text-center text-blue-600 mt-2">{t('loading_social_profile')}</div>}
          <div className="mt-6 text-center">
            <Link to="/" className="text-blue-600 hover:underline text-sm">← {t('go_back_to_home')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
