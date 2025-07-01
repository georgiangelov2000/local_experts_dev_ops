import { FiTrendingUp, FiPlusCircle, FiRefreshCw } from "react-icons/fi";

export default function Pricing() {
    return (
        <>
            <section className="bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-lg p-6 hover:shadow-lg transition">
                        <div className="flex items-center mb-3">
                            <FiTrendingUp className="text-blue-600 text-2xl mr-2" />
                            <h3 className="text-lg font-semibold text-gray-700">Promote Your Ad</h3>
                        </div>
                        <p className="text-gray-500 text-sm mb-3">Boost your visibility with featured placement for 7 days.</p>
                        <div className="text-blue-600 font-bold text-lg mb-4">$10 / 7 days</div>
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">Promote Now</button>
                    </div>

                    <div className="rounded-lg p-6 hover:shadow-lg transition">
                        <div className="flex items-center mb-3">
                            <FiPlusCircle className="text-green-600 text-2xl mr-2" />
                            <h3 className="text-lg font-semibold text-gray-700">Add Extra Projects</h3>
                        </div>
                        <p className="text-gray-500 text-sm mb-3">Upgrade to add up to 10 projects beyond your current limit.</p>
                        <div className="text-green-600 font-bold text-lg mb-4">$5 / project</div>
                        <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">Upgrade Plan</button>
                    </div>

                    <div className="rounded-lg p-6 hover:shadow-lg transition">
                        <div className="flex items-center mb-3">
                            <FiRefreshCw className="text-yellow-500 text-2xl mr-2" />
                            <h3 className="text-lg font-semibold text-gray-700">Renew Profile</h3>
                        </div>
                        <p className="text-gray-500 text-sm mb-3">Renew your expired profile and stay active in search results.</p>
                        <div className="text-yellow-500 font-bold text-lg mb-4">$15 / 30 days</div>
                        <button className="w-full bg-yellow-500 text-white py-2 rounded-lg font-medium hover:bg-yellow-600 transition">Renew Now</button>
                    </div>
                </div>
            </section>
        </>
    )
}