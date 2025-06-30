import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import apiService from '../Services/apiService';
import { FiMail, FiLock, FiKey } from 'react-icons/fi';

export default function Register() {
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setMessage({ text: "Passwords do not match", type: "error" });
      return;
    }

    apiService.register(formData)
      .then((res) => {
        setMessage({
          text: res.data.message || "Registration successful!",
          type: "success"
        });
      })
      .catch((err) => {
        console.error("Registration error", err);
        const errorMsg = err.response?.data?.message || "Registration failed.";
        setMessage({ text: errorMsg, type: "error" });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white p-6 w-full max-w-lg rounded-lg">
        <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-800">Register</h2>

        {message.text && (
          <div className={`mb-4 p-2 text-sm rounded ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiMail /></span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiLock /></span>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiKey /></span>
              <input
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="pl-10 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white rounded-lg p-2.5 hover:bg-blue-800"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:underline text-sm">← Go back to Home</Link>
        </div>
      </div>
    </div>
  );
}
