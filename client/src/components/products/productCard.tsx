'use client';
import { motion } from 'motion/react';
import type { IProduct } from '../../types/product';

interface Props {
	product: IProduct
}
export function ProductCard({ product }: Props) {
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
				className="h-[100px] w-full rounded-[10px]"
				style={{ backgroundColor: 'rgb(20, 20, 20)' }}
			/>
			<p className="h-[50px] pt-[5px] text-base text-[#b3b3b3]">{product.name}</p>

			<p className="mt-[0px]  p-[0px] text-[rgb(138,138,138)]">
				${product.price.toFixed(2)}
			</p>
			<button className="mt-[10px] flex h-[35px] w-full cursor-pointer items-center justify-center rounded-[10px] border-none bg-[#454545] text-[14px] text-[rgb(170,170,170)] transition-all duration-300 ease-in-out hover:brightness-125">
				Añadir
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
