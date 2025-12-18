export const API_URL = import.meta.env.VITE_PUBLIC_BACKEND_URL

export interface CreateProductDTO {
	name: string;
	price: number;
}

export const createProduct = async (productData: CreateProductDTO) => {
	const response = await fetch(`${API_URL}/products`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(productData),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Error al crear el producto');
	}

	return response.json();
};

export const getAllProducts = async () => {
	const response = await fetch(`${API_URL}/products`);

	if (!response.ok) {
		let message = 'Error al obtener los productos';

		try {
			const errorData = await response.json();
			message = errorData.message ?? message;
		} catch {
			message = `Error ${response.status}: ${response.statusText}`;
		}

		throw new Error(message);
	}

	return response.json();
};
