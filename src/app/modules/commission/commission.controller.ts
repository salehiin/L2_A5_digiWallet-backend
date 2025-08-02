import { Request, Response, NextFunction } from "express";
import { CommissionService } from "./commission.service";
import httpStatus from "http-status-codes";

const createCommission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commissionData = req.body;
    const result = await CommissionService.createCommission(commissionData);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Commission created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCommissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CommissionService.getAllCommissions();

    res.status(httpStatus.OK).json({
      success: true,
      message: "All commissions retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCommission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await CommissionService.getSingleCommission(id);

    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Commission not found",
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Commission retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CommissionController = {
  createCommission,
  getAllCommissions,
  getSingleCommission,
};
