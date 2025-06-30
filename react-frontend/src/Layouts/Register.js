import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import apiService from '../Services/apiService';
import { FiMail, FiPhone, FiGlobe, FiLock, FiKey } from 'react-icons/fi';

export default function Register() {
  const [categories, setCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [formData, setFormData] = useState({
    business_name: '',
    email: '',
    phone: '',
    website: '',
    category_id: '',
    service_category_id: '',
    password: '',
    confirm_password: ''
  });

  useEffect(() => {
    apiService.getCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(err => console.error('Error loading categories', err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      apiService.getCategoryById(selectedCategory)
        .then(response => {
          setServiceCategories(response.data);
        })
        .catch(err => console.error('Error loading service categories', err));
    } else {
      setServiceCategories([]);
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    apiService.post('/register', formData)
      .then(() => {
        alert("Registration successful!");
        // Optionally reset or redirect
      })
      .catch(err => {
        console.error("Registration error", err);
        alert("Registration failed.");
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white p-6 w-full max-w-4xl rounded-lg">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Business Name</label>
              <input
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiMail /></span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiPhone /></span>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Website</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiGlobe /></span>
                <input
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  className="pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={(e) => {
                  handleChange(e);
                  setSelectedCategory(e.target.value);
                }}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Service Category</label>
              <select
                name="service_category_id"
                value={formData.service_category_id}
                onChange={handleChange}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="">Select service category</option>
                {serviceCategories.map(sc => (
                  <option key={sc.id} value={sc.id}>{sc.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiLock /></span>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiKey /></span>
              <input
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white rounded-lg p-2.5 hover:bg-blue-800"
          >
            Submit
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-500 mb-2">Or sign up with</p>
          <div className="flex justify-center space-x-4">
            <button className="border rounded-lg p-2 text-sm hover:bg-gray-100">Google</button>
            <button className="border rounded-lg p-2 text-sm hover:bg-gray-100">Facebook</button>
            <button className="border rounded-lg p-2 text-sm hover:bg-gray-100">Twitter</button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:underline text-sm">← Go back to Home</Link>
        </div>
      </div>
    </div>
  );
}
