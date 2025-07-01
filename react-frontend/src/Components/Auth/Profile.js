import { useState } from "react";
import apiService from '../../Services/apiService';

export default function Profile({ user }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleAddProject = () => {
    if (projects.length >= 3) {
      alert("Maximum 3 projects allowed.");
      return;
    }
    setProjects([
      ...projects,
      {
        id: Date.now(),
        project_name: "",
        description: "",
        status: 1,
        date_start: "",
        date_end: "",
        image: null,
        video: null
      }
    ]);
  };

  const handleChangeProject = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleFileChange = (index, field, file) => {
    const updated = [...projects];
    updated[index][field] = file;
    setProjects(updated);
  };

  const handleRemoveProject = (index) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };


  const handleSubmitProjects = () => {
    const formData = new FormData();
    formData.append("service_provider_id", user.service_provider_id);
  
    projects.forEach((proj, index) => {
      formData.append(`projects[${index}][project_name]`, proj.project_name);
      formData.append(`projects[${index}][description]`, proj.description);
      formData.append(`projects[${index}][status]`, proj.status);
      formData.append(`projects[${index}][date_start]`, proj.date_start);
      formData.append(`projects[${index}][date_end]`, proj.date_end);
      if (proj.image) {
        formData.append(`projects[${index}][image]`, proj.image);
      }
      if (proj.video) {
        formData.append(`projects[${index}][video]`, proj.video);
      }
    });
  
    apiService.createProjects(formData)
      .then(() => {
        setErrors([]);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          const errMsgs = [];
          Object.entries(err.response.data.errors).forEach(([key, messages]) => {
            messages.forEach((msg) => errMsgs.push(msg));
          });
          setErrors(errMsgs);
        } else {
          setErrors(["An unexpected error occurred."]);
        }
      });
  };

  return (
    <>
      <div className="shadow-lg bg-white p-4 rounded-lg flex flex-wrap gap-2">
        {["profile", "projects", "password", "settings"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium cursor-pointer ${activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "profile" && "Business Profile"}
            {tab === "projects" && "Projects"}
            {tab === "password" && "Password"}
            {tab === "settings" && "Settings"}
          </button>
        ))}
      </div>

      {errors.length > 0 && (
      <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded mb-2 mt-4">
        <ul className="list-disc list-inside text-xs">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
    )}

      <div className="text-sm text-gray-700 bg-white p-6 rounded-lg shadow-lg mt-5">
        {activeTab === "profile" && (
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-sm">Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full border border-gray-300 rounded p-2 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full border border-gray-300 rounded p-2 text-sm"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">City</label>
              <select className="w-full border border-gray-300 rounded p-2 text-sm">
                <option value="">Select City</option>
                <option>Sofia</option>
                <option>Plovdiv</option>
                <option>Varna</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Category</label>
              <select className="w-full border border-gray-300 rounded p-2 text-sm">
                <option value="">Select Category</option>
                <option>Cleaning</option>
                <option>Electrician</option>
                <option>Plumbing</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Subcategory</label>
              <select className="w-full border border-gray-300 rounded p-2 text-sm">
                <option value="">Select Subcategory</option>
                <option>Deep Cleaning</option>
                <option>Installation</option>
                <option>Repair</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Save Profile
              </button>
            </div>
          </form>
        )}

        {activeTab === "projects" && (
          <div className="space-y-4">
            {projects.map((proj, index) => (
              <div key={proj.id} className="border rounded p-3 space-y-2">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={proj.project_name}
                  onChange={(e) =>
                    handleChangeProject(index, "project_name", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />
                <textarea
                  placeholder="Description"
                  value={proj.description}
                  onChange={(e) =>
                    handleChangeProject(index, "description", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="datetime-local"
                    value={proj.date_start}
                    onChange={(e) =>
                      handleChangeProject(index, "date_start", e.target.value)
                    }
                    className="w-1/2 border border-gray-300 rounded p-2 text-sm"
                  />
                  <input
                    type="datetime-local"
                    value={proj.date_end}
                    onChange={(e) =>
                      handleChangeProject(index, "date_end", e.target.value)
                    }
                    className="w-1/2 border border-gray-300 rounded p-2 text-sm"
                  />
                </div>
                <select
                  value={proj.status}
                  onChange={(e) =>
                    handleChangeProject(index, "status", parseInt(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>

                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1">
                    <label className="block mb-1 font-medium text-xs">
                      Project Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange(index, "image", e.target.files[0])
                      }
                      className="w-full text-xs"
                    />
                    {proj.image && (
                      <p className="text-gray-500 text-xs mt-1">
                        Selected: {proj.image.name}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block mb-1 font-medium text-xs">
                      Project Video
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        handleFileChange(index, "video", e.target.files[0])
                      }
                      className="w-full text-xs"
                    />
                    {proj.video && (
                      <p className="text-gray-500 text-xs mt-1">
                        Selected: {proj.video.name}
                      </p>
                    )}
                  </div>
                </div>


                <button
                  type="button"
                  onClick={() => handleRemoveProject(index)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            {projects.length < 3 && (
              <button
                type="button"
                onClick={handleAddProject}
                className="bg-green-600 text-white p-3 mr-2 rounded hover:bg-green-700 cursor-pointer"
              >
                Add Project
              </button>
            )}

            {projects.length > 0 && (
              <button
                type="button"
                onClick={handleSubmitProjects}
              className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 cursor-pointer"
              >
                Submit Projects
              </button>
            )}
          </div>
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
    </>
  );
}
