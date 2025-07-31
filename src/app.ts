import express, { Request, Response } from "express";
// import { UserRoutes } from "./app/modules/user/user.route";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import passport from "passport";
import cookieParser from "cookie-parser";
import { envVars } from "./app/config/env";
import expressSession from "express-session"
import "./app/config/passport"
// import { NOT_FOUND } from "http-status-codes";


const app = express();

app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use("/api/v1", router)


app.get("/", (req: Request, res: Response) =>{
    res.status(200).json({
        message: "Welcome to Digital Wallet"
    })
})

app.use(globalErrorHandler)

app.use(notFound)

export default app;