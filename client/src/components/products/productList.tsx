import { ProductCard } from './productCard';

// Mock Data Initialization
const INITIAL_PRODUCTS = [
	{ id: 1, name: 'Hamburguesa Clásica', price: 10 },
	{ id: 2, name: 'Pizza Pepperoni', price: 15 },
	{ id: 3, name: 'Ensalada César', price: 8 },
	{ id: 4, name: 'Hamburguesa Vegetariana', price: 10 },
];
export const ProductList = () => {
	return (
		<div className="flex h-fit w-full flex-wrap items-start justify-center gap-[20px]">
			{INITIAL_PRODUCTS.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};
