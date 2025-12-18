import {
  Order,
  OrderItem,
  OrderWithItems,
  IncomingOrderProduct,
} from "../types/index.js";
import { getSupabase } from "./supabase.service.js";
import { HttpError } from "../libs/httpError.js";

export const getAllOrders = async (): Promise<OrderWithItems[]> => {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(quantity, price, product:products(name))")
    .order("created_at", { ascending: false });

  if (error) {
    throw new HttpError(500, `Error fetching orders: ${error.message}`);
  }

  return (data as OrderWithItems[]) || [];
};

export const createOrder = async (
  products: IncomingOrderProduct[]
): Promise<Order> => {
  if (!Array.isArray(products) || products.length === 0) {
    throw new HttpError(
      400,
      "Validation Error: Products array is required and cannot be empty"
    );
  }

  // Validamos cada producto, id debe ser string (uuid) y quantity un número positivo
  for (const product of products) {
    if (
      typeof product?.id !== "string" ||
      typeof product?.quantity !== "number" ||
      Number.isNaN(product.quantity) ||
      product.quantity <= 0
    ) {
      throw new HttpError(
        400,
        "Validation Error: Each product must have valid id and quantity (>0)"
      );
    }
  }

  const supabase = getSupabase();

  // Extraemos tooodos los IDs de los productos que estan en el body para hacer una consulta única
  const productIds = products.map((p) => p.id);

  // Traemos de la DB solo los campos que necesitamos (id y price) de cada uno de esos ID's
  const { data: dbProducts, error: productsError } = await supabase
    .from("products")
    .select("id, price")
    .in("id", productIds);

  if (productsError || !dbProducts) {
    throw new HttpError(
      500,
      `Error fetching products: ${productsError?.message}`
    );
  }

  // Verificamos que todos los productos enviados existan en la DB
  // creando un Set para los ID's y comparando con el array de ID's de los productos del body
  const foundIds = new Set(dbProducts.map((p) => p.id));
  const missingIds = productIds.filter((id) => !foundIds.has(id));

  if (missingIds.length > 0) {
    throw new HttpError(
      400,
      `Validation Error: Products not found: ${missingIds.join(", ")}`
    );
  }

  // Creamos un Map de precios para consultar rápidamente el precio de cada producto (en vez de recorrer el array cada vez)
  const priceMap = new Map<string, number>();
  dbProducts.forEach((product) => priceMap.set(product.id as unknown as string, product.price));

  // Calculamos el total de la orden multiplicando la cantidad de cada producto
  // por su precio real en la base de datos. Esto asegura que el front-end no pueda
  // manipular los precios y que siempre use los valores correctos de DB.
  const total = products.reduce((sum, p) => {
    const price = priceMap.get(p.id)!;
    return sum + price * p.quantity;
  }, 0);

  // Creamos la orden enviando solo el total, ya que los demás campos se completan solos o más adelante
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({ total })
    .select()
    .single();

  if (orderError || !orderData) {
    throw new HttpError(
      500,
      `Error creating order header: ${orderError?.message ?? "Unknown error"}`
    );
  }

  const order = orderData as Order;

  // Acá terminamos de darle forma al registro de orden_items con la información necesaria para insertarlos en la DB
  const itemsToInsert: OrderItem[] = products.map((product) => ({
    order_id: order.id,
    product_id: product.id,
    quantity: product.quantity,
    price: priceMap.get(product.id)!,
  }));

  // Insertamos todos los items en la tabla order_items.
  // Si ocurre un error en esta inserción, se elimina la orden (básicamente un rollback).
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsToInsert);

  if (itemsError) {
    await supabase.from("orders").delete().eq("id", order.id);
    throw new HttpError(
      500,
      `Error creating order items: ${itemsError.message} (Order rolled back)`
    );
  }

  return order;
};

export const deleteOrder = async (id: string): Promise<{ message: string }> => {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    throw new HttpError(500, `Error deleting order: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new HttpError(404, `Order not found`);
  }

  return {
    message: `Success: The order has been deleted`,
  };
};
