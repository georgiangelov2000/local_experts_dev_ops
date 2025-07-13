import React from "react";
import { FiUser, FiMail, FiTag, FiFileText, FiBriefcase, FiAward, FiPhone, FiMapPin, FiGlobe, FiFacebook, FiInstagram } from "react-icons/fi";

export default function Preview({ data }) {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <FiFileText className="text-gray-400 text-2xl" />
          </div>
          <p className="text-gray-500 text-lg font-medium">No data to preview</p>
          <p className="text-gray-400 text-sm">Please fill in your profile information first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-8 space-y-8">
        {/* Business Information */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
              <FiBriefcase className="text-white text-lg" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Business Information</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <FiUser className="text-blue-500 mr-3 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Business Name</p>
                  <p className="text-gray-800 font-semibold">{data.business_name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiMail className="text-blue-500 mr-3 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="text-gray-800 font-semibold">{data.email}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <FiTag className="text-blue-500 mr-3 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Category</p>
                  <p className="text-gray-800 font-semibold">{data.category_name || data.category_id}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiFileText className="text-blue-500 mr-3 w-5 h-5 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Description</p>
                  <p className="text-gray-800">{data.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        {data.projects && Array.isArray(data.projects) && data.projects.length > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3">
                <FiBriefcase className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Projects ({data.projects.length})</h3>
            </div>
            <div className="grid gap-4">
              {data.projects.map((proj, idx) => (
                <div key={proj.id || idx} className="bg-white rounded-xl p-4 border border-green-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-800 text-lg">{proj.project_name}</h4>
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                      Project
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{proj.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiFileText className="mr-2 w-4 h-4" />
                    <span>{proj.date_start} - {proj.date_end}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        {data.services && Array.isArray(data.services) && data.services.length > 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <FiTag className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Services ({data.services.length})</h3>
            </div>
            <div className="grid gap-4">
              {data.services.map((service, idx) => (
                <div key={service.id || idx} className="bg-white rounded-xl p-4 border border-purple-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-800 text-lg">{service.description}</h4>
                    <span className="bg-purple-100 text-purple-700 text-sm font-bold px-3 py-1 rounded-full">
                      ${service.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications && Array.isArray(data.certifications) && data.certifications.length > 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-3">
                <FiAward className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Certifications ({data.certifications.length})</h3>
            </div>
            <div className="grid gap-4">
              {data.certifications.map((cert, idx) => (
                <div key={cert.id || idx} className="bg-white rounded-xl p-4 border border-orange-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-800 text-lg">{cert.name}</h4>
                    <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded-full">
                      Certified
                    </span>
                  </div>
                  <p className="text-gray-600">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        {data.contacts && (
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                <FiMail className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Contact Information</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {data.contacts.phone && (
                <div className="flex items-center bg-white rounded-xl p-4 border border-indigo-200 hover:shadow-md transition-shadow">
                  <FiPhone className="text-indigo-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Phone</p>
                    <p className="text-gray-800 font-semibold">{data.contacts.phone}</p>
                  </div>
                </div>
              )}
              {data.contacts.email && (
                <div className="flex items-center bg-white rounded-xl p-4 border border-indigo-200 hover:shadow-md transition-shadow">
                  <FiMail className="text-indigo-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="text-gray-800 font-semibold">{data.contacts.email}</p>
                  </div>
                </div>
              )}
              {data.contacts.website && (
                <div className="flex items-center bg-white rounded-xl p-4 border border-indigo-200 hover:shadow-md transition-shadow">
                  <FiGlobe className="text-indigo-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Website</p>
                    <p className="text-gray-800 font-semibold">{data.contacts.website}</p>
                  </div>
                </div>
              )}
              {data.contacts.facebook && (
                <div className="flex items-center bg-white rounded-xl p-4 border border-indigo-200 hover:shadow-md transition-shadow">
                  <FiFacebook className="text-indigo-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Facebook</p>
                    <p className="text-gray-800 font-semibold">{data.contacts.facebook}</p>
                  </div>
                </div>
              )}
              {data.contacts.instagram && (
                <div className="flex items-center bg-white rounded-xl p-4 border border-indigo-200 hover:shadow-md transition-shadow">
                  <FiInstagram className="text-indigo-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Instagram</p>
                    <p className="text-gray-800 font-semibold">{data.contacts.instagram}</p>
                  </div>
                </div>
              )}
              {data.contacts.address && (
                <div className="flex items-start bg-white rounded-xl p-4 border border-indigo-200 hover:shadow-md transition-shadow md:col-span-2">
                  <FiMapPin className="text-indigo-500 mr-3 w-5 h-5 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Address</p>
                    <p className="text-gray-800 font-semibold">{data.contacts.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 