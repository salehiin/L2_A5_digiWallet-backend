// src/modules/transaction/transaction.route.ts
import express from "express";
import { TransactionController } from "./transaction.controller";

const router = express.Router();

router.post("/", TransactionController.createTransaction);
router.get("/", TransactionController.getAllTransactions);
router.get("/:id", TransactionController.getSingleTransaction);

export const TransactionRoutes = router;
