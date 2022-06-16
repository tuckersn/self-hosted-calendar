import { Database } from "@internal/database/dist";
import { Router } from "express";
import { authenticationMiddleware, generalErrorHandlingMiddleware } from "../middleware";

export const calendarRouter: Router = Router();
calendarRouter.use(authenticationMiddleware);

calendarRouter.get("/", generalErrorHandlingMiddleware(async (req, res) => {
	res.status(200).json({});
}));

calendarRouter.post("/", generalErrorHandlingMiddleware(async (req, res) => {
	const { body } = req;
	res.status(200).json({});
}));

calendarRouter.get("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;
	res.status(200).json({});
}));

calendarRouter.post("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;
	res.status(200).json({});
}));

calendarRouter.delete("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;
	res.status(200).json({});
}));