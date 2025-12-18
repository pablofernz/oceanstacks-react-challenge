import { useState, useCallback } from 'react';
import { getAllProducts, deleteProduct as deleteProductApi } from '../../../api/products.api';
import type { IProduct } from '../../../types/product';

export const useProducts = () => {
    const [products, setProducts] = useState<IProduct[] | null | "error">(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const allProducts = await getAllProducts();
            setProducts(allProducts);
        } catch (error) {
            setProducts("error");
            console.error(
                error instanceof Error
                    ? error.message
                    : 'Error desconocido al obtener los productos',
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteProduct = async (id: string) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
        try {
            await deleteProductApi(id);
            alert('Producto eliminado con éxito');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert(error instanceof Error ? error.message : 'Error desconocido al eliminar el producto');
        }
    };

    return {
        products,
        fetchProducts,
        deleteProduct,
        isLoading
    };
};
