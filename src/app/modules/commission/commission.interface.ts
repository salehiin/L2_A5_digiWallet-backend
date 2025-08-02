export interface ICommission {
  transactionId: string;
  amount: number;
  fromWalletId: string;
  adminId: string;
  createdAt: Date;
}