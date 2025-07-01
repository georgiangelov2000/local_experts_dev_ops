export default function ServicesTab() {
    return (
        <>
            <p className="mb-4 bg-gray-400 p-2 text-white">
                Опишете услугите, които предлагате, за да достигнете до повече клиенти.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block mb-1 font-medium text-xs text-gray-500">Category</label>
                    <select className="w-full border border-gray-300 rounded p-2 text-sm">
                        <option value="">Select Category</option>
                        <option>Cleaning</option>
                        <option>Electrician</option>
                        <option>Plumbing</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium text-xs text-gray-500">Subcategory</label>
                    <select className="w-full border border-gray-300 rounded p-2 text-sm">
                        <option value="">Select Subcategory</option>
                        <option>Deep Cleaning</option>
                        <option>Installation</option>
                        <option>Repair</option>
                    </select>
                </div>
            </div>
        </>

    );
}
