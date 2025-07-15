import { FiPhone, FiMapPin, FiMail, FiGlobe, FiAward, FiExternalLink, FiCheckCircle, FiPackage, FiDollarSign, FiInfo, FiUser } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function ProfileTab({ provider }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mr-3">
            <FiInfo className="text-white text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{t('about')}</h3>
            <p className="text-sm text-gray-600">{t('professional_background_and_expertise')}</p>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
          <p className="text-sm text-gray-700 leading-relaxed">
            {provider.description || t('no_description_available')}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl mr-3">
            <FiUser className="text-blue-600 text-lg" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900">{t('contact_information')}</h4>
            <p className="text-sm text-gray-600">{t('get_in_touch_and_connect')}</p>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
          <div className="grid gap-3">
            {provider.contact?.phone && (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mr-3">
                  <FiPhone className="text-blue-600 text-sm" />
                </div>
                <span className="text-sm text-gray-700 font-medium">{provider.contact.phone}</span>
              </div>
            )}
            
            {provider.contact?.email && (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mr-3">
                  <FiMail className="text-green-600 text-sm" />
                </div>
                <span className="text-sm text-gray-700 font-medium">{provider.contact.email}</span>
              </div>
            )}
            
            {provider.contact?.website && (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mr-3">
                  <FiGlobe className="text-purple-600 text-sm" />
                </div>
                <a 
                  href={provider.contact.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  {provider.contact.website}
                </a>
              </div>
            )}
            
            {provider.contact?.address && (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg mr-3">
                  <FiMapPin className="text-red-600 text-sm" />
                </div>
                <span className="text-sm text-gray-700 font-medium">{provider.contact.address}</span>
              </div>
            )}
            
            {provider.contact?.facebook && (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mr-3">
                  <span className="text-blue-600 text-sm">📘</span>
                </div>
                <a 
                  href={provider.contact.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  {t('facebook')}
                </a>
              </div>
            )}
            
            {provider.contact?.instagram && (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center justify-center w-8 h-8 bg-pink-100 rounded-lg mr-3">
                  <span className="text-pink-600 text-sm">📸</span>
                </div>
                <a 
                  href={provider.contact.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-pink-600 hover:text-pink-800 font-medium transition-colors duration-200"
                >
                  {t('instagram')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>


      {provider.certifications?.length > 0 && (
        <div className="mb-6 mt-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mr-3">
              <FiCheckCircle className="text-white text-lg" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">{t('certifications')}</h4>
              <p className="text-sm text-gray-600">{t('verified_credentials_and_qualifications')}</p>
            </div>
          </div>
          
          <div className="grid gap-4">
            {provider.certifications.map((cert, idx) => (
              <div key={idx} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-green-200 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex-shrink-0">
                      <FiAward className="text-gray-700 text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-200">
                        {cert.name}
                      </h5>
                      {cert.description && (
                        <p className="text-xs text-gray-600 leading-relaxed mb-2">
                          {cert.description}
                        </p>
                      )}
                      
                      {/* Action Links */}
                      <div className="flex items-center space-x-3">
                        {(cert.image || cert.link) && (
                          <div className="flex items-center space-x-2">
                            {cert.image && (
                              <a
                                href={cert.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors duration-200"
                              >
                                <FiExternalLink className="mr-1" />
                                {t('view_certificate')}
                              </a>
                            )}
                            {cert.link && (
                              <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-lg hover:bg-green-100 transition-colors duration-200"
                              >
                                <FiExternalLink className="mr-1" />
                                {t('verify_online')}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  {/* <div className="flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    <FiCheckCircle className="mr-1" />
                    Verified
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {provider.services?.length > 0 && (
        <div className="mb-6 mt-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mr-3">
              <FiPackage className="text-white text-lg" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">{t('services_offered')}</h4>
              <p className="text-sm text-gray-600">{t('professional_services_and_pricing')}</p>
            </div>
          </div>
          
          <div className="grid gap-3">
            {provider.services.map((service, idx) => (
              <div key={idx} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex-shrink-0">
                      <FiDollarSign className="text-white text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {service.description}
                      </h5>
                    </div>
                  </div>
                  
                  {/* Price Badge */}
                  <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                    {service.price} {t('currency_bgn')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
