import Image from 'next/image';

async function getProduct(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  return {
    title: product ? product.title : 'Product Not Found',
  };
}

export default async function ProductDetails({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-red-500">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl w-full">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-xl font-semibold text-gray-900 mb-4">Price: <span className="text-blue-600">${product.price}</span></p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
