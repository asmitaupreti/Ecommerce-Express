import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-request.exception";
import { ErrorCode } from "../exceptions/root.exception";
import { UnprocessableEntityException } from "../exceptions/validation.exception";
import { signupSchema } from "../schema/user.schema";
import { NotFoundException } from "../exceptions/not-found.exception";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  signupSchema.parse(req.body);
  const { email, password, name } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw new BadRequestsException(
      "User already exist!",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });
  res.json(user);
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
  if (!compareSync(password, user.password)) {
    throw new BadRequestsException(
      "Incorrect Password",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );
  res.json({ user, token });
};

//return logged in user
const currentUser = (req: Request, res: Response) => {
  res.json(req.user);
};

export { login, signup, currentUser };
