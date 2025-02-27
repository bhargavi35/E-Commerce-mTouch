import axios from 'axios';

export async function getServerSideProps(context) {
  try {
    const { id } = context.params;
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return {
      props: {
        product: response.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export default function ProductDetails({ product }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl mb-4">{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
