import { Router } from "express";

export const userRouter = Router();

// Get user by id
userRouter.get("/:id", (req, res) => {
	const { id } = req.params;

	res.status(200).send();
});

// Create a new user
userRouter.post("/", (req, res) => {
	const { body } = req;

	res.status(200).send();
});

// Delete an user by id
userRouter.delete("/:id", (req, res) => {
	const { id } = req.params;

	res.status(200).send();
});