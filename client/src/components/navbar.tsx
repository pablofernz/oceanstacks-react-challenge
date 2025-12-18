import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { CreateProductForm } from './modals/createProductForm';
import { OrdersDashboard } from './modals/orderDashboard';

interface Props {
	openOrderModal: () => void;
}
export default function Navbar({ openOrderModal }: Props) {
	const [buttonHovered, setButtonHovered] = useState<
		'ordersDashboard' | 'createProduct' | 'order' | null
	>(null);

	const [modalOpen, setModalOpen] = useState<
		'ordersDashboard' | 'createProduct' | 'order' | null
	>(null);

	return (
		<>
			<nav className="fixed bottom-0 flex h-[100px] w-full items-center justify-center py-[10px]">
				<div className="fixed bottom-0 z-[1] h-[200px] w-[80%] bg-gradient-to-t from-[#0e0e0e] to-transparent xs:h-[100px]"></div>

				<div className="z-10 flex h-[60px] w-[100%] scale-90 gap-[8px] rounded-[20px] bg-[#2b2b2b] p-[8px] shadow-[0_0_40px_rgba(0,0,0,0.5)] xs:w-fit xs:scale-100">
					<div className="relative flex items-center justify-center">
						<button
							onMouseEnter={() => setButtonHovered('ordersDashboard')}
							onMouseLeave={() => setButtonHovered(null)}
							onClick={() => setModalOpen('ordersDashboard')}
							className="flex aspect-square h-full items-center justify-center rounded-[12px] bg-[#404040] duration-300 ease-in-out hover:brightness-125"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="#808080"
								className="size-[25px]"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12 1.5c-1.921 0-3.816.111-5.68.327-1.497.174-2.57 1.46-2.57 2.93V21.75a.75.75 0 0 0 1.029.696l3.471-1.388 3.472 1.388a.75.75 0 0 0 .556 0l3.472-1.388 3.471 1.388a.75.75 0 0 0 1.029-.696V4.757c0-1.47-1.073-2.756-2.57-2.93A49.255 49.255 0 0 0 12 1.5Z"
								/>
							</svg>
						</button>

						<AnimatePresence>
							{buttonHovered === 'ordersDashboard' && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									transition={{ duration: 0.5, ease: 'anticipate' }}
									className="absolute bottom-[150%] flex w-[105px] items-center justify-center rounded-[10px] bg-[#202020] px-[10px] py-[5px] text-[14px] text-[#717171]"
								>
									Ver Pedidos
									<span className="absolute top-[80%] size-[10px] rotate-45 rounded-[2px] bg-[#202020]"></span>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					<div className="relative flex items-center justify-center">
						<button
							onMouseEnter={() => setButtonHovered('createProduct')}
							onMouseLeave={() => setButtonHovered(null)}
							onClick={() => setModalOpen('createProduct')}
							className="flex aspect-square h-full items-center justify-center rounded-[12px] bg-[#404040] duration-300 ease-in-out hover:brightness-125"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="3"
								stroke="#808080"
								className="size-[25px]"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 4.5v15m7.5-7.5h-15"
								/>
							</svg>
						</button>

						<AnimatePresence>
							{buttonHovered === 'createProduct' && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									transition={{ duration: 0.5, ease: 'anticipate' }}
									className="absolute bottom-[150%] flex w-[138px] items-center justify-center rounded-[10px] bg-[#202020] px-[10px] py-[5px] text-[14px] text-[#707070]"
								>
									Crear productos
									<span className="absolute top-[80%] size-[10px] rotate-45 rounded-[2px] bg-[#202020]"></span>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					<div className="relative flex min-w-0 flex-1 xs:flex-none">
						<input
							className="h-full min-w-0 flex-1 items-center justify-center rounded-[12px] border-none bg-[#404040] pl-[12px] pr-[42px] text-[14px] text-[#a1a1a1] outline-none duration-300 ease-in-out placeholder:text-[#808080] focus:brightness-110 xs:w-[200px] xs:flex-none"
							placeholder="Search"
						></input>
						<div className="absolute right-0 flex aspect-square h-full items-center justify-center rounded-[12px] duration-300 ease-in-out">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="3"
								stroke="#808080"
								className="size-[20px]"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
								/>
							</svg>
						</div>
					</div>

					<div className="relative flex items-center justify-center md:hidden">
						<button
							onMouseEnter={() => setButtonHovered('order')}
							onMouseLeave={() => setButtonHovered(null)}
							onClick={() => openOrderModal()}
							className="flex aspect-square h-full items-center justify-center rounded-[12px] bg-[#404040] duration-300 ease-in-out hover:brightness-125"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="#808080"
								className="size-[25px]"
							>
								<path
									fillRule="evenodd"
									d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
									clipRule="evenodd"
								/>
							</svg>
						</button>

						<AnimatePresence>
							{buttonHovered === 'order' && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									transition={{ duration: 0.5, ease: 'anticipate' }}
									className="absolute bottom-[150%] flex w-[105px] items-center justify-center rounded-[10px] bg-[#202020] px-[10px] py-[5px] text-[14px] text-[#717171]"
								>
									Ver órden
									<span className="absolute top-[80%] size-[10px] rotate-45 rounded-[2px] bg-[#202020]"></span>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</nav>

			<AnimatePresence>
				{modalOpen === 'ordersDashboard' && (
					<OrdersDashboard closeModal={() => setModalOpen(null)} />
				)}
			</AnimatePresence>

			<AnimatePresence>
				{modalOpen === 'createProduct' && (
					<CreateProductForm closeModal={() => setModalOpen(null)} />
				)}
			</AnimatePresence>
		</>
	);
}
