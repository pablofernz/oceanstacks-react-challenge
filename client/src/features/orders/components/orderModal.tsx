import { MiniClock } from '../../../handlers/clock';
import type { ILocalOrderProduct } from '../../../types/order';

interface Props {
	closeModal: () => void;
	currentOrder: ILocalOrderProduct[];
	handleQuantityChange: (id: string, action: 'increment' | 'decrement') => void;
	handleSaveOrder: () => void;
	clearOrder: () => void;
	isCreatingOrder: boolean;
}

export const OrderModal = ({ closeModal, currentOrder, handleQuantityChange, handleSaveOrder, clearOrder, isCreatingOrder }: Props) => {
	const total = currentOrder.reduce((acc, item) => acc + item.price * item.quantity, 0);

	const handleDelete = () => {
		if (currentOrder.length > 0) {
			if (confirm('¿Estás seguro de que deseas vaciar la orden?')) {
				clearOrder();
			}
		}
	};

	return (
		<div className="z-10 size-full bg-[#202020] p-[15px] pt-0 shadow-[0_0_50px_rgba(0,0,0,0.5)] xs:rounded-[20px]">
			<header className="flex h-[10%] w-full items-center justify-between">
				<div className="flex gap-[15px]">
					<p className="text-[16px] text-[#a4a4a4] sm:text-[20px]">Orden Actual</p>
				</div>
				<p className="hidden text-[16px] font-medium text-[#7a7a7a] md:block">
					{MiniClock()}
				</p>
				<button
					onClick={() => closeModal()}
					className="flex aspect-square h-[35px] items-center justify-center rounded-[10px] bg-[#404040] duration-300 ease-in-out hover:brightness-125 md:hidden"
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
			</header>

			<main className="scrollHidden flex h-[60%] w-full flex-col gap-[15px] overflow-scroll pb-[40px]">
				{currentOrder.length === 0 ? (
					<div className="flex h-full w-full flex-col items-center justify-center text-[#505050]">
						<p>No hay productos</p>
					</div>
				) : (
					currentOrder.map((item) => (
						<div key={item.id} className="flex min-h-[60px] w-full flex-shrink-0 items-center justify-between rounded-[10px] bg-[#353535] px-[15px]">
							<div className="flex flex-col">
								<p className="text-[#b0b0b0]">{item.name}</p>
								<p className="text-[12px] text-[#808080]">${item.price}</p>
							</div>
							<div className="flex items-center gap-[10px]">
								<button
									onClick={() => handleQuantityChange(item.id, 'decrement')}
									className="flex size-[25px] items-center justify-center rounded-[5px] bg-[#454545] text-[#a0a0a0] hover:brightness-125"
								>
									-
								</button>
								<p className="w-[20px] text-center text-[#b0b0b0]">{item.quantity}</p>
								<button
									onClick={() => handleQuantityChange(item.id, 'increment')}
									disabled={item.quantity >= 10}
									className={`flex size-[25px] items-center justify-center rounded-[5px] bg-[#454545] text-[#a0a0a0] hover:brightness-125 ${item.quantity >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
								>
									+
								</button>
							</div>
						</div>
					))
				)}
			</main>

			<footer className="relative flex h-[30%] w-full flex-col items-end justify-center rounded-[10px]">
				<div className="absolute bottom-[100%] h-[80px] w-full bg-gradient-to-t from-[#202020] to-transparent"></div>
				<div className="absolute bottom-[100%] h-[30px] w-full bg-gradient-to-t from-[#202020] to-transparent"></div>

				<div className="mb-[15px] flex w-full flex-1 flex-col items-end justify-end">
					<div className="flex h-fit w-full flex-col gap-[10px] rounded-t-[10px] bg-[#353535] p-[10px]">
						<div className="flex items-center justify-between">
							<p className="text-[14px] text-[#808080]">
								Cantidad de productos
							</p>
							<p className="text-[14px] text-[#808080]">{currentOrder.reduce((acc, item) => acc + item.quantity, 0)}</p>
						</div>

						<div className="flex items-center justify-between">
							<p className="text-[14px] text-[#808080]">Subtotal</p>
							<p className="text-[14px] text-[#808080]">${total.toFixed(2)}</p>
						</div>
					</div>

					<div className="relative flex h-fit w-full items-center justify-between rounded-b-[10px] bg-[#353535] p-[10px] text-[18px] text-[#b1b1b1]">
						<span className="absolute left-0 top-0 flex h-[1px] w-full items-center justify-center border-[2px] border-dotted border-transparent border-t-[#454545]">
							<div className="absolute right-[98.5%] size-[15px] rounded-full bg-[#202020]"></div>
							<div className="absolute left-[98.5%] size-[15px] rounded-full bg-[#202020]"></div>
						</span>
						<p>Total</p>
						<p>${total.toFixed(2)}</p>
					</div>
				</div>

				<div className="flex w-full gap-[15px]">
					<button
						onClick={handleDelete}
						className="flex aspect-square h-full items-center justify-center rounded-[10px] bg-[#353535] text-[#8f8f8f] duration-300 hover:brightness-125"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="size-[24px]"
						>
							<path
								fillRule="evenodd"
								d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
								clipRule="evenodd"
							/>
						</svg>
					</button>

					<button
						onClick={handleSaveOrder}
						disabled={isCreatingOrder || currentOrder.length === 0}
						className={`w-full rounded-[10px] bg-[#353535] py-[10px] text-[14px] text-[#8f8f8f] duration-300 hover:brightness-125 ${isCreatingOrder || currentOrder.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
					>
						{isCreatingOrder ? 'Guardando...' : 'Guardar órden'}
					</button>
				</div>
			</footer>
		</div>
	);
};
