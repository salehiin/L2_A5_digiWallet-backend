import mongoose, { Schema, Document } from 'mongoose';

export interface IWallet extends Document {
  userId: mongoose.Types.ObjectId;
  balance: number;
  isLocked: boolean;
}

const walletSchema = new Schema<IWallet>({
  userId: { type: mongoose.Types.ObjectId, required: true, unique: true, ref: 'User' },
  balance: { type: Number, required: true, default: 0 },
  isLocked: { type: Boolean, default: false },
});

export const WalletModel = mongoose.model<IWallet>('Wallet', walletSchema);
