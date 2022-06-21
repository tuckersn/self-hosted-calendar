import { Database } from "@internal/database/dist";
import { Router } from "express";
import { nanoid } from "nanoid";
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

	const result = await Database.event.insert({
		description: slateSanitize(body.description),
		name: body.name,
		startDate: body.startDate,
		endDate: body.endDate,
		location: body.location,
		uuid: nanoid()
	});

	res.status(200).json(result);
}));

// Update a new event
eventRouter.put("/:uiid", generalErrorHandlingMiddleware(async (req, res) => {
	const { body } = req;

	// console.log(body.description);
	// console.log(JSON.stringify(slateSanitize(body.description), null, 4));

	if(req.params.uiid === undefined) {
		res.status(400).send("Missing uiid");;
		return;
	}

	const uuid = req.params.uiid;
	const eventRecord = await Database.event.getByUUID(uuid);

	if(eventRecord === null) {
		res.status(404).send("Event not found");
		return;
	}

	//TODO: verification
	
	const result = await Database.event.updateById({
		id: eventRecord.id,
		name: body.name || eventRecord.name,
		description: body.description || eventRecord.description,
		startTime: body.startDate || eventRecord.startDate,
		endTime: body.endDate || eventRecord.endDate,
		location: body.location || eventRecord.location
	} as any);

	res.status(200).json(result);
}));

// Delete an event by id
eventRouter.delete("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;

	res.status(200).send();
}));

