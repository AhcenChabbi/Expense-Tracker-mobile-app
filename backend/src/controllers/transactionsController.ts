import { Request, Response } from "express";
import { BAD_REQUEST, CREATED, OK } from "../constants/http";
import { prisma } from "../lib/prisma";
import { transactionSchema } from "../lib/validation";
import catchErrors from "../utils/catchErrors";
import { getAuth } from "@clerk/express";
import appAssert from "../utils/appAssert";

export const getSummaryByUserId = catchErrors(
  async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    appAssert(userId, BAD_REQUEST, "User ID is required");
    const {
      _sum: { amount: balance },
    } = await prisma.transaction.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
    });
    const {
      _sum: { amount: totalIncomes },
    } = await prisma.transaction.aggregate({
      where: { userId, amount: { gt: 0 } },
      _sum: { amount: true },
    });
    const {
      _sum: { amount: totalExpenses },
    } = await prisma.transaction.aggregate({
      where: {
        AND: [
          {
            userId,
            amount: {
              lt: 0,
            },
          },
        ],
      },
      _sum: {
        amount: true,
      },
    });

    return res.status(OK).json({
      balance: Number(balance) ?? 0,
      totalIncomes: Number(totalIncomes) ?? 0,
      totalExpenses: Number(totalExpenses) ?? 0,
    });
  }
);

export const createTransaction = catchErrors(
  async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    appAssert(userId, BAD_REQUEST, "User ID is required");
    const { amount, category, title, transactionType } =
      transactionSchema.parse(req.body);
    const transaction = await prisma.transaction.create({
      data: {
        amount: transactionType === "expense" ? -amount : amount,
        title,
        category,
        userId,
      },
    });
    return res.status(CREATED).json(transaction);
  }
);

export const getTransactionsByUserId = catchErrors(
  async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    appAssert(userId, BAD_REQUEST, "User ID is required");
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(OK).json(transactions);
  }
);

export const deleteTransaction = catchErrors(
  async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    appAssert(userId, BAD_REQUEST, "User ID is required");
    const { id } = req.params;
    const transaction = await prisma.transaction.delete({
      where: {
        id,
        userId,
      },
    });
    return res.status(OK).json(transaction);
  }
);
