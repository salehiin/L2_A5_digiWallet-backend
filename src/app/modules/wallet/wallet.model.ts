import { Schema, model } from "mongoose";
import { IWallet } from "./wallet.interface";

const walletSchema = new Schema<IWallet>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, 
        },
        balance: {
            type: Number,
            default: 0,
        },
        currency: {
            type: String,
            required: true,
            default: "BDT",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Wallet = model<IWallet>("Wallet", walletSchema);
