import React from "react";
import { FiUser, FiMail, FiTag, FiFileText, FiBriefcase, FiAward, FiPhone, FiMapPin, FiGlobe, FiFacebook, FiInstagram, FiClock } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function Preview({ data }) {
  const { t } = useTranslation();

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
    <div className="mx-auto bg-gray-50 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-8 space-y-8">
        {/* Business Information */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center mr-3">
              <FiBriefcase className="text-gray-600 text-lg" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{t('business_information')}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <FiUser className="text-gray-500 mr-3 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">{t('business_name')}</p>
                  <p className="text-gray-800 font-semibold">{data.business_name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiMail className="text-gray-500 mr-3 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">{t('business_email')}</p>
                  <p className="text-gray-800 font-semibold">{data.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiClock className="text-gray-500 mr-3 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">{t('last_logged_in')}</p>
                  <p className="text-gray-800 font-semibold">
                    {data.last_logged_in ? new Date(data.last_logged_in).toLocaleString() : t('never')}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <FiTag className="text-gray-500 mr-3 w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">{t('category')}</p>
                  <p className="text-gray-800 font-semibold">{data.category_name || data.category_id}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiFileText className="text-gray-500 mr-3 w-5 h-5 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 font-medium">{t('description')}</p>
                  <p className="text-gray-800">{data.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        {data.projects && Array.isArray(data.projects) && data.projects.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center mr-3">
                <FiBriefcase className="text-gray-600 text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t('projects')} ({data.projects.length})</h3>
            </div>
            <div className="grid gap-4">
              {data.projects.map((proj, idx) => (
                <div key={proj.id || idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-800 text-lg">{proj.project_name}</h4>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                      {t('project')}
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
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center mr-3">
                <FiTag className="text-gray-600 text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t('services')} ({data.services.length})</h3>
            </div>
            <div className="grid gap-4">
              {data.services.map((service, idx) => (
                <div key={service.id || idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-800 text-lg">{service.description}</h4>
                    <span className="bg-gray-100 text-gray-600 text-sm font-bold px-3 py-1 rounded-full">
                      ${service.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications && Array.isArray(data.certifications) && data.certifications.length > 0 ? (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center mr-3">
                <FiAward className="text-gray-600 text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t('certifications')} ({data.certifications.length})</h3>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-4 min-w-full">
                {data.certifications.map((cert, idx) => (
                  <div
                    key={cert.id || idx}
                    className="flex-shrink-0 w-72 bg-gray-50 rounded-2xl p-5 border border-gray-100 shadow hover:shadow-lg transition-shadow duration-200 flex flex-col items-center text-center relative"
                    tabIndex={0}
                    aria-label={cert.name}
                  >
                    {/* Show certificate image if present */}
                    {cert.image && (
                      <img
                        src={cert.image}
                        alt={t('certification_image')}
                        className="mb-3 w-full h-28 object-contain rounded border border-gray-100 bg-gray-50"
                        loading="lazy"
                      />
                    )}
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center shadow">
                        <FiAward className="text-gray-600 text-2xl" />
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1 truncate w-full" title={cert.name}>{cert.name}</h4>
                    {cert.description && (
                      <p className="text-gray-600 text-sm mb-2 line-clamp-3">{cert.description}</p>
                    )}
                    <span className="absolute top-3 right-3 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">{t('certified')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">{t('no_certifications')}</span>
          </div>
        )}

        {/* Contact Information */}
        {data.contacts && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center mr-3">
                <FiMail className="text-gray-600 text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t('contact_information')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {data.contacts.phone && (
                <div className="flex items-center bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
                  <FiPhone className="text-gray-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{t('phone')}</p>
                    <p className="text-gray-800 font-semibold">{data.contacts.phone}</p>
                  </div>
                </div>
              )}
              {data.contacts.email && (
                <div className="flex items-center bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
                  <FiMail className="text-gray-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{t('business_email')}</p>
                    <p className="text-gray-800 font-semibold">{data.contacts.email}</p>
                  </div>
                </div>
              )}
              {data.contacts.website && (
                <div className="flex items-center bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
                  <FiGlobe className="text-gray-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{t('website')}</p>
                    <p className="text-gray-800 font-semibold">{data.contacts.website}</p>
                  </div>
                </div>
              )}
              {data.contacts.facebook && (
                <div className="flex items-center bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
                  <FiFacebook className="text-gray-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{t('facebook')}</p>
                    <p className="text-gray-800 font-semibold">{data.contacts.facebook}</p>
                  </div>
                </div>
              )}
              {data.contacts.instagram && (
                <div className="flex items-center bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
                  <FiInstagram className="text-gray-500 mr-3 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{t('instagram')}</p>
                    <p className="text-gray-800 font-semibold">{data.contacts.instagram}</p>
                  </div>
                </div>
              )}
              {data.contacts.address && (
                <div className="flex items-start bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow md:col-span-2">
                  <FiMapPin className="text-gray-500 mr-3 w-5 h-5 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{t('address')}</p>
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