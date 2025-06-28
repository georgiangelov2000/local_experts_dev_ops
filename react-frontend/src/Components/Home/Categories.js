export default function Categories( {categories} ) {
    return (
        <>
        <h1 className="text-2xl font-bold mb-4">Service Categories</h1>
        <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat, index) => (
            <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {cat.name}
            </span>
            ))}
        </div>
        </>
    )
} 