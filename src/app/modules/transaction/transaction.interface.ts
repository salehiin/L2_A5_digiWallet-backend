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


export interface ITransaction {
  senderId: string;
  receiverId: string;
  amount: number;
  commissionAmount: number;
  timestamp: Date;
}
