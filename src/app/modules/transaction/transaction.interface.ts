import { Types } from "mongoose";

export interface ITransaction {
  from: Types.ObjectId | null; // null if it's a top-up
  to: Types.ObjectId | null;   // null if it's a withdrawal
  amount: number;
  type: "deposit" | "withdrawal" | "transfer";
  description?: string;
  status?: "pending" | "completed" | "failed";
}
