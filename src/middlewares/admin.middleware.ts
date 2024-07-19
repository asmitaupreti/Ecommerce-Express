import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { ErrorCode } from "../exceptions/root.exception";

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user || user.role !== "ADMIN") {
      return next(
        new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED)
      );
    }

    next();
  } catch (error) {
    next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
  }
};

export default adminMiddleware;
