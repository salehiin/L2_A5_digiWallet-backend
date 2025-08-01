export interface IWallet {
  _id?: string;
  userId: string;
  balance: number;
  currency: string; // e.g., "USD", "BDT"
  status: "active" | "suspended" | "closed";
  createdAt?: Date;
  updatedAt?: Date;
}
