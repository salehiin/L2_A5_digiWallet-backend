// src/modules/wallet/wallet.route.ts
import express from "express";
import { WalletController } from "./wallet.controller";

const router = express.Router();

router.post("/", WalletController.createWallet);
router.get("/", WalletController.getAllWallets);
// router.get("/:id", WalletController.getSingleWallet);

export const WalletRoutes = router;
