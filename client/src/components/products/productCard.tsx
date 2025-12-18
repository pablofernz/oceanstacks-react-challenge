'use client';
import { motion } from 'motion/react';
import type { IProduct } from '../../types/product';

interface Props {
	product: IProduct;
	addToOrder: (product: IProduct) => void;
	isAdded: boolean;
	deleteProduct: (id: string) => void;
}
export function ProductCard({ product, addToOrder, isAdded, deleteProduct }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, ease: 'easeInOut' }}
			exit={{ opacity: 0 }}
			layout
			className="flex h-fit w-[200px] shrink-0 flex-col items-start justify-start gap-[5px] rounded-[20px] bg-[#2c2c2c] p-[10px]"
		>
			<div
				className="relative h-[100px] w-full rounded-[10px]"
				style={{ backgroundColor: 'rgb(20, 20, 20)' }}
			><button
				onClick={() => deleteProduct(product.id)}
				className=" absolute right-0 flex h-[35px] aspect-square cursor-pointer items-center justify-center rounded-[10px] border-none  text-[14px] transition-all duration-300 ease-in-out hover:brightness-125"
			>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="#505050"
						className="size-[20px]"
					>
						<path
							fillRule="evenodd"
							d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
							clipRule="evenodd"
						/>
					</svg>
				</button></div>
			<p className="h-[50px] pt-[5px] text-base text-[#b3b3b3]">{product.name}</p>

			<p className="mt-[0px]  p-[0px] text-[rgb(138,138,138)]">
				${product.price.toFixed(2)}
			</p>
			<button
				onClick={() => addToOrder(product)}
				disabled={isAdded}
				className={`mt-[10px] flex h-[35px] w-full items-center justify-center rounded-[10px] border-none text-[14px] transition-all duration-300 ease-in-out ${isAdded
					? 'cursor-not-allowed bg-[#353535] text-[#606060]'
					: 'cursor-pointer bg-[#454545] text-[rgb(170,170,170)] hover:brightness-125'
					}`}
			>
				{isAdded ? 'Añadido' : 'Añadir'}
			</button>

		</motion.div>
	);
}

export function ProductCardSkeleton() {
	return (
		<div className="pointer-events-none flex h-fit w-[200px] animate-pulse select-none flex-col items-start justify-start gap-2 rounded-[20px] bg-[#282828] p-[15px]">
			<div className="h-[100px] w-full rounded-[10px] bg-[#363636]" />
			<p className="rounded-[5px] bg-[#373737] text-base font-black text-transparent">
				Producto 1
			</p>
			<div className="flex w-full items-center justify-between">
				<p className="rounded-[5px] bg-[#373737] text-base font-black text-transparent">
					$200
				</p>
				<button className="h-full w-fit cursor-pointer rounded-[10px] border-none bg-[#323232] px-5 py-2 text-sm font-bold text-transparent">
					Buy
				</button>
			</div>
		</div>
	);
}
