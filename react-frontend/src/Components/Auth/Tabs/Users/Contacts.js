import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaGlobe } from 'react-icons/fa';

export default function Contacts({ user }) {
  const [contacts, setContacts] = useState(user.contacts);

  const handleChange = (index, field, value) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  };

  const handleSubmit = (index) => {
    const updatedContact = contacts[index];
    console.log('Updating contact:', updatedContact);
    // TODO: Replace with actual API call
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg space-y-8">
      {/* Profile Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.name} 👋</h1>
          <p className="text-sm text-gray-500">Manage your contact details below</p>
        </div>
        <img
          src="https://via.placeholder.com/80"
          alt="Profile avatar"
          className="w-20 h-20 rounded-full object-cover border shadow"
        />
      </div>

      {/* Contacts List */}
      <div className="space-y-6">
        {contacts.map((contact, index) => (
          <div key={contact.id} className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Contact #{index + 1}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Phone</label>
                <input
                  type="text"
                  value={contact.phone}
                  onChange={(e) => handleChange(index, 'phone', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                  placeholder="+359..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => handleChange(index, 'email', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Facebook</label>
                <input
                  type="text"
                  value={contact.facebook}
                  onChange={(e) => handleChange(index, 'facebook', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Instagram</label>
                <input
                  type="text"
                  value={contact.instagram}
                  onChange={(e) => handleChange(index, 'instagram', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600">Website</label>
                <input
                  type="text"
                  value={contact.website}
                  onChange={(e) => handleChange(index, 'website', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                />
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={() => handleSubmit(index)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
