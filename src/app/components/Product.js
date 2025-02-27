import Image from 'next/image';

export default function Product({ product }) {
  return (
    <div className="flex flex-col items-center p-4 border border-gray-200 rounded-md">
      <Image src={product.image} alt={product.title} width={200} height={200} />
      <h2 className="text-lg">{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <a href={`/product/${product.id}`} className="text-blue-600">View Details</a>
    </div>
  );
}
