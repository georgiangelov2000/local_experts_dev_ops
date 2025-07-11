import SEO from '../Components/Auth/Shared/SEO';
export default function FavouritesPage() {
    const favourites = [
      {
        id: 1,
        title: "Clean & Shine Homes",
        description: "Professional residential and commercial cleaning services.",
        image: "https://media.istockphoto.com/id/1444666625/photo/online-advertising-concept-ad-on-internet.jpg?s=612x612&w=0&k=20&c=Lp2QzOAMWOt4QaJRyk5aBUIkw6EgnsjcvDuDIktJ8yY=",
      },
      {
        id: 2,
        title: "Super Plumber",
        description: "Fast and reliable plumbing services 24/7.",
        image: "https://media.istockphoto.com/id/1444666625/photo/online-advertising-concept-ad-on-internet.jpg?s=612x612&w=0&k=20&c=Lp2QzOAMWOt4QaJRyk5aBUIkw6EgnsjcvDuDIktJ8yY=",
      },
      {
        id: 3,
        title: "Garden Experts",
        description: "Beautiful garden designs and maintenance.",
        image: "https://media.istockphoto.com/id/1444666625/photo/online-advertising-concept-ad-on-internet.jpg?s=612x612&w=0&k=20&c=Lp2QzOAMWOt4QaJRyk5aBUIkw6EgnsjcvDuDIktJ8yY=",
      },
    ];
  
    return (
      <>
        <SEO
          title="Your Favourites - Local Experts"
          description="View your favourite service providers on Local Experts."
          url="https://yourdomain.com/favourites"
          image="https://yourdomain.com/og-image.jpg"
        />
        <div className="p-6 bg-white rounded-t-lg">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Your Favourites</h1>
  
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {favourites.map((fav) => (
              <div
                key={fav.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={fav.image}
                  alt={fav.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-1">{fav.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">{fav.description}</p>
                  <button className="text-blue-600 text-sm font-medium hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  