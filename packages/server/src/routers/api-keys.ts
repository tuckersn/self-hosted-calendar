import { Request, Response, Router } from "express";

import { ResLocals, UserRecord } from "@internal/schema/dist";

import { adminAuthorizationMiddleware, authenticationMiddleware } from "../middleware";
import { generalErrorHandlingMiddleware } from "../middleware/exceptionWrappers";
import { Database } from "@internal/database/dist";
import { generateApiKey } from "../security";






export const apiKeyRouter: Router = Router();

apiKeyRouter.post("/createKey", generalErrorHandlingMiddleware(async (req: Request<any, any, {
	username?: string,
	password?: string
}>, res: Response<{
	token: string;
} | {
	error: string;
}, ResLocals>) => {
	const {
		body: {
			username,
			password
		}
	} = req;

	if (username === undefined || password === undefined) {
		res.status(400).json({
			error: "Username and password are required"
		});
		return;
	}

	
	
	
	res.status(200).json({
		token: "TEST"
	});
}));

const adminRouter: Router = Router();
adminRouter.use(authenticationMiddleware);
adminRouter.use(adminAuthorizationMiddleware);

adminRouter.post("/force-create", generalErrorHandlingMiddleware(async (req: Request<any, any, {
	username: string,
	active: boolean,
	
	description?: string,
	expirationUnixTime?: number
}>, res: Response<{}, ResLocals>) => {

	console.log("FORCE CREATE");
	
	let { body } = req;
	body = body || {};

	if(body.username === undefined || body.active === undefined) {
		res.status(400).json({
			error: `'username' and 'active' are required`
		});
		return;
	}

	const {
		username,
		description,
		active,
		expirationUnixTime
	} = body;

	const user = await Database.user.getByUsername(username);

	if(user === null) {
		res.status(404).json({
			error: "User not found"
		});
		return;
	}

	console.log("USER", user);


	const {
		key,
		keyName,
		hash
	} = generateApiKey(user.uuid);

	await Database.userApiKey.insert({
		keyName,
		keyHash: hash,
		description,
		userId: user.id,
		active
	});

	res.status(200).json({
		key,
		user: {
			uuid: user.uuid,
			username: user.username
		}
	});
}));


apiKeyRouter.use("/admin", adminRouter);