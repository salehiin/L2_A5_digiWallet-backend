import { Request, Response } from 'express';
import * as txService from './transaction.service';

export const createTransactionController = async (req: Request, res: Response) => {
  const tx = await txService.createTransaction({ ...req.body, createdBy: req.user!.id });
  res.json(tx);
};

export const getAllTransactions = async (_req: Request, res: Response) => {
  const txs = await txService.listAllTransactions();
  res.json(txs);
};

export const getMyTransactions = async (_req: Request, res: Response) => {
  const txs = await txService.listTransactionsForUser(req.user!.id);
  res.json(txs);
};
