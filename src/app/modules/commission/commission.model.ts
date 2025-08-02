import { Schema, model } from "mongoose";
import { ICommission } from "./commission.interface";

const commissionSchema = new Schema<ICommission>({
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  fromWalletId: { type: String, required: true },
  adminId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Commission = model<ICommission>("Commission", commissionSchema);
