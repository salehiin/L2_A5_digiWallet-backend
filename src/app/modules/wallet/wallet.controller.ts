import { Request, Response } from 'express';
import * as walletService from './wallet.service';
import * as txService from '../transaction/transaction.service';
import { createTransaction } from '../transaction/transaction.service';
import * as WalletService from './wallet.service';




export const createWallet = async (req: Request, res: Response) => {
  try {
    const { userId, initialBalance } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Check if wallet exists
    const existingWallet = await WalletService.getWalletByUserId(userId);
    if (existingWallet) {
      return res.status(400).json({ message: "Wallet already exists for this user" });
    }

    const wallet = await WalletService.createWallet({
      userId,
      balance: initialBalance || 0,
      isLocked: false,
    });

    return res.status(201).json({
      success: true,
      message: "Wallet created successfully",
      data: wallet,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create wallet", error });
  }
};

export const getAllWallets = async (req: Request, res: Response) => {
  const wallets = await walletService.listAllWallets();
  res.json(wallets);
};

export const getSingleWallet = async (req: Request, res: Response) => {
  const w = await walletService.getWalletByUserId(req.params.id);
  if (!w) return res.status(404).json({ message: 'Wallet not found' });
  res.json(w);
};

export const deposit = async (req: Request, res: Response) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid deposit amount' });
  }

  const createdBy = req.user!.id;
  const userId = req.user!.id;

  try {
    const tx = await createTransaction({ to: userId, amount, type: 'deposit', createdBy });
    res.status(200).json(tx);
  } catch (error) {
    res.status(500).json({ message: 'Deposit failed', error });
  }
};


export const withdraw = async (req: Request, res: Response) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid withdrawal amount' });
  }

  const createdBy = req.user!.id;
  const userId = req.user!.id;

  try {
    const tx = await createTransaction({ from: userId, amount, type: 'withdraw', createdBy });
    res.status(200).json(tx);
  } catch (error) {
    res.status(500).json({ message: 'Withdrawal failed', error });
  }
};


export const sendMoney = async (req: Request, res: Response) => {
  const { amount, toUserId } = req.body;

  if (!toUserId || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid recipient or amount' });
  }

  const createdBy = req.user!.id;
  const from = req.user!.id;
  const to = toUserId;

  try {
    const tx = await createTransaction({ from, to, amount, type: 'send', createdBy });
    res.status(200).json(tx);
  } catch (error) {
    res.status(500).json({ message: 'Send money failed', error });
  }
};


export const getMyTransactions = async (_req: Request, res: Response) => {
  const userId = _req.user!.id;
  const txs = await txService.listTransactionsForUser(userId);
  res.json(txs);
};

// export const WalletController = {
//   createWallet: async (req: Request, res: Response) => {
//     const result = await WalletService.createWallet(req.body);
//     res.status(201).json(result);
//   },

//   getWalletByUserId: async (req: Request, res: Response) => {
//     const result = await WalletService.getWalletByUserId(req.params.userId);
//     res.status(200).json(result);
//   },
// };