import express from "express";
import dotenv from "dotenv";
import { eventRouter } from "./routers/event";

dotenv.config();

if(process.env.PORT === undefined) {
	throw new Error("PORT env is not defined");
}


const app = express();

app.get("/", (req,res) => {
	res.status(200).send("pong");
});

app.use("/event", eventRouter);

app.listen(process.env.PORT!, () => {
	console.log(`Listening @ http://localhost:${process.env.PORT!}`);
});