import { useSearchParams } from 'react-router-dom';

export default function Categories({ categories }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategoryClick = (categoryId) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('alias', categoryId);
    newParams.set('page', 1);
    setSearchParams(newParams);
  };

  return (
    <div className="bg-indigo-50 p-6 rounded-lg mb-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Categories</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((cat) => (
          <div
            key={cat.alias}
            onClick={() => handleCategoryClick(cat.alias)}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-105"
              style={{
                backgroundColor: cat.bgColor || '#f3f4f6' // по избор цвят
              }}
            >
              <img
                src={cat.icon || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                alt={cat.name}
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-sm text-center font-medium text-gray-700 group-hover:text-blue-600">
              {cat.name} ({cat.service_providers_count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
