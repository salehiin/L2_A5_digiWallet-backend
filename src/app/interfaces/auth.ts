// src/interfaces/auth.ts (or common.ts)

import { Role } from "../modules/user/user.interface"; // adjust as needed

export interface IAuthUser {
  _id: string;
  email: string;
  role: Role;
}
