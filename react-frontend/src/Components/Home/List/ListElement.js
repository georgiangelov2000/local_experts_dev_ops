import { Link } from "react-router-dom"
import { FiMapPin, FiEye, FiThumbsUp, FiThumbsDown, FiHeart } from 'react-icons/fi';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';


export default function ListElement({ provider }) {
    return (
        <li key={provider.id} className="relative">
            <Link
                to={`/providers/${provider.alias}`}
                className="flex items-start bg-gray-100 transition group mb-2 rounded-lg"
            >
                {/* Promoted badge */}
                <div className="absolute top-0 left-2 bg-yellow-500 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded">
                    Promoted
                </div>

                {/* Image */}
                <div className="mr-2 flex-shrink-0" style={{ maxWidth: '200px' }}>
                    <img
                        src={
                            provider.media.length > 0
                                ? provider.media[0].url
                                : 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
                        }
                        alt={provider.business_name}
                        className="w-full h-full object-cover rounded"
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between p-4 flex-1">
                    <div>
                        <h3 className="text-lg font-bold text-blue-600 group-hover:underline mb-1">
                            {provider.business_name}
                        </h3>
                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                            {provider.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-2 text-xs text-gray-600">
                            {provider.locations?.map((loc, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center bg-gray-100 rounded-full"
                                >
                                    <FiMapPin className="mr-1" /> {loc}
                                </span>
                            ))}
                            <span className="flex items-center bg-gray-100 rounded-full">
                                <FiEye className="mr-1" /> {provider.views ?? 0} views
                            </span>
                            <span className="flex items-center bg-gray-100 rounded-full">
                                👍 {provider.likes_count ?? 0}
                            </span>
                            <span className="flex items-center bg-gray-100 rounded-full">
                                👎 {provider.dislikes_count ?? 0}
                            </span>
                        </div>

                        <div className="flex items-center text-xs text-gray-500">
                            <div className="flex items-center">
                                {(() => {
                                    const fullStars = Math.floor(provider.final_grade || 0);
                                    const halfStar = (provider.final_grade || 0) - fullStars >= 0.5;
                                    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
                                    return (
                                        <>
                                            {Array.from({ length: fullStars }).map((_, i) => (
                                                <FaStar key={`star-filled-${i}`} className="text-yellow-400 w-4 h-4" />
                                            ))}
                                            {halfStar && <FaStarHalfAlt className="text-yellow-400 w-4 h-4" />}
                                            {Array.from({ length: emptyStars }).map((_, i) => (
                                                <FaRegStar key={`star-empty-${i}`} className="text-yellow-400 w-4 h-4" />
                                            ))}
                                        </>
                                    );
                                })()}
                            </div>
                            <span className="ml-2">({provider.reviews_count ?? 0} reviews)</span>
                        </div>
                    </div>


                    {/* Actions */}
                    <div className="flex space-x-2 mt-2">
                        <button
                            className="text-gray-500 hover:text-red-500 cursor-pointer transition"
                            title="Dislike"
                            onClick={(e) => e.preventDefault()}
                        >
                            <FiThumbsDown />
                        </button>
                        <button
                            className="text-gray-500 hover:text-green-500 cursor-pointer transition"
                            title="Like"
                            onClick={(e) => e.preventDefault()}
                        >
                            <FiThumbsUp />
                        </button>
                        <button
                            className="text-gray-500 hover:text-pink-500 cursor-pointer transition"
                            title="Favorite"
                            onClick={(e) => e.preventDefault()}
                        >
                            <FiHeart />
                        </button>
                    </div>
                </div>
            </Link>
        </li>
    )
}