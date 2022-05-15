import dotenv from "dotenv";
dotenv.config({
	path: process.cwd() + "/.env"
});
import express, { Router } from "express";
import expressWinston from "express-winston";
import winston from "winston";
import { default as cors } from "cors";

import { networkLoggerOptions, networkTransports } from "@internal/loggers/dist";
import { Database, databaseInitPromise } from "@internal/database/dist";

import { eventRouter } from "./routers/event";
import { userRouter } from "./routers/user";
import { loginRouter } from "./routers/login";
import { apiKeyRouter } from "./routers/api-keys";
import { verifyRequiredEnvsAreDefined } from "./env";



verifyRequiredEnvsAreDefined();


async function main() {

	

	await databaseInitPromise;
	const app = express();

	app.use(expressWinston.logger({
		format: winston.format.json(),
		transports: networkTransports
	}));
	app.use(cors({
		origin(requestOrigin, callback) {
			//TODO: proper cors implementation
			callback(null, true);
		},
	}));
	

	app.get("/ping", (req,res) => {
		res.status(200).send("pong");
	});

	app.use("/login", loginRouter);

	const api = Router();
	api.use(express.json());

	api.use("/event", eventRouter);
	api.use("/user", userRouter);
	api.use("/api-key", apiKeyRouter);

	app.use("/api", api);
	app.listen(process.env.BACKEND_PORT!, () => {
		console.log(`Listening @ http://localhost:${process.env.BACKEND_PORT!}`);
	});
}

main();