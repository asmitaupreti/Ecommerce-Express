import { Router } from "express";
import { currentUser, login, signup } from "../controllers/auth.controller";
import { errorHandler } from "../error.handler";
import authMiddleware from "../middlewares/auth.middleware";

const authRoutes: Router = Router();
authRoutes.post("/login", errorHandler(login));

authRoutes.post("/signup", errorHandler(signup));
authRoutes.get("/current-user", authMiddleware, errorHandler(currentUser));
export default authRoutes;
