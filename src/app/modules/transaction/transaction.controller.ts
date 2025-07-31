import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TransactionService } from "./transaction.service";

const createTransaction = catchAsync(async (req: Request, res: Response) => {
  const result = await TransactionService.createTransaction(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Transaction recorded successfully",
    data: result,
  });
});

const getAllTransactions = catchAsync(async (req: Request, res: Response) => {
  const result = await TransactionService.getAllTransactions(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transactions retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getTransactionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TransactionService.getTransactionById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction retrieved successfully",
    data: result,
  });
});

const deleteTransaction = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TransactionService.deleteTransaction(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction deleted successfully",
    data: result,
  });
});

export const TransactionController = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  deleteTransaction,
};
