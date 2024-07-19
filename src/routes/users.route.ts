import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { errorHandler } from "../error.handler";
import {
  addAddress,
  deleteAddress,
  updateUser,
} from "../controllers/users.controller";

const userRoutes: Router = Router();

userRoutes.post("/adress", authMiddleware, errorHandler(addAddress));
userRoutes.delete("/address/:id", authMiddleware, errorHandler(deleteAddress));
userRoutes.get("/adress", authMiddleware, errorHandler(addAddress));
userRoutes.put("/", authMiddleware, errorHandler(updateUser));
export default userRoutes;
