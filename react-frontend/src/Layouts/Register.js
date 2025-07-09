import { Link } from "react-router-dom";
import { useState } from 'react';

import apiService from '../Services/apiService';
import { FiMail, FiLock, FiKey } from 'react-icons/fi';
import { useRegisterForm } from "../Models/useRegisterForm";

export default function Register() {
  const [message, setMessage] = useState({ text: '', type: '' });
  const { register, handleSubmit, errors, reset } = useRegisterForm();

  const onSubmit = (data) => {
    apiService.register(data)
      .then((res) => {
        setMessage({
          text: res.data.message || "Registration successful!",
          type: "success"
        });
        reset();
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">Username</label>
            <input
              {...register("username")}
              placeholder="Enter your username"
              className="border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiMail /></span>
              <input
                {...register("email")}
                placeholder="Enter your email"
                className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiLock /></span>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiKey /></span>
              <input
                {...register("confirm_password")}
                type="password"
                placeholder="Confirm your password"
                className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
              />
            </div>
            {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">Type</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><FiKey /></span>
              <select
                {...register("type")}
                className="pl-10 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
              >
                <option value="" disabled>Select user type</option>
                <option value="2">Expert</option>
                <option value="3">User</option>
              </select>
            </div>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-2.5 hover:bg-blue-800 cursor-pointer"
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
