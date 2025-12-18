export interface IProduct {
	id: string;
	name: string;
	price: number;
	createdAt: Date;
}

export interface IProductToOrder {
	id: string;
	quantity: number;
	price: number;
}
