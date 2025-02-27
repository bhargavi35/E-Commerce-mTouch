import Product from './Product';

export default function ProductList({ products }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
