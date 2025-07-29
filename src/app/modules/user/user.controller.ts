


import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { error } from "console";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { UserServices } from "./user.service";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body)

   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        data: user,
    })
})

const updateUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    

    const verifiedToken = req.user;

    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken as JwtPayload)

    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated successfully",
        data: user,
    })
})

const getAllUsers = catchAsync( async(req: Request, res: Response, next: NextFunction) => {
    
        const result = await UserServices.getAllUsers();

        sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All users retrived successfully",
        data: result.data,
        meta: result.meta
    })
    
})

export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
}