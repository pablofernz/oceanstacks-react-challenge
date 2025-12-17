import { Request, Response } from "express";
import { IncomingOrderProduct } from "../types/index.js";
import * as OrdersService from "../services/orders.service.js";
import { HttpError } from "../libs/httpError.js";

export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await OrdersService.getAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message =
      error instanceof HttpError ? error.message : "Unexpected error";

    return res.status(status).json({ error: message });
  }
}

export async function createOrder(req: Request, res: Response) {
  try {
    const body = req.body as { products?: IncomingOrderProduct[] };
    const products = body.products;

    if (!products) {
      return res
        .status(400)
        .json({ error: "Missing products in request body" });
    }

    const newOrder = await OrdersService.createOrder(products);

    return res.status(201).json(newOrder);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message =
      error instanceof HttpError ? error.message : "Unexpected error";

    return res.status(status).json({ error: message });
  }
}

export async function deleteOrderByID(req: Request, res: Response) {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Missing order ID in request params" });
    }

    const message = await OrdersService.deleteOrder(id);

    return res.status(200).json(message);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const message =
      error instanceof HttpError ? error.message : "Unexpected error";

    return res.status(status).json({ error: message });
  }
}
