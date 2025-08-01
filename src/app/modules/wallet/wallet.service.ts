import { WalletModel, IWallet } from './wallet.model';

export async function getWalletByUserId(userId: string): Promise<IWallet | null> {
  return WalletModel.findOne({ user: userId }).lean();
}

export async function updateBalance(userId: string, amount: number): Promise<IWallet | null> {
  return WalletModel.findOneAndUpdate(
    { user: userId },
    { $inc: { balance: amount } },
    { new: true }
  );
}

export async function blockWallet(userId: string, blocked: boolean): Promise<IWallet | null> {
  return WalletModel.findOneAndUpdate({ user: userId }, { blocked }, { new: true });
}

export async function listAllWallets(): Promise<IWallet[]> {
  return WalletModel.find().populate('user').lean();
}
