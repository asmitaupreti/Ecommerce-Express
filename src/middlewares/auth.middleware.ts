import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { ErrorCode } from "../exceptions/root.exception";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { User } from "@prisma/client";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //1. extract the token from header
  const token = req.headers.authorization!;
  //2. if token is not present, throw an error of unauthorized
  if (!token) {
    next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
    } else {
      req.user = user as User;
    }
    next();
  } catch (error) {
    next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
  }
  //3. if the token is present, verify that token and extract the payload

  //4. to get the user from the payload
  //5. to attach the user to the current request object
};

export default authMiddleware;
