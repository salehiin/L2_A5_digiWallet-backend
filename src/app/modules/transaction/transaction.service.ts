import { TransactionModel, ITransaction } from './transaction.model';
import * as walletService from '../wallet/wallet.service';
import mongoose from 'mongoose';

export async function createTransaction(data: Partial<ITransaction>): Promise<ITransaction> {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { from, to, amount, type, createdBy } = data;

    if (from) {
      const wFrom = await walletService.getWalletByUserId(from.toString());
      if (!wFrom) throw new Error('Sender wallet not found');
      if (wFrom.blocked) throw new Error('Sender wallet is blocked');
      if (wFrom.balance < amount!) throw new Error('Insufficient funds');

      // Deduct balance from sender
      await walletService.updateWalletBalance(wFrom._id.toString(), -amount!, session);
    }

    if (to) {
      const wTo = await walletService.getWalletByUserId(to.toString());
      if (!wTo) throw new Error('Recipient wallet not found');
      if (wTo.blocked) throw new Error('Recipient wallet is blocked');

      // Add balance to receiver
      await walletService.updateWalletBalance(wTo._id.toString(), amount!, session);
    }

    const tx = await TransactionModel.create([data], { session });

    await session.commitTransaction();
    return tx[0];
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

export async function listTransactionsForUser(userId: string): Promise<ITransaction[]> {
  return TransactionModel.find({ createdBy: userId }).sort({ createdAt: -1 }).lean();
}

export async function listAllTransactions(): Promise<ITransaction[]> {
  return TransactionModel.find().sort({ createdAt: -1 }).populate('from to createdBy').lean();
}
