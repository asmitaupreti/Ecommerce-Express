import { Router } from "express";
import { errorHandler } from "../error.handler";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProduct,
  updateProduct,
} from "../controllers/products.controller";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";

const productRoutes: Router = Router();
productRoutes.post(
  "/",
  authMiddleware,
  adminMiddleware,
  errorHandler(createProduct)
);
productRoutes.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  errorHandler(updateProduct)
);
productRoutes.delete(
  "/",
  authMiddleware,
  adminMiddleware,
  errorHandler(deleteProduct)
);
productRoutes.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  errorHandler(listProduct)
);
productRoutes.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  errorHandler(getProductById)
);

export default productRoutes;
