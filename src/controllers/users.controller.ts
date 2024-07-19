import { Request, Response } from "express";
import { addressSchema, updateUserSchema } from "../schema/user.schema";
import { NotFoundException } from "../exceptions/not-found.exception";
import { ErrorCode } from "../exceptions/root.exception";
import { Address, Prisma, User } from "@prisma/client";
import { prismaClient } from "..";

export const addAddress = async (req: Request, res: Response) => {
  addressSchema.parse(req.body);
  try {
    const user: User = await prismaClient.user.findFirstOrThrow({
      where: {
        id: req.user?.id,
      },
    });
    const address = await prismaClient.address.create({
      data: {
        ...req.body,
        userId: user.id,
      },
    });
    res.json(address);
  } catch (error) {
    throw new NotFoundException("Product not found", ErrorCode.USER_NOT_FOUND);
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const deletedAddress = await prismaClient.address.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json(deletedAddress);
  } catch (error) {
    throw new NotFoundException("Product not found", ErrorCode.USER_NOT_FOUND);
  }
};

export const listAddress = async (req: Request, res: Response) => {
  try {
    const address = await prismaClient.address.findMany({
      where: {
        userId: req.user?.id,
      },
    });
    res.json(address);
  } catch (error) {
    throw new NotFoundException("Product not found", ErrorCode.USER_NOT_FOUND);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);
    let shippingAddress: Address;
    let billingAddress: Address;
    if (validatedData.defaultShippingAddress) {
      shippingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddress,
        },
      });
    }

    if (validatedData.defaultBillingAddress) {
      billingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddress,
        },
      });
    }

    // Update user with validated data
    const updatedUser = await prismaClient.user.update({
      where: {
        id: req.user?.id!,
      },
      data: validatedData,
    });
    res.json(updateUser);
  } catch (error) {
    throw new NotFoundException("Product not found", ErrorCode.USER_NOT_FOUND);
  }
};
