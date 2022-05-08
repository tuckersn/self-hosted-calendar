import express, { Router } from "express";
import dotenv from "dotenv";
import expressWinston from "express-winston";
import winston from "winston";


import { networkLoggerOptions, networkTransports } from "@internal/loggers/dist";

import { eventRouter } from "./routers/event";
import { userRouter } from "./routers/user";

dotenv.config();

if(process.env.PORT === undefined) {
	throw new Error("PORT env is not defined");
}




const app = express();

app.use(expressWinston.logger({
	format: winston.format.json(),
	transports: networkTransports
}));

app.get("/ping", (req,res) => {
	res.status(200).send("pong");
});


const api = Router();
api.use("/event", eventRouter);
api.use("/user", userRouter);

app.use("/api", api);
app.listen(process.env.PORT!, () => {
	console.log(`Listening @ http://localhost:${process.env.PORT!}`);
});