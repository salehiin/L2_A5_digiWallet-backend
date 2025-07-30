import z from "zod";
import { isActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
        // name: z.string({ invalid_type_error: "Nmae must be string" }).min(2, { message: "Name too short" }).max(50, { message: "Name max length 50" }),
        name: z.object({
            firstName: z.string({ invalid_type_error: "Nmae must be string" }).min(2, { message: "Name too short" }).max(50, { message: "Name max length 50" }),
            lastName: z.string({ invalid_type_error: "Nmae must be string" }).min(2, { message: "Name too short" }).max(50, { message: "Name max length 50" }),
        }),
        email: z.string().email(), //m27.2 09:28
        password: z
        .string({invalid_type_error: "Password must be string"})
        .min(8, {message: "Password must be at least 8 characters long."})
            .regex(/^(?=.*[A-Z])/, {
                message: "Password most contain at least 1 uppercase letter.",
            })
            .regex(/^(?=.*[!@#$%^&*])/, {
                message: "Password most contain at least 1 special chracter.",
            })
            .regex(/^(?=.*\d)/, {
                message: "Password most contain at least 1 number.",
            }),
        phone: z
            .string({ invalid_type_error: "Phone Number must be string" })
            .regex(/^(?:\+8801\d{9})$/, {
                message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
            })
            .optional(),
        address: z
            .string({ invalid_type_error: "Address must be string" })
            .max(200, { message: "Address cannot exceed 200 chracters." })
            .optional()
    })

export const updateUserZodSchema = z.object({
        name: z.string({ invalid_type_error: "Nmae must be string" }).min(2, { message: "Name too short" }).max(50, { message: "Name max length 50" }).optional(),
        
        password?: z.string().min(8)
            .regex(/^(?=.*[A-Z])/, {
                message: "Password most contain at least 1 uppercase letter.",
            })
            .regex(/^(?=.*[!@#$%^&*])/, {
                message: "Password most contain at least 1 special chracter.",
            })
            .regex(/^(?=.*\d)/, {
                message: "Password most contain at least 1 number.",
            }).optional(),
        phone: z
            .string({ invalid_type_error: "Phone Number must be string" })
            .regex(/^(?:\+8801\d{9})$/, {
                message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
            })
            .optional(),
        role: z
            .enum(Object.values(Role) as [string])
            .optional(),
        isActive: z
            .enum(Object.values(isActive) as [string])
            .optional(),
        isDeleted: z
            .boolean({invalid_type_error: "isDeleted must be true or false"})
            .optional(),
        isVerified: z
            .boolean({invalid_type_error: "isVerified must be true or false"})
            .optional(),                  
        address: z
            .string({ invalid_type_error: "Address must be string" })
            .max(200, { message: "Address cannot exceed 200 chracters." })
            .optional()
    })