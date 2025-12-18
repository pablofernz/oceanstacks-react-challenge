export interface IOrder {
    id: string;
    total: number;
    created_at: string;
    order_items: {
        price: number;
        quantity: number;
        product: {
            name: string;
        };
    }[];
}

export interface ILocalOrderProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
}
