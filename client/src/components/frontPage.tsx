import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import useViewportWidth from '../handlers/useViewportWidth';
import { OrderModal } from './orders/orderModal';
import { ProductList } from './products/productList';
import Navbar from './navbar';
import { getAllProducts, deleteProduct } from '../api/products.api';
import { getOrders, createOrder } from '../api/orders.api';
import type { IProduct } from '../types/product';
import type { ILocalOrderProduct, IOrder } from '../types/order';

export const FrontPage = () => {
	const viewportWidth = useViewportWidth();
	const [orderModalVisible, setOrderModalVisible] = useState<boolean>(
		viewportWidth >= 768,
	);
	const [products, setProducts] = useState<IProduct[] | null | "error">(null);
	const [orders, setOrders] = useState<IOrder[] | null | "error">(null);
	const [currentOrder, setCurrentOrder] = useState<ILocalOrderProduct[]>([]);
	const [isCreatingOrder, setIsCreatingOrder] = useState(false);

	const fetchProducts = useCallback(async () => {
		try {
			const allProducts = await getAllProducts();

			setProducts(allProducts);
		} catch (error) {
			setProducts("error");
			console.log(
				error instanceof Error
					? error.message
					: 'Error desconocido al obtener los productos',
			);

		}
	}, []);

	const fetchOrders = useCallback(async () => {
		try {
			const allOrders = await getOrders();
			setOrders(allOrders);
		} catch (error) {
			setOrders("error");
			console.log(
				error instanceof Error
					? error.message
					: 'Error desconocido al obtener las ordenes',
			);
		}
	}, []);


	useEffect(() => {
		// Funciona correctamente pero quito el alert de eslint,

		fetchProducts();
		fetchOrders();
	}, [fetchProducts, fetchOrders]);

	const addToOrder = (product: IProduct) => {
		const isAlreadyAdded = currentOrder.some((item) => item.id === product.id);
		if (isAlreadyAdded) return;

		const newItem: ILocalOrderProduct = {
			id: product.id,
			name: product.name,
			price: product.price,
			quantity: 1,
		};

		setCurrentOrder((prev) => [...prev, newItem]);
	};

	const handleQuantityChange = (id: string, action: 'increment' | 'decrement') => {
		setCurrentOrder((prev) => {
			return prev.map((item) => {
				if (item.id === id) {
					if (action === 'increment') {
						if (item.quantity >= 10) return item;
						return { ...item, quantity: item.quantity + 1 };
					} else {
						if (item.quantity === 1) return null;
						return { ...item, quantity: item.quantity - 1 };
					}
				}
				return item;
			}).filter((item) => item !== null) as ILocalOrderProduct[];
		});
	};

	const handleSaveOrder = async () => {
		if (currentOrder.length === 0) return;
		setIsCreatingOrder(true);
		try {
			// Explicitly type the DTO to satisfy TypeScript
			const orderDTO = {
				products: currentOrder.map(({ id, quantity }) => ({ id, quantity })),
			};
			await createOrder(orderDTO);
			setCurrentOrder([]);
			alert('Orden creada con éxito');
			fetchOrders();
			if (viewportWidth < 768) {
				setOrderModalVisible(false);
			}
		} catch (error) {
			console.error('Error creating order:', error);
			alert('Error al crear la orden');
		} finally {
			setIsCreatingOrder(false);
		}
	};

	const handleDeleteProduct = async (id: string) => {
		if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
		try {
			await deleteProduct(id);
			alert('Producto eliminado con éxito');
			fetchProducts();
		} catch (error) {
			console.error('Error deleting product:', error);
			alert('Error al eliminar el producto');
		}
	};


	return (
		<div className="flex h-[100svh] min-h-screen w-full">
			{/* Leftside */}
			<div className=" relative flex h-full flex-1 items-start justify-center  py-[50px] pb-[105px]">
				<Navbar
					openOrderModal={() => setOrderModalVisible(true)}
					refetchProducts={fetchProducts}
					orders={orders}
					refetchOrders={fetchOrders}
				/>
				<ProductList
					products={products}
					addToOrder={addToOrder}
					currentOrder={currentOrder}
					deleteProduct={handleDeleteProduct}
				/>
			</div>

			{/* Rightside */}
			{viewportWidth < 768 ? (
				<AnimatePresence>
					{orderModalVisible && (
						<motion.div
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ duration: 0.5, ease: 'easeInOut' }}
							className="absolute right-0 h-full w-full xs:w-[400px] xs:p-[20px]"
						>
							<OrderModal
								closeModal={() => setOrderModalVisible(false)}
								currentOrder={currentOrder}
								handleQuantityChange={handleQuantityChange}
								handleSaveOrder={handleSaveOrder}
								clearOrder={() => setCurrentOrder([])}
								isCreatingOrder={isCreatingOrder}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			) : (
				<div className="relative h-full w-[400px] p-[20px]">
					<OrderModal
						closeModal={() => setOrderModalVisible(false)}
						currentOrder={currentOrder}
						handleQuantityChange={handleQuantityChange}
						handleSaveOrder={handleSaveOrder}
						clearOrder={() => setCurrentOrder([])}
						isCreatingOrder={isCreatingOrder}
					/>
				</div>
			)}
		</div>
	);
};
