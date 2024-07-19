import { Router } from "express";
import authRoutes from "./auth.route";
import productRoutes from "./products.route";
import userRoutes from "./users.route";
import cartRoutes from "./carts.rotue";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productRoutes);
rootRouter.use("/users", userRoutes);
rootRouter.use("/carts", cartRoutes);
export default rootRouter;
