/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { Transaction, ITransaction } from './transaction.model';
// import { Transaction, ITransaction } from './transaction.model';
import { getWalletByUserId } from '../wallet/wallet.service'
import { updateWalletBalance } from '../wallet/wallet.service'

import { Transaction } from './transaction.model';
import { ITransaction } from './transaction.interface';
import mongoose from 'mongoose';

export async function createTransaction(data: Partial<ITransaction>): Promise<ITransaction> {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // const { from, to, amount, type, createdBy } = data;
    const from = data.from;
    const to = data.to;
    const amount = data.amount;

    if (data.from) {
      const wFrom = await getWalletByUserId(data.from.toString());
      if (!data.from) throw new Error('Missing sender');
      if (!data.to) throw new Error('Missing recipient');
      if (!data.amount) throw new Error('Missing amount');

      await updateWalletBalance(new mongoose.Types.ObjectId(data._id), -data.amount, session);
    }


    if (data.to) {
      const wTo = await getWalletByUserId(data.to.toString());
      if (!wTo || !wTo._id) throw new Error('Recipient wallet not found or invalid');
      if (wTo.isLocked) throw new Error('Recipient wallet is blocked');

      await updateWalletBalance(new mongoose.Types.ObjectId(wTo._id), data.amount!, session);
    }


    const tx = await Transaction.create([data], { session });

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
  return Transaction.find({ createdBy: userId }).sort({ createdAt: -1 }).lean();
}

export async function listAllTransactions(): Promise<ITransaction[]> {
  return Transaction.find().sort({ createdAt: -1 }).populate('from to createdBy').lean();
}
