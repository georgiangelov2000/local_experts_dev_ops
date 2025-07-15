import { useSearchParams } from 'react-router-dom';
import { FiGrid, FiTrendingUp, FiUsers, FiStar } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function Categories({ categories }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const handleCategoryClick = (categoryId) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category_alias', categoryId);
    newParams.set('page', 1);
    setSearchParams(newParams);
  };

  // Default category colors
  const categoryColors = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-purple-500 to-purple-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
    'from-indigo-500 to-indigo-600',
    'from-pink-500 to-pink-600',
    'from-teal-500 to-teal-600',
    'from-yellow-500 to-yellow-600',
    'from-gray-500 to-gray-600'
  ];

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4">
          <FiGrid className="text-white text-2xl" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{t('explore_categories')}</h2>
        <p className="text-gray-600 text-lg">{t('discover_providers')}</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {categories.map((cat, index) => {
          const colorClass = categoryColors[index % categoryColors.length];
          const providerCount = cat.service_providers_count || 0;
          
          return (
            <div
              key={cat.alias}
              onClick={() => handleCategoryClick(cat.alias)}
              className="group relative bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-5 rounded-xl group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <img
                    src={cat.icon || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                    alt={cat.name}
                    className="w-6 h-6 object-contain filter brightness-0 invert"
                  />
                </div>

                {/* Category Name */}
                <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {cat.name}
                </h3>

                {/* Provider Count */}
                <div className="flex items-center text-xs text-gray-500">
                  <FiUsers className="mr-1" />
                  <span>{providerCount} provider{providerCount !== 1 ? 's' : ''}</span>
                </div>

                {/* Hover Indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg mx-auto mb-2">
            <FiUsers className="text-white" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {categories.reduce((sum, cat) => sum + (cat.service_providers_count || 0), 0)}
          </div>
          <div className="text-sm text-blue-700">{t('total_providers')}</div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-lg mx-auto mb-2">
            <FiGrid className="text-white" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {categories.length}
          </div>
          <div className="text-sm text-green-700">{t('categories')}</div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-500 rounded-lg mx-auto mb-2">
            <FiStar className="text-white" />
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {categories.filter(cat => (cat.service_providers_count || 0) > 0).length}
          </div>
          <div className="text-sm text-purple-700">{t('active_categories')}</div>
        </div>
      </div>
    </div>
  );
}
