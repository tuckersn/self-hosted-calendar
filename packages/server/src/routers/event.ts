import { Router } from "express";
import { authenticationMiddleware } from "../middleware";
import { generalErrorHandlingMiddleware } from "../middleware/exceptionWrappers";
import { slateSanitize } from "../utils";

export const eventRouter: Router = Router();
eventRouter.use(authenticationMiddleware);

// Get event by id
eventRouter.get("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;

	res.status(200).send();
}));

// Create a new event
eventRouter.post("/", generalErrorHandlingMiddleware(async (req, res) => {
	const { body } = req;

	console.log(JSON.stringify(body.description, null, 4));
	console.log(JSON.stringify(slateSanitize(body.description), null, 4));

	res.status(200).send("RES");
}));

// Update a new event
eventRouter.post("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { body } = req;

	console.log(body.description);
	console.log(JSON.stringify(slateSanitize(body.description), null, 4));

	res.status(200).send("RES");
}));

// Delete an event by id
eventRouter.delete("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;

	res.status(200).send();
}));


// Update an event by id
eventRouter.put("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;
	const { body } = req;

	res.status(200).send();
}));
