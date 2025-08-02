import { Request, Response } from "express";
// import { Wallet } from "../wallet/wallet.model";
import { Transaction } from "../transaction/transaction.model";
import { Commission } from "../commission/commission.model";
import httpStatus from "http-status-codes";
import { isActive } from "../user/user.interface";
import { WalletModel } from "../wallet/wallet.model";


// ✅ 1. Get All Transactions (Admin Only)
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    res.status(httpStatus.OK).json({
      success: true,
      message: 'All transactions fetched successfully',
      data: transactions,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch transactions',
    });
  }
};

// ✅ 2. Get My Transactions (User / Agent)
export const getMyTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const wallet = await WalletModel.findOne({ userId });

    if (!wallet) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Wallet not found for this user',
      });
    }

    const transactions = await Transaction.find({ walletId: wallet._id }).sort({ createdAt: -1 });

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Your transactions fetched successfully',
      data: transactions,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch user transactions',
    });
  }
};

// ✅ 3. Send Money (Already exists)
export const sendMoney = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, amount } = req.body;

    if (!senderId || !receiverId || !amount) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Missing required fields" });
    }

    if (senderId === receiverId) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Sender and Receiver must be different" });
    }

    const senderWallet = await WalletModel.findOne({ userId: senderId });
    const receiverWallet = await WalletModel.findOne({ userId: receiverId });

    if (!senderWallet || !receiverWallet) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Sender or Receiver wallet not found" });
    }

    const commissionRate = 0.05;
    const commissionAmount = amount * commissionRate;
    const totalDeduct = amount + commissionAmount;

    if (senderWallet.balance < totalDeduct) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Insufficient balance" });
    }

    // ✅ Update Wallets
    senderWallet.balance -= totalDeduct;
    receiverWallet.balance += amount;
    await senderWallet.save();
    await receiverWallet.save();

    // ✅ Log Transactions
    await Transaction.create([
      {
        walletId: senderWallet._id,
        amount: amount,
        type: "debit",
        description: `Sent to user ${receiverId}`,
        status: "completed",
        createdAt: new Date(),
      },
      {
        walletId: receiverWallet._id,
        amount: amount,
        type: "credit",
        description: `Received from user ${senderId}`,
        status: "completed",
        createdAt: new Date(),
      },
      {
        walletId: senderWallet._id,
        amount: commissionAmount,
        type: "debit",
        description: "Commission deducted",
        status: "completed",
        createdAt: new Date(),
      }
    ]);

    // ✅ Log Commission
    await Commission.create({
      transactionId: "N/A",
      amount: commissionAmount,
      adminId: "admin_001",
      createdAt: new Date(),
    });

    return res.status(httpStatus.OK).json({
      message: "Transfer successful",
      data: {
        senderId,
        receiverId,
        amountSent: amount,
        commissionAmount,
      },
    });

  } catch (error) {
    console.error("Send Money Error:", error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};

// // ✅ Export all controllers
// export {
//   getAllTransactions,
//   getMyTransactions,
//   sendMoney
// };
