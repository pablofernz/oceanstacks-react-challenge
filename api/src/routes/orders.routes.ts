import { Router } from "express";

import {
  getAllOrders,
  createOrder,
  deleteOrderByID,
} from "../controllers/orders.controller.js";

export const ordersRouter = Router();

ordersRouter.get("/", getAllOrders);
ordersRouter.post("/", createOrder);
ordersRouter.delete("/:id", deleteOrderByID);
