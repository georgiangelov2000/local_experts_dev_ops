import { FiEye, FiMessageSquare, FiStar } from "react-icons/fi";

export default function StaticsTab() {
  return (
    <>
      <p className="mb-4 bg-gray-400 p-2 text-white">
        Вижте обобщени данни за вашата активност и популярност.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded flex items-center gap-3">
          <FiEye className="text-2xl text-blue-600" />
          <div>
            <p className="text-xs text-gray-500">Total Views</p>
            <p className="text-xl font-bold">1,250</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded flex items-center gap-3">
          <FiMessageSquare className="text-2xl text-green-600" />
          <div>
            <p className="text-xs text-gray-500">Reviews Received</p>
            <p className="text-xl font-bold">48</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded flex items-center gap-3">
          <FiStar className="text-2xl text-yellow-600" />
          <div>
            <p className="text-xs text-gray-500">Average Rating</p>
            <p className="text-xl font-bold">4.7 / 5</p>
          </div>
        </div>
      </div>
    </>

  );
}
