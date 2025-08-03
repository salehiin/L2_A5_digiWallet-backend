/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Types } from 'mongoose';
import { WalletModel } from './wallet.model';
import { IWallet } from './wallet.interface';

export const createWallet = async (data: { userId: string; balance: number; isLocked: boolean }): Promise<IWallet> => {
  const wallet = new WalletModel({
    ...data,
    status: 'active',
    currency: 'USD',
  });
  return wallet.save();
};

export async function getWalletByUserId(userId: string): Promise<IWallet | null> {
  return WalletModel.findOne({ userId: new Types.ObjectId(userId) });
}

export async function updateWalletBalance(userId: mongoose.Types.ObjectId, amount: number, session?: mongoose.ClientSession): Promise<IWallet | null> {
  return WalletModel.findOneAndUpdate(
    { userId },
    { $inc: { balance: amount } },
    { new: true }
  );
}

export async function blockWallet(userId: string, isLocked: boolean): Promise<IWallet | null> {
  return WalletModel.findOneAndUpdate({ userId }, { isLocked }, { new: true });
}

export async function listAllWallets(): Promise<IWallet[]> {
  return WalletModel.find().populate('userId').lean();
}
