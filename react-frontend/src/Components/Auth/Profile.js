import { useState } from "react";
import apiService from '../../Services/apiService';
import { FiSave, FiEye, FiUser, FiFolder, FiLock, FiSettings, FiBarChart2, FiMessageSquare, FiStar } from "react-icons/fi";

export default function Profile({ user }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [projects, setProjects] = useState([
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

  const handlePreview = () => {
    console.log("Preview data:", { projects });
    alert("Check console for preview");
  };

  const handleSubmitAll = () => {
    const formData = new FormData();
    formData.append("service_provider_id", user.service_provider_id);

    // Добавяне на проекти
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

    // Изпращане към API
    apiService.createProjects(formData)
      .then(() => {
        setErrors([]);
        alert("Profile saved successfully!");
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
      <div className="text-sm text-gray-700 bg-white p-6 rounded-lg shadow-lg mb-5 space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Username:</span>
          <span className="text-gray-600">john_doe</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Created At:</span>
          <span className="text-gray-600">2024-07-01 10:30</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Expired Service:</span>
          <span className="text-red-500">Yes</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Category:</span>
          <span className="text-gray-600">Cleaning</span>
        </div>
      </div>

      <div className="shadow-lg bg-white p-4 rounded-lg flex flex-wrap gap-2">
        {["profile", "projects", "password", "settings", "statics"].map((tab) => (
          <button
            key={tab}
            className={`flex items-center gap-1 py-2 px-4 text-sm font-medium cursor-pointer ${activeTab === tab
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "profile" && (
              <>
                <FiUser className="text-base" />
                Business Profile
              </>
            )}
            {tab === "projects" && (
              <>
                <FiFolder className="text-base" />
                Projects
              </>
            )}
            {tab === "password" && (
              <>
                <FiLock className="text-base" />
                Password
              </>
            )}
            {tab === "settings" && (
              <>
                <FiSettings className="text-base" />
                Settings
              </>
            )}
            {tab === "statics" && (
              <>
                <FiBarChart2 className="text-base" />
                Statics
              </>
            )}
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
          </form>
        )}

        {activeTab === "statics" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded flex items-center gap-3">
              <FiEye className="text-2xl text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Total Views</p>
                <p className="text-xl font-bold">1,250</p>
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded flex items-center gap-3">
              <FiMessageSquare className="text-2xl text-green-600" />
              <div>
                <p className="text-xs text-gray-500">Reviews Received</p>
                <p className="text-xl font-bold">48</p>
              </div>
            </div>
            <div className="bg-yellow-100 p-4 rounded flex items-center gap-3">
              <FiStar className="text-2xl text-yellow-600" />
              <div>
                <p className="text-xs text-gray-500">Average Rating</p>
                <p className="text-xl font-bold">4.7 / 5</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-700 bg-white p-6 rounded-lg shadow-lg mt-5">
        <div className="flex justify-start">
          <button
            onClick={handleSubmitAll}
            className="flex items-center gap-1 text-white py-2 px-4 mr-2 cursor-pointer"
            style={{
              backgroundColor: 'oklch(0.373 0.034 259.733)',
            }}
          >
            <FiSave /> Save Profile
          </button>

          <button
            onClick={handlePreview}
            className="flex items-center gap-1 bg-gray-500 text-white py-2 px-4 hover:bg-gray-600 cursor-pointer"
          >
            <FiEye /> Preview
          </button>

        </div>
      </div>
    </>
  );
}
