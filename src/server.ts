/* eslint-disable no-console */

// import express, { Request, Response } from "express";
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;


const startServer = async () => {
    try {
        // console.log(process.env.NODE_ENV);
        // console.log(envVars.NODE_ENV);
        await mongoose.connect(envVars.DB_URL)

        console.log("Connected to DB!!!")

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening to port ${envVars.PORT}`)
        })

    } catch (error) {
        console.log(error);
    }
}

(async () => {
    await startServer()
    await seedSuperAdmin()
})()

process.on("unhandledRejection", (error) => {
    console.log("Unhandled rejection detected... Server shutting down...", error);
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

process.on("uncaughtExceptionMonitor", (error) => {
    console.log("Uncaught Exception detected... Server shutting down...", error);
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

process.on("SIGTERM", () => {
    console.log("Sigterm signal received... Server shutting down...");
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

process.on("SIGINT", () => {
    console.log("Sigint signal received... Server shutting down...");
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

