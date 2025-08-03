// import mongoose, { Schema, Document } from 'mongoose';

// export interface IWallet extends Document {
//   userId: mongoose.Types.ObjectId;
//   balance: number;
//   isLocked: boolean;
// }

// const walletSchema = new Schema<IWallet>({
//   userId: { type: Schema.Types.ObjectId, required: true, unique: true, ref: 'User' },
//   balance: { type: Number, required: true, default: 0 },
//   isLocked: { type: Boolean, default: false },
// }, { timestamps: true });

// export const WalletModel = mongoose.model<IWallet>('Wallet', walletSchema);


import mongoose, { Schema, model, Types } from 'mongoose';
import { IWallet } from './wallet.interface'; // if you moved it

const walletSchema = new Schema<IWallet>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, unique: true, ref: 'User' },
    balance: { type: Number, required: true, default: 0 },
    isLocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const WalletModel = model<IWallet>('Wallet', walletSchema);
