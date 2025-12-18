import { useState } from 'react';
import { createOrder } from '../../../api/orders.api';
import type { ILocalOrderProduct } from '../../../types/order';
import type { IProduct } from '../../../types/product';

export const useCart = () => {
    const [currentOrder, setCurrentOrder] = useState<ILocalOrderProduct[]>([]);
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);

    const addToOrder = (product: IProduct) => {
        const isAlreadyAdded = currentOrder.some((item) => item.id === product.id);
        if (isAlreadyAdded) return;

        const newItem: ILocalOrderProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        };

        setCurrentOrder((prev) => [...prev, newItem]);
    };

    const handleQuantityChange = (id: string, action: 'increment' | 'decrement') => {
        setCurrentOrder((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    if (action === 'increment') {
                        if (item.quantity >= 10) return item;
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        if (item.quantity === 1) return null;
                        return { ...item, quantity: item.quantity - 1 };
                    }
                }
                return item;
            }).filter((item) => item !== null) as ILocalOrderProduct[];
        });
    };

    const clearOrder = () => {
        setCurrentOrder([]);
    };

    const saveOrder = async (onSuccess?: () => void) => {
        if (currentOrder.length === 0) return;
        setIsCreatingOrder(true);
        try {
            // Explicitly type the DTO to satisfy TypeScript
            const orderDTO = {
                products: currentOrder.map(({ id, quantity }) => ({ id, quantity })),
            };
            await createOrder(orderDTO);
            setCurrentOrder([]);
            alert('Orden creada con éxito');
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Error al crear la orden');
        } finally {
            setIsCreatingOrder(false);
        }
    };

    return {
        currentOrder,
        addToOrder,
        handleQuantityChange,
        clearOrder,
        saveOrder,
        isCreatingOrder
    };
};
