export interface ITransaction {
  _id?: string;
  walletId: string;
  amount: number;
  type: "credit" | "debit";
  description?: string;
  status: "pending" | "completed" | "failed";
  createdAt?: Date;
  updatedAt?: Date;
}
