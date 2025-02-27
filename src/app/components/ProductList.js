import Product from './Product';

export default function ProductList({ products }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
}
