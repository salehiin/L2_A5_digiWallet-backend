import z from "zod";
import { isActive, Role } from "./user.interface";

// import { z } from "zod";
// import { Role, isActive } from "../user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter",
    })
    .regex(/(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character",
    })
    .regex(/(?=.*\d)/, {
      message: "Password must contain at least 1 number",
    }),

  phone: z
    .string()
    .regex(/^\+8801\d{9}$/, {
      message: "Phone number must be a valid Bangladeshi number (+8801XXXXXXXXX)",
    }),

  role: z.enum(Object.values(Role) as [Role]),

  isActive: z.enum(Object.values(isActive) as [isActive]),

  isDeleted: z.boolean().default(false),

  isVerified: z.boolean().default(false),

  address: z
    .string()
    .max(200, "Address must not exceed 200 characters"),
});


export const updateUserZodSchema = z.object({
  name: z.string().min(2, "Name too short").max(50, "Name too long").optional(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    })
    .optional(),

  phone: z
    .string()
    .regex(/^(?:\+8801\d{9})$/, {
      message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX",
    })
    .optional(),

  role: z.enum(Object.values(Role) as [Role]).optional(),

  isActive: z.enum(Object.values(isActive) as [isActive]).optional(),

  isDeleted: z.boolean().optional(),

  isVerified: z.boolean().optional(),

  address: z.string().max(200, "Address cannot exceed 200 characters.").optional(),
});
