import { FiFileText, FiPhone, FiMail } from "react-icons/fi";

export default function ContractsTab() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-sm text-gray-700 space-y-6">
            <h3 className="text-lg font-bold mb-4">Your Contracts</h3>

            {/* List of contracts */}
            <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                            <FiFileText className="text-blue-600 text-lg" />
                            <span className="font-medium">Contract #12345</span>
                        </div>
                        <span className="text-xs text-gray-500">2024-06-01</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Service: Cleaning - Deep Cleaning</p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                            <FiPhone />
                            <span>+359 888 123 456</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FiMail />
                            <span>client@example.com</span>
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-green-600 font-medium">Active</div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                            <FiFileText className="text-blue-600 text-lg" />
                            <span className="font-medium">Contract #67890</span>
                        </div>
                        <span className="text-xs text-gray-500">2024-04-15</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Service: Plumbing - Installation</p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                            <FiPhone />
                            <span>+359 888 987 654</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FiMail />
                            <span>client2@example.com</span>
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-red-500 font-medium">Expired</div>
                </div>
            </div>

            {/* New contract form */}
            <div className="mt-6 border-t pt-6">
                <h4 className="text-md font-semibold mb-4">Create New Contract</h4>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium text-xs text-gray-500">Phone</label>
                        <input
                            type="tel"
                            placeholder="+359 888 000 000"
                            className="w-full border border-gray-300 rounded p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-xs text-gray-500">Website</label>
                        <input
                            type="url"
                            placeholder="https://example.com"
                            className="w-full border border-gray-300 rounded p-2 text-sm"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium text-xs text-gray-500">Address</label>
                        <input
                            type="text"
                            placeholder="123 Example Street"
                            className="w-full border border-gray-300 rounded p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-xs text-gray-500">City</label>
                        <select className="w-full border border-gray-300 rounded p-2 text-sm">
                            <option value="">Select City</option>
                            <option>Sofia</option>
                            <option>Plovdiv</option>
                            <option>Varna</option>
                            <option>Burgas</option>
                        </select>
                    </div>
                </form>

            </div>
        </div>
    );
}
