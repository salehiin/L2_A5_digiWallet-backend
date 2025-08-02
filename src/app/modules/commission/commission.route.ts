import express from "express";
import { getAllCommission } from "./commission.controller";
import { checkAuth } from "../../middlewares/checkAuth";
const router = express.Router();

router.get("/", checkAuth("admin", "superadmin"), getAllCommission);

export const CommissionRoutes = router;
