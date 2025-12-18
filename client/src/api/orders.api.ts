export const API_URL = import.meta.env.VITE_PUBLIC_BACKEND_URL;

export interface CreateOrderDTO {
	products: {
		id: string;
		quantity: number;
	}[];
}

export const createOrder = async (orderData: CreateOrderDTO) => {
	const response = await fetch(`${API_URL}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(orderData),
	});

	if (!response.ok) {
		let message = 'Error al crear la orden';
		try {
			const errorData = await response.json();
			message = errorData.error ?? errorData.message ?? `Error ${response.status}: ${response.statusText}`;
		} catch {
			message = `Error ${response.status}: ${response.statusText}`;
		}
		throw new Error(message);
	}

	return response.json();
};

export const getOrders = async () => {
	const response = await fetch(`${API_URL}/orders`);

	if (!response.ok) {
		let message = 'Error al obtener las ordenes';
		try {
			const errorData = await response.json();
			message = errorData.error ?? errorData.message ?? `Error ${response.status}: ${response.statusText}`;
		} catch {
			message = `Error ${response.status}: ${response.statusText}`;
		}
		throw new Error(message);
	}

	return response.json();
};

export const deleteOrder = async (id: string) => {
	const response = await fetch(`${API_URL}/orders/${id}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		let message = 'Error al eliminar la orden';
		try {
			const errorData = await response.json();
			message = errorData.error ?? errorData.message ?? `Error ${response.status}: ${response.statusText}`;
		} catch {
			message = `Error ${response.status}: ${response.statusText}`;
		}
		throw new Error(message);
	}

	return response.json();
};
