import Image from 'next/image';

export default function Product({ product }) {
    return (
        <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-md">
            <Image src={product.image} alt={product.title} width={200} height={200} className="rounded-lg" />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.description.slice(0, 100)}...</p>
            <p className="text-lg font-bold mt-2">Price: ${product.price}</p>
            <a href={`/product/${product.id}`} className="text-blue-600 hover:underline mt-2">View Details</a>
        </div>
    );
}
