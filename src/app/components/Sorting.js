export default function Sorting({ onSortChange }) {
    return (
        <div className="flex gap-2 mb-4">
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => onSortChange('name', 'asc')}
            >
                Name (A-Z)
            </button>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => onSortChange('name', 'desc')}
            >
                Name (Z-A)
            </button>
            <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => onSortChange('price', 'asc')}
            >
                Price (Low-High)
            </button>
            <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => onSortChange('price', 'desc')}
            >
                Price (High-Low)
            </button>
        </div>
    );
}
