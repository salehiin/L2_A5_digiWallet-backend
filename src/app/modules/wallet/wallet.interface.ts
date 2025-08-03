import { Types } from "mongoose";

export interface IWallet {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  balance: number;
  currency: string; // e.g., "USD", "BDT"
  status: "active" | "suspended" | "closed";
  createdAt?: Date;
  updatedAt?: Date;
  isLocked: boolean;
}


// export interface IWallet {
//   _id?: Types.ObjectId;
//   userId: Types.ObjectId;
//   balance: number;
//   isLocked: boolean;
// }
