// src/modules/wallet/wallet.service.ts

import { Wallet } from "./wallet.model";
import { IWallet } from "./wallet.interface";

const createWallet = async (payload: IWallet): Promise<IWallet> => {
  const wallet = await Wallet.create(payload);
  return wallet;
};

const getAllWallets = async (): Promise<IWallet[]> => {
  const wallets = await Wallet.find();
  return wallets;
};

const getSingleWallet = async (id: string): Promise<IWallet | null> => {
  const wallet = await Wallet.findById(id);
  return wallet;
};

const updateWallet = async (
  id: string,
  payload: Partial<IWallet>
): Promise<IWallet | null> => {
  const updatedWallet = await Wallet.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedWallet;
};

const deleteWallet = async (id: string): Promise<IWallet | null> => {
  const wallet = await Wallet.findByIdAndDelete(id);
  return wallet;
};

export const WalletService = {
  createWallet,
  getAllWallets,
  getSingleWallet,
  updateWallet,
  deleteWallet,
};
