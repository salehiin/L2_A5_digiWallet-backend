import { Request, Response } from 'express';
import * as walletService from './wallet.service';
import * as txService from '../transaction/transaction.service';
import { createTransaction } from '../transaction/transaction.service';

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
  const createdBy = req.user!.id;
  const userId = req.user!.id;
  const tx = await createTransaction({ to: userId, amount, type: 'deposit', createdBy });
  res.json(tx);
};

export const withdraw = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const createdBy = req.user!.id;
  const userId = req.user!.id;
  const tx = await createTransaction({ from: userId, amount, type: 'withdraw', createdBy });
  res.json(tx);
};

export const sendMoney = async (req: Request, res: Response) => {
  const { amount, toUserId } = req.body;
  const createdBy = req.user!.id;
  const from = req.user!.id;
  const to = toUserId;
  const tx = await createTransaction({ from, to, amount, type: 'send', createdBy });
  res.json(tx);
};

export const getMyTransactions = async (_req: Request, res: Response) => {
  const userId = _req.user!.id;
  const txs = await txService.listTransactionsForUser(userId);
  res.json(txs);
};

export const WalletController = {
  createWallet: async (req: Request, res: Response) => {
    const result = await WalletService.createWallet(req.body);
    res.status(201).json(result);
  },

  getWalletByUserId: async (req: Request, res: Response) => {
    const result = await WalletService.getWalletByUserId(req.params.userId);
    res.status(200).json(result);
  },
};