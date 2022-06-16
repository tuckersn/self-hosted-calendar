import { Database } from "@internal/database/dist";
import { Router } from "express";
import { authenticationMiddleware, generalErrorHandlingMiddleware } from "../middleware";

export const taskBoardRouter: Router = Router();
taskBoardRouter.use(authenticationMiddleware);

taskBoardRouter.get("/", generalErrorHandlingMiddleware(async (req, res) => {
	res.status(200).json({});
}));

taskBoardRouter.post("/", generalErrorHandlingMiddleware(async (req, res) => {
	const { body } = req;
	res.status(200).json({});
}));

taskBoardRouter.get("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;
	res.status(200).json({});
}));

taskBoardRouter.post("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;
	res.status(200).json({});
}));

taskBoardRouter.delete("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;
	res.status(200).json({});
}));