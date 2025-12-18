import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import useViewportWidth from '../handlers/useViewportWidth';
import { OrderModal } from '../features/orders/components/orderModal';
import { ProductList } from '../features/products/components/productList';

import { useProducts } from '../features/products/hooks/useProducts';
import { useOrders } from '../features/orders/hooks/useOrders';
import Navbar from '../components/navbar';
import { useOrderDraft } from '../features/orders/hooks/useOrderDraft';

export const Home = () => {
	const viewportWidth = useViewportWidth();
	const [orderModalVisible, setOrderModalVisible] = useState<boolean>(
		viewportWidth >= 768,
	);

	const { products, fetchProducts, deleteProduct } = useProducts();
	const { orders, fetchOrders } = useOrders();
	const {
		currentOrder,
		addToOrder,
		handleQuantityChange,
		clearOrder,
		saveOrder,
		isCreatingOrder
	} = useOrderDraft();

	useEffect(() => {
		fetchProducts();
		fetchOrders();
	}, [fetchProducts, fetchOrders]);

	const handleSaveOrder = async () => {
		await saveOrder(() => {
			fetchOrders();
			if (viewportWidth < 768) {
				setOrderModalVisible(false);
			}
		});
	};

	return (
		<div className="flex h-[100svh] min-h-screen w-full">
			{/* Leftside */}
			<div className=" relative flex h-full min-w-[300px] flex-1 items-center justify-center py-[50px] pb-[105px]">
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
					deleteProduct={deleteProduct}
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
								clearOrder={clearOrder}
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
						clearOrder={clearOrder}
						isCreatingOrder={isCreatingOrder}
					/>
				</div>
			)}
		</div>
	);
};
