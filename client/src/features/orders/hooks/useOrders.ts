import { useState, useCallback } from 'react';
import { getOrders, deleteOrder as deleteOrderApi } from '../../../api/orders.api';
import type { IOrder } from '../../../types/order';

export const useOrders = () => {
    const [orders, setOrders] = useState<IOrder[] | null | "error">(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        try {
            const allOrders = await getOrders();
            setOrders(allOrders);
        } catch (error) {
            setOrders("error");
            console.error(
                error instanceof Error
                    ? error.message
                    : 'Error desconocido al obtener las ordenes',
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteOrder = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta orden?')) return;
        try {
            await deleteOrderApi(id);
            await fetchOrders();
        } catch (error) {
            console.error(error);
            alert('Error al eliminar la orden');
        }
    };

    return {
        orders,
        fetchOrders,
        deleteOrder,
        isLoading
    };
};
