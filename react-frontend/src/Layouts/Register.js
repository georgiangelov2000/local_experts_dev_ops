import SEO from '../Components/Auth/Shared/SEO';
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import apiService from '../Services/apiService';
import { FiMail, FiLock, FiKey, FiUser, FiBriefcase, FiGlobe, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { useRegisterForm } from "../Models/useRegisterForm";
import { FcGoogle } from 'react-icons/fc';

export default function Register() {
  const [tab, setTab] = useState('user');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [categories, setCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [loadingServiceCategories, setLoadingServiceCategories] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const socialPopupRef = useRef(null);

  // Use the correct form hook for each tab
  const userForm = useRegisterForm('user');
  const providerForm = useRegisterForm('provider');

  // Fetch categories on mount
  useEffect(() => {
    apiService.getCategories().then(res => {
      setCategories(res.data);
    });
  }, []);

  // Fetch service categories when providerForm category changes
  const handleCategoryChange = (e) => {
    const catId = providerForm.control._formValues.category;
    console.log(providerForm.control._formValues.category);
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

  // Reset messages and errors on tab switch
  const handleTab = (tabName) => {
    setTab(tabName);
    setMessage({ text: '', type: '' });
    userForm.reset();
    providerForm.reset();
  };

  // File input handler for provider image
  const handleProviderImage = (e) => {
    providerForm.reset({
      ...providerForm.control._formValues,
      image: e.target.files[0]
    });
  };

  // Submission handlers
  const onSubmitUser = (data) => {
    apiService.register({ ...data, type: 3 })
      .then((res) => {
        setMessage({ text: res.data.message || "Registration successful!", type: "success" });
        userForm.reset();
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || "Registration failed.";
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
        setMessage({ text: res.data.message || "Registration successful!", type: "success" });
        providerForm.reset();
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || "Registration failed.";
        setMessage({ text: errorMsg, type: "error" });
      });
  };

  // Social login handler
  const handleSocialRegister = (provider) => {
    setSocialLoading(true);
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const url = `http://localhost:8000/api/v1/auth/${provider}/redirect`;
    const popup = window.open(url, 'socialLogin', `width=${width},height=${height},left=${left},top=${top}`);
    socialPopupRef.current = popup;

    // Listen for message from popup
    const handleMessage = (event) => {
      if (event.origin !== 'http://localhost:8000') return;
      const { email_exists, profile, error } = event.data;
      setSocialLoading(false);
      if (email_exists) {
        setMessage({ text: error || 'Email already registered. Please log in.', type: 'error' });
      } else if (profile) {
        setTab('user');
        userForm.reset({
          username: profile.name || '',
          email: profile.email || '',
        });
        setMessage({ text: 'Social profile loaded. Please complete your registration.', type: 'success' });
      }
      window.removeEventListener('message', handleMessage);
      if (socialPopupRef.current) socialPopupRef.current.close();
    };
    window.addEventListener('message', handleMessage);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-blue-50 via-white to-indigo-100 animate-fadein">
      <SEO
        title="Register - Local Experts"
        description="Create your account to find and connect with trusted local service providers."
        url="https://yourdomain.com/register"
        image="https://yourdomain.com/og-image.jpg"
      />
      <div className="bg-white p-8 w-full max-w-4xl rounded-2xl shadow-xl border border-gray-200 transition-all duration-300">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">Register</h2>
        <p className="text-center text-gray-500 mb-6 text-lg">Create your account to get started</p>
        <div className="flex mb-8 gap-2">

          <button
            className={`flex-1 p-3 rounded-t-lg border-b-4 transition-all duration-200 flex items-center justify-center gap-2 text-lg shadow-sm ${tab === 'user' ? 'border-blue-700 bg-blue-50 text-blue-700 font-bold' : 'border-gray-200 bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-700'}`} onClick={() => handleTab('user')}
            type="button"
          >
            Register as User
          </button>
          <button
            className={`flex-1 p-3 rounded-t-lg border-b-4 transition-all duration-200 flex items-center justify-center gap-2 text-lg shadow-sm ${tab === 'provider' ? 'border-blue-700 bg-blue-50 text-blue-700 font-bold' : 'border-gray-200 bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-700'}`}
            onClick={() => handleTab('provider')}
            type="button"
          >
            Register as Service Provider
          </button>
        </div>
        {message.text && (
          <div className={`mb-4 p-2 text-sm rounded ${message.type === 'success'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
            }`}>
            {message.text}
          </div>
        )}
        {tab === 'user' && (
          <form onSubmit={userForm.handleSubmit(onSubmitUser)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiUser /></span>
                <input
                  {...userForm.register("username")}
                  placeholder="Enter your username"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {userForm.errors.username && <p className="text-red-500 text-xs mt-1">{userForm.errors.username.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiMail /></span>
                <input
                  {...userForm.register("email")}
                  placeholder="Enter your email"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {userForm.errors.email && <p className="text-red-500 text-xs mt-1">{userForm.errors.email.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Website</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiGlobe /></span>
                <input
                  {...userForm.register("website")}
                  placeholder="Enter your website (optional)"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {userForm.errors.website && <p className="text-red-500 text-xs mt-1">{userForm.errors.website.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Phone</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiPhone /></span>
                <input
                  {...userForm.register("phone")}
                  placeholder="Enter your phone (optional)"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {userForm.errors.phone && <p className="text-red-500 text-xs mt-1">{userForm.errors.phone.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiMapPin /></span>
                <input
                  {...userForm.register("address")}
                  placeholder="Enter your address (optional)"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {userForm.errors.address && <p className="text-red-500 text-xs mt-1">{userForm.errors.address.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Facebook</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FaFacebook /></span>
                <input
                  {...userForm.register("facebook")}
                  placeholder="Enter your Facebook (optional)"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {userForm.errors.facebook && <p className="text-red-500 text-xs mt-1">{userForm.errors.facebook.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Instagram</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FaInstagram /></span>
                <input
                  {...userForm.register("instagram")}
                  placeholder="Enter your Instagram (optional)"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {userForm.errors.instagram && <p className="text-red-500 text-xs mt-1">{userForm.errors.instagram.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiLock /></span>
                <input
                  {...userForm.register("password")}
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {userForm.errors.password && <p className="text-red-500 text-xs mt-1">{userForm.errors.password.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Confirm Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiKey /></span>
                <input
                  {...userForm.register("confirm_password")}
                  type="password"
                  placeholder="Confirm your password"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {userForm.errors.confirm_password && <p className="text-red-500 text-xs mt-1">{userForm.errors.confirm_password.message}</p>}
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="bg-blue-700 text-white p-2.5 hover:bg-blue-800 cursor-pointer"
              >
                Register
              </button>
            </div>
          </form>
        )}
        {tab === 'provider' && (
          <form onSubmit={providerForm.handleSubmit(onSubmitProvider)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Business Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiBriefcase /></span>
                <input
                  {...providerForm.register("business_name")}
                  placeholder="Enter your business name"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {providerForm.errors.business_name && <p className="text-red-500 text-xs mt-1">{providerForm.errors.business_name.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiMail /></span>
                <input
                  {...providerForm.register("email")}
                  placeholder="Enter your email"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {providerForm.errors.email && <p className="text-red-500 text-xs mt-1">{providerForm.errors.email.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Website</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiGlobe /></span>
                <input
                  {...providerForm.register("website")}
                  placeholder="Enter your website (optional)"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {providerForm.errors.website && <p className="text-red-500 text-xs mt-1">{providerForm.errors.website.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Phone</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiPhone /></span>
                <input
                  {...providerForm.register("phone")}
                  placeholder="Enter your phone (optional)"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {providerForm.errors.phone && <p className="text-red-500 text-xs mt-1">{providerForm.errors.phone.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiMapPin /></span>
                <input
                  {...providerForm.register("address")}
                  placeholder="Enter your address (optional)"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {providerForm.errors.address && <p className="text-red-500 text-xs mt-1">{providerForm.errors.address.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Facebook</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FaFacebook /></span>
                <input
                  {...providerForm.register("facebook")}
                  placeholder="Enter your Facebook (optional)"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {providerForm.errors.facebook && <p className="text-red-500 text-xs mt-1">{providerForm.errors.facebook.message}</p>}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-900">Instagram</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FaInstagram /></span>
                <input
                  {...providerForm.register("instagram")}
                  placeholder="Enter your Instagram (optional)"
                  className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                />
              </div>
              {providerForm.errors.instagram && <p className="text-red-500 text-xs mt-1">{providerForm.errors.instagram.message}</p>}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Category</label>
              <select
                {...providerForm.register("category")}
                className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                defaultValue=""
                onChange={e => {
                  providerForm.register("category").onChange(e);
                  handleCategoryChange(e);
                }}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {providerForm.errors.category && <p className="text-red-500 text-xs mt-1">{providerForm.errors.category.message}</p>}
            </div>
            {providerForm.control._formValues.category && (
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-900">Service Category</label>
                <select
                  {...providerForm.register("service_category_id")}
                  className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                  defaultValue=""
                  disabled={loadingServiceCategories}
                >
                  <option value="">{loadingServiceCategories ? 'Loading...' : 'Select Service Category'}</option>
                  {serviceCategories.map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
                {providerForm.errors.service_category_id && <p className="text-red-500 text-xs mt-1">{providerForm.errors.service_category_id.message}</p>}
              </div>
            )}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Description</label>
              <textarea
                {...providerForm.register("description")}
                placeholder="Tell us more about your business..."
                className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                rows={3}
              ></textarea>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">Business Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  providerForm.register("image").onChange(e);
                  handleProviderImage(e);
                }}
                className="block border border-gray-300 text-gray-900 text-sm w-full p-2.5"
              />
              {providerForm.errors.image && <p className="text-red-500 text-xs mt-1">{providerForm.errors.image.message}</p>}
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="bg-blue-700 text-white p-2.5 hover:bg-blue-800 cursor-pointer"
              >
                Register
              </button>
            </div>
          </form>
        )}
        <div className="mt-4">
          <Link to="/" className="text-blue-600 hover:underline text-sm">← Go back to Home</Link>
        </div>
        <div className="mt-6">
          <hr className="my-4" />
          <p className="text-center text-sm text-gray-500 mb-3">Or sign up with</p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center">
            <button
              type="button"
              onClick={() => handleSocialRegister('google')}
              className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100 transition disabled:opacity-50"
              disabled={socialLoading}
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialRegister('facebook')}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
              disabled={socialLoading}
            >
              <FaFacebook className="text-xl" />
              Continue with Facebook
            </button>
          </div>
          {socialLoading && <div className="text-center text-blue-600 mt-2">Loading social profile...</div>}
        </div>
      </div>
    </div>
  );
}
