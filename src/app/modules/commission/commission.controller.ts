import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/AppError";
import { CommissionService } from "./commission.service";

// ✅ Get All Commissions – Only Admins & Super Admins
export const getAllCommission = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const role = ((req.user as any)?.role || "").toLowerCase();

  if (role !== "admin" && role !== "super_admin") {
  throw new AppError(httpStatus.FORBIDDEN, "Access denied");
}

  const result = await CommissionService.getAllCommissions();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Commissions fetched successfully",
    data: result,
  });
});

