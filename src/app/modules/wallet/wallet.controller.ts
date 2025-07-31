import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { WalletService } from "./wallet.service";

const createWallet = catchAsync(async (req: Request, res: Response) => {
  const result = await WalletService.createWallet(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Wallet created successfully",
    data: result,
  });
});

const getAllWallets = catchAsync(async (req: Request, res: Response) => {
  const result = await WalletService.getAllWallets(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Wallets retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getWalletByUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await WalletService.getWalletByUser(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Wallet retrieved successfully",
    data: result,
  });
});

const updateWallet = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await WalletService.updateWallet(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Wallet updated successfully",
    data: result,
  });
});

const deleteWallet = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await WalletService.deleteWallet(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Wallet deleted successfully",
    data: result,
  });
});

export const WalletController = {
  createWallet,
  getAllWallets,
  getWalletByUser,
  updateWallet,
  deleteWallet,
};
