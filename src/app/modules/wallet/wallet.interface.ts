import { Types } from "mongoose";

export interface IWallet {
  _id?: Types.ObjectId;
  userId: string;
  balance: number;
  currency: string; // e.g., "USD", "BDT"
  status: "active" | "suspended" | "closed";
  createdAt?: Date;
  updatedAt?: Date;
}
