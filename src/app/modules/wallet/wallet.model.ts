import { Schema, model } from "mongoose";
import { IWallet } from "./wallet.interface";

const walletSchema = new Schema<IWallet>(
  {
    userId: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
    currency: { type: String, required: true, default: "USD" },
    status: {
      type: String,
      enum: ["active", "suspended", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const Wallet = model<IWallet>("Wallet", walletSchema);
