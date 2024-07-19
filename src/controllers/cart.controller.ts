import { Request, Response } from "express";
import { changeQuantitySchema, createCartSchema } from "../schema/cart.schema";
import { NotFoundException } from "../exceptions/not-found.exception";
import { ErrorCode } from "../exceptions/root.exception";
import { Product } from "@prisma/client";
import { prismaClient } from "..";

export const addItemToCart = async (req: Request, res: Response) => {
  //check for the existence of the same product in user's cart and alter the quantity as required
  const validatedData = createCartSchema.parse(req.body);
  try {
    let product: Product;

    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId,
      },
    });

    const cart = await prismaClient.cartItem.create({
      data: {
        userId: req.user?.id!,
        productId: product.id,
        quantity: validatedData.quantity,
      },
    });
    res.json(cart);
  } catch (error) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
  //check if the user is deleting the the cart associated to them or not
  try {
    const cartItem = await prismaClient.cartItem.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json(cartItem);
  } catch (error) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const changeQuantity = async (req: Request, res: Response) => {
  //check if the user is updated the the cart associated to them or not

  const validatedData = changeQuantitySchema.parse(req.body);
  const updatedCart = await prismaClient.cartItem.update({
    where: {
      id: +req.params.id,
    },
    data: {
      quantity: validatedData.quantity,
    },
  });

  res.json(updatedCart);
};

export const getCart = async (req: Request, res: Response) => {
  const cart = await prismaClient.cartItem.findMany({
    where: {
      userId: req.user?.id,
    },
    include: {
      product: true,
    },
  });
  res.json(cart);
};
