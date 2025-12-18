import { motion } from 'motion/react';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import type { IOrder } from '../../types/order';
import { deleteOrder } from '../../api/orders.api';
import { OrderCard } from './orderCard';

interface Props {
	closeModal: () => void;
	orders: IOrder[] | null | 'error';
	refetchOrders: () => Promise<void>;
}

export const OrdersDashboard = ({ closeModal, orders, refetchOrders }: Props) => {
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const handleDelete = async (id: string) => {
		if (!confirm('¿Estás seguro de eliminar esta orden?')) return;
		setDeletingId(id);
		try {
			await deleteOrder(id);
			await refetchOrders();
		} catch (error) {
			console.error(error);
			alert('Error al eliminar la orden');
		} finally {
			setDeletingId(null);
		}
	};

	return createPortal(
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { delay: 0.5 } }}
			transition={{ duration: 0.5, ease: 'easeInOut' }}
			className="fixed top-0 z-20 flex h-[100svh] w-[100vw] items-center justify-center bg-[#0000009b] px-[0px] backdrop-blur-sm md:px-0"
		>
			<motion.div
				initial={{ opacity: 0, y: 100 }}
				animate={{
					opacity: 1,
					y: 0,
				}}
				exit={{ opacity: 0, y: 100 }}
				transition={{ duration: 0.8, ease: 'anticipate' }}
				onClick={(e) => e.stopPropagation()}
				className="relative flex size-full flex-col overflow-hidden bg-[#202020] md:h-[90%] md:w-[90%] md:rounded-[20px]"
			>
				<button
					onClick={() => closeModal()}
					className="absolute right-4 top-4 z-10 flex aspect-square h-[35px] items-center justify-center rounded-[10px] bg-[#404040] duration-300 ease-in-out hover:brightness-125"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="#808080"
						className="size-[25px]"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18 18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<header className="border-b border-[#353535] p-5">
					<h2 className="text-[16px] sm:text-xl text-[#e0e0e0]">Historial de Órdenes</h2>
				</header>

				<div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
					{orders === null ? (
						<p className="text-[#808080]">Cargando...</p>
					) : orders === 'error' ? (
						<p className="text-red-500">Error al cargar órdenes</p>
					) : orders.length === 0 ? (
						<p className="text-[#808080]">No hay órdenes registradas</p>
					) : (
						orders.map((order) => (
							<OrderCard key={order.id} order={order} handleDelete={handleDelete} deletingId={deletingId} />
						))
					)}
				</div>
			</motion.div>
		</motion.div>,
		document.getElementById('order-modal')!,
	);
};
