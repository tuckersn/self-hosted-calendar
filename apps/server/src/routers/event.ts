import { Router } from "express";
import { generalErrorHandling } from "../middleware/exceptionWrappers";

export const eventRouter = Router();

// Get event by id
eventRouter.get("/:id", generalErrorHandling(async (req, res) => {
	const { id } = req.params;

	res.status(200).send();
}));

// Create a new event
eventRouter.post("/", generalErrorHandling(async (req, res) => {
	const { body } = req;

	res.status(200).send();
}));

// Delete an event by id
eventRouter.delete("/:id", generalErrorHandling(async (req, res) => {
	const { id } = req.params;

	res.status(200).send();
}));


// Update an event by id
eventRouter.put("/:id", generalErrorHandling(async (req, res) => {
	const { id } = req.params;
	const { body } = req;

	res.status(200).send();
}));
