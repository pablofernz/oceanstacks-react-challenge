import { Router } from "express";

import {
  getProducts,
  createProduct,
  editProductByID,
  deleteProductByID,
} from "../controllers/products.controller.js";

export const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.post("/", createProduct);
productsRouter.patch("/:id", editProductByID);
productsRouter.delete("/:id", deleteProductByID);
