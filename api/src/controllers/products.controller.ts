import { Request, Response } from "express";
import { Product } from "../types/index.js";
import * as ProductsService from "../services/products.service.js";
import { HttpError } from "../libs/httpError.js";

export async function getProducts(req: Request, res: Response) {
  let products: Product[] = [];
  const name = req.query.name as string;

  try {
    if (name) {
      products = await ProductsService.getProductsByName(name);
    } else {
      products = await ProductsService.getAllProducts();
    }

    return res.status(200).json(products);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message =
      error instanceof HttpError ? error.message : "Unexpected error";

    return res.status(status).json({ error: message });
  }
}

export async function searchByName(req: Request, res: Response) {
  try {
    const name = req.params.name as string;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const products = await ProductsService.getProductsByName(name);

    return res.status(200).json(products);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message =
      error instanceof HttpError ? error.message : "Unexpected error";

    return res.status(status).json({ error: message });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    if (req.body == undefined) throw new HttpError(400, "Body is required");

    const { name, price } = req.body as Partial<Product>;

    const newProduct = await ProductsService.createProduct(
      name as string,
      price as number
    );

    return res.status(201).json(newProduct);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message =
      error instanceof HttpError ? error.message : "Unexpected error";

    return res.status(status).json({ error: message });
  }
}

export async function editProductByID(req: Request, res: Response) {
  try {
    if (req.body == undefined) throw new HttpError(400, "Body is required");

    const id = req.params.id as string;
    const { name, price } = req.body as Partial<Product>;

    const updatedProduct = await ProductsService.editProduct(
      id,
      name as string,
      price as number
    );

    return res.status(200).json(updatedProduct);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message =
      error instanceof HttpError ? error.message : "Unexpected error";

    return res.status(status).json({ error: message });
  }
}

export async function deleteProductByID(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const updatedProduct = await ProductsService.deleteProduct(id);

    return res.status(200).json(updatedProduct);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message =
      error instanceof HttpError ? error.message : "Unexpected error";

    return res.status(status).json({ error: message });
  }
}
