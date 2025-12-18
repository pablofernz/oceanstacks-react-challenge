import { motion } from 'motion/react';
import { createPortal } from 'react-dom';

interface Props {
	closeModal: () => void;
}
export const OrdersDashboard = ({ closeModal }: Props) => {
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
				onClick={() => closeModal()}
				className="md:h-[90%] md:w-[90%] size-full md:rounded-[20px] bg-[#202020]"
			></motion.div>
		</motion.div>,
		document.getElementById('order-modal')!,
	);
};
