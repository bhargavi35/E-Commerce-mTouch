export default function Sorting({ onSortChange }) {
    return (
        <div className="flex flex-wrap gap-4 mb-6">
            {/* Sorting by Name */}
            <div className="flex items-center space-x-2">
                <label className="text-gray-500 font-medium">Sort by Name:</label>
                <select
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                    onChange={(e) => {
                        const [field, order] = e.target.value.split("-");
                        onSortChange(field, order);
                    }}
                >
                    <option value="name-asc">A-Z</option>
                    <option value="name-desc">Z-A</option>
                </select>
            </div>

            {/* Sorting by Price */}
            <div className="flex items-center space-x-2">
                <label className="text-gray-500 font-medium">Sort by Price:</label>
                <select
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                    onChange={(e) => {
                        const [field, order] = e.target.value.split("-");
                        onSortChange(field, order);
                    }}
                >
                    <option value="price-asc">Low to High</option>
                    <option value="price-desc">High to Low</option>
                </select>
            </div>
        </div>
    );
}
