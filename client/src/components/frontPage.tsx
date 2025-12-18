import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import useViewportWidth from '../handlers/useViewportWidth';
import { OrderModal } from './orders/orderModal';
import { ProductList } from './products/productList';
import Navbar from './navbar';

export const FrontPage = () => {
	const viewportWidth = useViewportWidth();
	const [orderModalVisible, setOrderModalVisible] = useState<boolean>(
		viewportWidth >= 768,
	);
	return (
		<div className="flex h-[100svh] min-h-screen w-full">
			{/* Leftside */}
			<div className="scrollHidden relative flex h-full flex-1 items-start justify-center overflow-scroll py-[50px] pb-[105px]">
				<Navbar openOrderModal={() => setOrderModalVisible(true)} />
				<ProductList />
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
							<OrderModal closeModal={() => setOrderModalVisible(false)} />
						</motion.div>
					)}
				</AnimatePresence>
			) : (
				<div className="relative h-full w-[400px] p-[20px]">
					<OrderModal closeModal={() => setOrderModalVisible(false)} />
				</div>
			)}
		</div>
	);
};
