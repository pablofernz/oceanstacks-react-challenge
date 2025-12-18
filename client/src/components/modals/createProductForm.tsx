import { motion } from 'motion/react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { createProduct } from '../../api/products.api';
import InfinityLoader from '../loader/loader';

// Esquema de validación con Zod
const productSchema = z.object({
	name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
	price: z.number({ message: 'El precio es requerido' }).positive('El precio debe ser mayor a 0').max(100000, 'El precio no puede ser mayor a 100000'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Props {
	closeModal: () => void;
	refetchProducts: () => Promise<void>;
}

export const CreateProductForm = ({ closeModal, refetchProducts }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [apiError, setApiError] = useState<string | null>(null);

	// Configuración de React Hook Form con Zod Resolver
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
	});

	// Manejador del envío del formulario
	const onSubmit = async (data: ProductFormData) => {
		setIsLoading(true);
		setApiError(null);
		try {
			const newProduct = await createProduct(data);
			reset();
			await refetchProducts();
			closeModal();

			if (newProduct) {
				alert('Producto creado con éxito');
			}
			// Aquí se podría agregar una notificación de éxito o actualizar la lista de productos
		} catch (error) {
			setApiError(error instanceof Error ? error.message : 'Error desconocido al crear el producto');
		} finally {
			setIsLoading(false);
		}
	};

	return createPortal(
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { delay: 0.5 } }}
			transition={{ duration: 0.5, ease: 'easeInOut' }}
			className="fixed top-0 z-20 flex h-[100svh] w-[100vw] items-center justify-center bg-[#0000009b] px-[10px] backdrop-blur-sm md:px-0"
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
				className="flex h-auto w-[500px] flex-col rounded-[20px] bg-[#202020] border border-[#303030]"
			>
				<header className="h-fit w-full p-[10px] pl-[15px] pb-[5px]  flex items-center justify-between  ">
					<p className='text-[#afafaf] font-medium'>Crear nuevo producto</p>
					<button
						onClick={() => closeModal()}
						className="flex aspect-square h-[35px] items-center justify-center rounded-[10px] bg-[#303030] duration-300 ease-in-out hover:brightness-125 mb-[5px] "
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="#656565"
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

				<form onSubmit={handleSubmit(onSubmit)} className="flex-1 w-full p-[20px] flex flex-col gap-5 border-dashed
border-t-[2px] border-[#303030]">
					{/* Campo Nombre */}
					<div className="flex flex-col gap-2">
						<label className="text-[#656565] text-[12px] font-medium">Nombre del producto</label>
						<input
							{...register('name')}
							className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-[10px] p-3 text-[#e0e0e0] text-[14px] outline-none focus:border-[#505050] transition-colors placeholder-[#505050]"
							placeholder="Ej: Hamburguesa Doble"
						/>
						{errors.name && (
							<span className="text-red-400 text-xs mt-1">{errors.name.message}</span>
						)}
					</div>

					{/* Campo Precio */}
					<div className="flex flex-col gap-2">
						<label className="text-[#656565] text-[12px] font-medium">Precio</label>
						<input
							type="number"
							step="0.01"
							{...register('price', { valueAsNumber: true })}
							className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-[10px] p-3 text-[#e0e0e0] text-[14px] outline-none focus:border-[#505050] transition-colors placeholder-[#505050]"
							placeholder="0.00"
						/>
						{errors.price && (
							<span className="text-red-400 text-xs mt-1">{errors.price.message}</span>
						)}
					</div>

					{/* Mensaje de error general de la API */}
					{apiError && (
						<div className="p-3 bg-red-900/20 border border-red-900/50 rounded-[10px]">
							<p className="text-red-400 text-sm text-center">{apiError}</p>
						</div>
					)}

					<footer className="mt-4  w-full flex items-center justify-center ">
						<button
							type="submit"
							disabled={isLoading}
							className="w-full rounded-[10px] bg-[#353535] py-[12px] text-[14px] font-medium text-[#b0b0b0] duration-300 hover:bg-[#404040] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
						>
							{isLoading ? (
								<InfinityLoader scale="1" color="#b0b0b0" />
							) : (
								'Crear producto'
							)}
						</button>
					</footer>
				</form>
			</motion.div>
		</motion.div>,
		document.getElementById('order-modal')!,
	);
};
