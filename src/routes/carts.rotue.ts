import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  addItemToCart,
  changeQuantity,
  deleteItemFromCart,
  getCart,
} from "../controllers/cart.controller";

const cartRoutes: Router = Router();
cartRoutes.post("/", authMiddleware, addItemToCart);
cartRoutes.delete("/:id", authMiddleware, deleteItemFromCart);
cartRoutes.put("/:id", authMiddleware, changeQuantity);
cartRoutes.get("/", authMiddleware, getCart);

export default cartRoutes;
