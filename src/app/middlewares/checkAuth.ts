import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import httpStatus from "http-status-codes";
import { isActive } from "../modules/user/user.interface";
import { verifyToken } from "../utils/jwt";
import { User } from "../modules/user/user.model";


export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "No token received")
        }

        // const token = accessToken.split(" ")[1];
        const token = accessToken.startsWith("Bearer ")
            ? accessToken.split(" ")[1]
            : accessToken;
        const decoded = verifyToken(
            token,
            envVars.JWT_ACCESS_SECRET
        ) as JwtPayload & { _id: string; email: string; role: string };

        //------------------------------------------------------------------------------------------------

        const isUserExist = await User.findOne({ email: decoded.email });

        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exist")
        }
        if (isUserExist.isActive === isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE) {
            throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
        }
        if (isUserExist.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, "User is deleted")
        }

        // ---------------------------------------------------------------------------------------------


        // const userRole = decoded.role?.toLowerCase();

        // if (!userRole || (authRoles.length && !authRoles.includes(userRole))) {
        //     throw new AppError(403, "You are not permitted to view this route");
        // }

        const userRole = decoded.role?.toLowerCase();
        const normalizedAuthRoles = authRoles.map(role => role.toLowerCase());

        if (!userRole || (normalizedAuthRoles.length && !normalizedAuthRoles.includes(userRole))) {
            throw new AppError(403, "You are not permitted to view this route");
        }


        req.user = {
            // _id: decoded._id,
            _id: decoded.userId,
            email: decoded.email,
            // role: userRole,
            role: decoded.role,
        };
        next()

    } catch (error) {
        next(error)
    }
}