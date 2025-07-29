import { Types } from "mongoose";


export enum Role{
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    AGENT = "AGENT",
}

export interface IAuthProvider {
    provider: "google" | "credentials";
    providerId: string;
}

export enum isActive{
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IUser{
    _id?: Types.ObjectId
    name: string;
    age: number;
    email: string;
    password?: string;
    phone: string;
    picture?: string;
    address?: string;
    isDeleted?: string;
    isActive?: isActive;
    isVerified?: boolean;
    role: Role;
    auths: IAuthProvider[];
    // role: "USER" | "ADMIN" | "AGENT"
    
    transactions?: Types.ObjectId[]
    agents?: Types.ObjectId[]
}
