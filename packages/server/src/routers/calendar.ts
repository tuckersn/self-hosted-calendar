import { Database } from "@internal/database/dist";
import { Router } from "express";
import { authenticationMiddleware, failNonUsers, generalErrorHandlingMiddleware } from "../middleware";

export const calendarRouter: Router = Router();
calendarRouter.use(authenticationMiddleware);

/**
 * Get's your calendar list
 */
calendarRouter.use(failNonUsers,
	calendarRouter.get("/", generalErrorHandlingMiddleware(async (req, res) => {
		//TODO: add query context here
		const record = await Database.calendar.getListByUserUUID(res.locals.user!.uuid, {});
		res.status(200).json(record);
	})),
	calendarRouter.post("/", generalErrorHandlingMiddleware(async (req, res) => {
		const { body } = req;
		//TODO: add query context here
		//TODO: validation
		const record = await Database.calendar.insert(body, {});
		const memberRecord = await Database.calendarMember.insert({
			calendarId: record.id,
			userId: res.locals.user!.id,
			isAdmin: true,
			isWriter: true,
		}, {});
		const output = {
			...record,
			member: memberRecord
		}
		res.status(200).json(output);
	}))
);

calendarRouter.get("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;
	//TODO: add query context here
	//TODO: validation
	const record = await Database.calendar.getByUUID(id, {});
	res.status(200).json({});
}));

calendarRouter.put("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;
	res.status(200).json({});
}));

calendarRouter.delete("/:id", generalErrorHandlingMiddleware(async (req, res) => {
	const { id } = req.params;
	//TODO: add query context here
	//TODO: validation
	const record = await Database.calendar.deleteByUUID(id, {});
	res.status(200).json({});
}));