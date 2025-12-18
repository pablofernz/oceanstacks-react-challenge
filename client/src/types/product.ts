export interface IProduct {
	id: string;
	name: string;
	price: number;
	createdAt: Date;
	is_active: boolean;
}

export interface IProductToOrder {
	id: string;
	quantity: number;
	price: number;
}
