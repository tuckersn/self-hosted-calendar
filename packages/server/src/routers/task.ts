import { Database } from "@internal/database/dist";
import { Router } from "express";
import { authenticationMiddleware, generalErrorHandlingMiddleware } from "../middleware";

export const taskRouter: Router = Router();
taskRouter.use(authenticationMiddleware);

taskRouter.get("/", generalErrorHandlingMiddleware(async (req, res) => {
	res.status(200).json({});
}));

taskRouter.post("/", generalErrorHandlingMiddleware(async (req, res) => {
	const { body } = req;
	res.status(200).json({});
}));

taskRouter.get("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;
	res.status(200).json({});
}));

taskRouter.post("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;
	res.status(200).json({});
}));

taskRouter.delete("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;
	res.status(200).json({});
}));