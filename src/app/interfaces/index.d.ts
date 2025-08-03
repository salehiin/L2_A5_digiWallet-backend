import { JwtPayload } from "jsonwebtoken";
// import { IUser } from "../modules/user/user.interface";
import { ITokenPayload } from "./tokenPayload";



declare global {
    namespace Express {
        interface Request {
            // user?: JwtPayload
            // user?: ITokenPayload;
            user?: JwtPayload | Partial<IUser>;

        }
    }
}

// export {}; 
// import { IUser } from "../modules/user/user.interface";
// import { User } from '../../modules/user/user.interface';


// user?: IUser;
// user?: User;