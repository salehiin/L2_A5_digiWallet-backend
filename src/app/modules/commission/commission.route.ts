// src/modules/commission/commission.route.ts
import express from "express";
import { CommissionController } from "./commission.controller";

const router = express.Router();

router.post("/", CommissionController.createCommission);
router.get("/", CommissionController.getAllCommissions);
router.get("/:id", CommissionController.getSingleCommission);

export const CommissionRoutes = router;
