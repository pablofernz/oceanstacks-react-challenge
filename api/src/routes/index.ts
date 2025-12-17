import { Router } from "express";

import { ordersRouter } from "./orders.routes.js";
import { productsRouter } from "./products.routes.js";

export const router: Router = Router();

router.use("/products", productsRouter);
router.use("/orders", ordersRouter);
