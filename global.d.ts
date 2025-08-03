// global.d.ts (at the root of your project)

import { IAuthUser } from "./src/app/interfaces/auth";


declare global {
  namespace Express {
    interface Request {
      user?: IAuthUser;
    }
  }
}
