export default function RelatedProviders() {
    const related = [
      {
        id: 1,
        name: "Plumb Pro",
        description: "Fast plumbing services at affordable rates.",
        image: "https://via.placeholder.com/150x100",
      },
      {
        id: 2,
        name: "Elite Plumbing",
        description: "24/7 emergency plumbing experts.",
        image: "https://via.placeholder.com/150x100",
      },
      {
        id: 3,  
        name: "AquaFix",
        description: "Leak detection and repair specialists.",
        image: "https://via.placeholder.com/150x100",
      },
    ];
  
    return (
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Related Providers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {related.map((provider) => (
            <div key={provider.id} className="bg-white rounded-lg shadow p-3 hover:shadow-md transition">
              <img
                src={provider.image}
                alt={provider.name}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <h4 className="text-sm font-semibold">{provider.name}</h4>
              <p className="text-xs text-gray-600 mb-2">{provider.description}</p>
              <button className="text-blue-600 text-xs hover:underline">View Profile</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  