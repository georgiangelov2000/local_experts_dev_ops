import { useState } from "react";
import { FiUser, FiLock, FiSettings, FiLogOut } from "react-icons/fi";

export default function Profile({ user }) {
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    // Добави реална логика за logout тук
    alert("Logged out!");
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>

      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <FiUser className="text-5xl text-gray-500" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-center">{user?.name || "John Doe"}</h3>
      <p className="text-gray-600 mb-4 text-center">{user?.email || "johndoe@example.com"}</p>

      {/* Tabs */}
      <div className="flex justify-center space-x-2 border-b mb-4">
        {["profile", "password", "settings", "logout"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-3 text-sm font-medium ${
              activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
            }`}
            onClick={() => {
              if (tab === "logout") {
                handleLogout();
              } else {
                setActiveTab(tab);
              }
            }}
          >
            {tab === "profile" && "Profile"}
            {tab === "password" && "Password"}
            {tab === "settings" && "Settings"}
            {tab === "logout" && "Log Out"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="text-sm text-gray-700">
        {activeTab === "profile" && (
          <form className="space-y-2">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Save Profile
            </button>
          </form>
        )}

        {activeTab === "password" && (
          <form className="space-y-2">
            <div>
              <label className="block mb-1 font-medium">Current Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">New Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Confirm New Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Change Password
            </button>
          </form>
        )}

        {activeTab === "settings" && (
          <form className="space-y-2">
            <div>
              <label className="block mb-1 font-medium">Notification Preferences</label>
              <select className="w-full border border-gray-300 rounded p-2">
                <option>Email Only</option>
                <option>SMS Only</option>
                <option>Email & SMS</option>
                <option>None</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Language</label>
              <select className="w-full border border-gray-300 rounded p-2">
                <option>English</option>
                <option>Bulgarian</option>
                <option>German</option>
              </select>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Save Settings
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
