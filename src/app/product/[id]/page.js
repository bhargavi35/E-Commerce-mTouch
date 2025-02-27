import Image from 'next/image';
import ProductDetailsClient from './ProductDetailsClient';

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

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  return <ProductDetailsClient product={product} />;
}
