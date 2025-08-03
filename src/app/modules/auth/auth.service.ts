/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";
import { isActive, IUser } from "../user/user.interface"
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken"
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";



const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }
}

const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    // const user = await User.findById(decodedToken.userId)
    const user = await User.findById(decodedToken._id)

    if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
    
    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)
    if(!isOldPasswordMatch){
        throw new AppError(httpStatus.UNAUTHORIZED, "Old password doesn't match");
    }

    user.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    await user.save();

}

export const AuthServices = {
    // credentialsLogin,
    getNewAccessToken,
    resetPassword
}