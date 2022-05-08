import { Router } from "express";

export const userRouter: Router = Router();


//
// Admin APIs
//

const adminRouter = Router();

// Get user by id
adminRouter.get("/:id", (req, res) => {
	const { id } = req.params;

	res.status(200).send();
});

// Create a new user
adminRouter.post("/", (req, res) => {
	const { body } = req;

	res.status(200).send();
});

// Delete an user by id
adminRouter.delete("/:id", (req, res) => {
	const { id } = req.params;

	res.status(200).send();
});

userRouter.use();

