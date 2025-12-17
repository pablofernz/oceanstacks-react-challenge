export interface Product {
  id: number;
  name: string;
  price: number;
  created_at?: string;
}

export interface Order {
  id: number;
  total: number;
  created_at: string;
}

export interface OrderItem {
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface OrderWithItems extends Order {
  order_items: Array<{
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }>;
}

export type IncomingOrderProduct = {
  id: number;
  price: number;
  quantity: number;
};
