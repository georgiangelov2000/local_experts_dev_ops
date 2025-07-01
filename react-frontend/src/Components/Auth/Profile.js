import { useState } from "react";
import apiService from '../../Services/apiService';
import { FiSave, FiEye, FiUser, FiFolder, FiLock, FiSettings, FiBarChart2, FiMessageSquare, FiStar, FiBriefcase } from "react-icons/fi";
import ProfileTab from "./Tabs/ProfileTab";
import ProjectsTab from "./Tabs/ProjectsTab";
import ServicesTab from "./Tabs/ServicesTab";
import PasswordTab from "./Tabs/PasswordTab";
import SettingsTab from "./Tabs/SettingsTab";
import StaticsTab from "./Tabs/StaticsTab";

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
        {["profile", "projects", "password", "settings", "statics", "services"].map((tab) => (
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
            {tab === "services" && <><FiBriefcase className="text-base" /> Services</>}
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
        {activeTab === "profile" && <ProfileTab user={user} />}
        {activeTab === "projects" && (
          <ProjectsTab
            projects={projects}
            onChange={handleChangeProject}
            onAdd={handleAddProject}
            onRemove={handleRemoveProject}
            onFileChange={handleFileChange}
          />
        )}
        {activeTab === "services" && <ServicesTab />}
        {activeTab === "password" && <PasswordTab />}
        {activeTab === "settings" && <SettingsTab />}
        {activeTab === "statics" && <StaticsTab />}
      </div>

      <div className="text-sm flex justify-start mt-5 mb-5">
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
    </>
  );
}
