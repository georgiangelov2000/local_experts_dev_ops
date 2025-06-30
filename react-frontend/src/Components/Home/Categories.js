import { useSearchParams } from 'react-router-dom';

export default function Categories({ categories }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategoryClick = (categoryId) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category_id', categoryId);
    newParams.set('page', 1);

    setSearchParams(newParams);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(cat.id)}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition cursor-pointer"
          >
            {cat.name} ({cat.service_providers_count || 0})
          </button>
        ))}
      </div>
    </>
  );
}
