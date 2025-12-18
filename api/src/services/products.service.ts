import { HttpError } from "../libs/httpError.js";
import { Product } from "../types/index.js";
import { getSupabase } from "./supabase.service.js";

export const getAllProducts = async (): Promise<Product[]> => {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new HttpError(500, `Error fetching products: ${error.message}`);
  }

  if (data.length === 0) {
    throw new HttpError(404, "Product fetching failed: No products found");
  }

  return data;
};

export const getProductsByName = async (name: string): Promise<Product[]> => {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .ilike("name", `%${name}%`);

  if (error) {
    throw new HttpError(500, `Error fetching products: ${error.message}`);
  }

  return data || [];
};

export const createProduct = async (
  name: string,
  price: number
): Promise<Product> => {
  if (!name || name.trim().length === 0) {
    throw new HttpError(400, "Validation error: Name is required");
  }

  if (price <= 0) {
    throw new HttpError(400, "Validation error: Price must be greater than 0");
  }

  // Se verifica si ya existe un producto con el mismo nombre.
  const supabase = getSupabase();
  const { data: existingProducts, error: checkError } = await supabase
    .from("products")
    .select("id")
    .ilike("name", name);

  if (checkError) {
    throw new HttpError(
      500,
      `Error checking product existence: ${checkError.message}`
    );
  }

  if (existingProducts && existingProducts.length > 0) {
    throw new HttpError(403, "Conflict: Product name already exists");
  }

  const { data, error } = await supabase
    .from("products")
    .insert({ name: name.trim(), price, is_active: true })
    .select()
    .single();

  if (error) {
    throw new HttpError(500, `Error creating product: ${error.message}`);
  }

  return data;
};

export const editProduct = async (
  id: string,
  name: string,
  price: number
): Promise<Product> => {
  if (!name || name.trim().length === 0) {
    throw new HttpError(400, "Validation error: Name is required");
  }

  if (
    price === undefined ||
    price === null ||
    typeof price !== "number" ||
    price <= 0
  ) {
    throw new HttpError(
      400,
      "Validation error: Price must be a number greater than 0"
    );
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("products")
    .update({ name: name.trim(), price })
    .eq("id", id)
    .select();

  if (error) {
    throw new HttpError(500, `Error updating product: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new HttpError(404, "Product not found");
  }

  return data[0];
};

export const deleteProduct = async (
  id: string
): Promise<{ message: string }> => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("products")
    .update({ is_active: false })
    .eq("id", id)
    .select();

  if (error) {
    throw new HttpError(500, `Error deleting product: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new HttpError(404, "Product not found");
  }

  return {
    message: `Success: Product with name: ${data[0].name} has been soft deleted`,
  };
};
