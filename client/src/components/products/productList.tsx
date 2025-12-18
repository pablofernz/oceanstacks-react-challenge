import { ProductCard } from "./productCard";
import type { IProduct } from "../../types/product";
import type { ILocalOrderProduct } from "../../types/order";
import InfinityLoader from "../loader/loader";

interface Props {
	products: IProduct[] | null | "error";
	addToOrder: (product: IProduct) => void;
	currentOrder: ILocalOrderProduct[];
	deleteProduct: (id: string) => void;
}

export const ProductList = ({
	products,
	addToOrder,
	currentOrder,
	deleteProduct
}: Props) => {

	return (
		<div className="styledScroll h-full flex items-center justify-center  overflow-auto">
			{products?.length === 0 && (
				<div>
					<p className="text-center text-[20px] sm:text-[30px] pb-[10px] text-[#909090]">
						No hay productos disponibles
					</p>
					<p className="text-center text-[16px] text-[#5e5e5e]">
						Espera a que un administrador los agregue.
					</p>
				</div>
			)}

			{products === null &&
				<InfinityLoader scale="1.3" color="#707070" />}


			{products === "error" && (
				<div>
					<p className="text-center text-[20px]  sm:text-[30px] pb-[10px] text-[#909090]">
						Error al obtener los productos
					</p>
					<p className="text-center text-[16px] text-[#5e5e5e]">
						Intenta recargar la página.
					</p>
				</div>
			)}

			<div className="flex h-fit max-h-[80svh] w-full flex-wrap items-start justify-center pt-[5px] gap-[20px]">
				{Array.isArray(products) && products?.map((product) => (
					<ProductCard 
						key={product.id} 
						product={product} 
						addToOrder={addToOrder}
						isAdded={currentOrder.some(item => item.id === product.id)}
						deleteProduct={deleteProduct}
					/>
				))}

			</div>
		</div>
	);
};
