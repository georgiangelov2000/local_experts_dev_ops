import { useState, useEffect } from "react";
import apiService from '../../Services/apiService';
import { FiSave, FiUser, FiFolder, FiLock, FiBarChart2, FiBriefcase, FiFileText } from "react-icons/fi";
import ProfileTab from "./Tabs/ProfileTab";
import ProjectsTab from "./Tabs/ProjectsTab";
import ServicesTab from "./Tabs/ServicesTab";
import PasswordTab from "./Tabs/PasswordTab";
import StaticsTab from "./Tabs/StaticsTab";
import ContractsTab from "./Tabs/ContactsTab";
import { useProfileForm } from "../../Models/useProfileForm";


export default function Profile({ user }) {
  const { register, handleSubmit, fields, append, remove, errors } = useProfileForm(user);
  const [activeTab, setActiveTab] = useState("profile");
  const [apiMessage, setApiMessage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const onSubmit = async (data) => {
    try {
      const filteredProjects = data.projects.filter(
        (p) => p.project_name?.trim() !== ""
      );

      const filteredServices = (data.services || []).filter(
        (s) =>
          (s.price !== undefined && s.price !== "" && !isNaN(s.price)) ||
          (s.description && s.description.trim() !== "")
      );

      const formData = new FormData();

      formData.append("business_name", data.business_name);
      formData.append("email", data.email);
      formData.append("description", data.description);

      filteredProjects.forEach((proj, index) => {
        formData.append(`projects[${index}][project_name]`, proj.project_name);
        formData.append(`projects[${index}][description]`, proj.description);
        formData.append(`projects[${index}][date_start]`, proj.date_start || "");
        formData.append(`projects[${index}][date_end]`, proj.date_end || "");
        formData.append(`projects[${index}][status]`, proj.status ?? 1);

        if (proj.image?.length > 0) {
          formData.append(`projects[${index}][image]`, proj.image[0]);
        }
        if (proj.video?.length > 0) {
          formData.append(`projects[${index}][video]`, proj.video[0]);
        }
      });

      filteredServices.forEach((service, index) => {
        formData.append(`services[${index}][price]`, service.price ?? "");
        formData.append(`services[${index}][description]`, service.description ?? "");
      });

      const response = await apiService.profile(formData);

      console.log("Server response:", response.data);
      setApiMessage(response.data.message || "Profile updated successfully!");

    } catch (err) {
      console.error("Error submitting profile:", err);
      const message = err.response?.data?.message || "Something went wrong.";
      setApiMessage(message);
    }
  };


  useEffect(() => {
    apiService.getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => {
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      apiService.getCategoryById(selectedCategoryId)
        .then((res) => {
          setServiceCategories(res.data);
        })
        .catch(() => {
          setServiceCategories([]);
        });
    } else {
      setServiceCategories([]);
    }
  }, [selectedCategoryId]);



  return (
    <>
      {/* {user?.email_verified_at === null ? (
        <div className="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
          <svg className="flex-shrink-0 w-5 h-5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.257 3.099c.366-.446.957-.53 1.414-.184l.094.083 7 7c.39.39.39 1.024 0 1.414l-7 7c-.39.39-1.024.39-1.414 0l-7-7c-.39-.39-.39-1.024 0-1.414l7-7zm1.414 1.414L4.828 9.356l4.243 4.243 4.243-4.243-4.243-4.243z" />
          </svg>
          <span className="sr-only">Warning</span>
          <div>
            <span className="font-medium">Email not verified!</span> Please verify your email before managing your profile.
          </div>
        </div>

      ) : ( */}
      <>
        {apiMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-2 rounded mt-2">
            {apiMessage}
          </div>
        )}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiUser className="text-blue-600" /> Profile Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex justify-between border-b border-gray-300 pb-1">
              <span className="font-medium">Business Name:</span>
              <span className="text-gray-600">{user?.service_provider?.business_name || "N/A"}</span>
            </div>

            <div className="flex justify-between border-b border-gray-300 pb-1">
              <span className="font-medium">Category:</span>
              <span className="text-gray-600">{user?.service_provider?.category?.name || "N/A"}</span>
            </div>

            <div className="flex justify-between border-b border-gray-300 pb-1">
              <span className="font-medium">Service Category:</span>
              <span className="text-gray-600">{user?.service_provider?.service_category?.name || "N/A"}</span>
            </div>

            <div className="flex justify-between border-b border-gray-300 pb-1">
              <span className="font-medium">Start Time:</span>
              <span className="text-gray-600">
                {user?.service_provider?.start_time
                  ? new Date(user?.service_provider.start_time).toLocaleString()
                  : "N/A"}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-300 pb-1">
              <span className="font-medium">Stop Time:</span>
              <span className="text-gray-600">
                {user?.service_provider?.stop_time
                  ? new Date(user?.service_provider.stop_time).toLocaleString()
                  : "N/A"}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-300 pb-1">
              <span className="font-medium">Active Service:</span>
              <span className={
                user?.service_provider?.stop_time && new Date(user?.service_provider.stop_time) > new Date()
                  ? "text-green-500 font-semibold"
                  : "text-red-500 font-semibold"
              }>
                {user?.service_provider?.stop_time && new Date(user?.service_provider.stop_time) > new Date()
                  ? "Active"
                  : "Expired"}
              </span>
            </div>
          </div>
        </div>



        <div className="flex flex-wrap gap-2 bg-white p-3 rounded-lg shadow mb-6">
          {[
            { id: "profile", label: "Profile", icon: FiUser },
            { id: "projects", label: "Projects", icon: FiFolder },
            { id: "services", label: "Services", icon: FiBriefcase },
            { id: "contacts", label: "Contacts", icon: FiFileText },
            { id: "password", label: "Password", icon: FiLock },
            { id: "statics", label: "Statistics", icon: FiBarChart2 },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-1 py-2 px-3 rounded transition 
        ${activeTab === tab.id
                  ? "bg-blue-50 text-blue-600 font-medium border border-blue-200"
                  : "text-gray-600 hover:bg-gray-100"}`
              }
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="text-base" />
              {tab.label}
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-sm text-gray-700 bg-white p-6 rounded-lg shadow-lg mt-5">
            {activeTab === "profile" && <ProfileTab
              user={user}
              register={register}
              errors={errors}
              categories={categories}
              subcategories={serviceCategories}
              onCategoryChange={setSelectedCategoryId}
            />}
            {activeTab === "projects" && (
              <ProjectsTab
                fields={fields}
                register={register}
                remove={remove}
                append={append}
              />
            )}
            {activeTab === "services" && <ServicesTab
              fields={fields}
              register={register}
              append={append}
              remove={remove}
              errors={errors}
            />
            }
            {activeTab === "password" && <PasswordTab register={register} />}
            {activeTab === "statics" && <StaticsTab />}
            {activeTab === "contacts" && <ContractsTab />}
          </div>

          <div className="text-sm flex justify-start mt-5 mb-5">
            <button
              className="flex items-center gap-1 text-white py-2 px-4 mr-2 cursor-pointer"
              type="submit"
              style={{
                backgroundColor: 'oklch(0.373 0.034 259.733)',
              }}
            >
              <FiSave /> Save Profile
            </button>
          </div>
        </form>
      </>
      {/* )}  */}
    </>
  );
}
