import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";

import { ResLocals } from "@internal/schema/dist";

import { authenticationMiddleware } from "../middleware";
import { generalErrorHandlingMiddleware } from "../middleware/exceptionWrappers";

export const loginRouter: Router = Router();


loginRouter.post("/password", generalErrorHandlingMiddleware(async (req: Request<any, any, {
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

/*
loginRouter.post("/passwordReset/:id", generalErrorHandlingMiddleware(async (req: Request<any, any, {
	newPassword: string
}>, res: Response<{} | {
	error: string;
}, ResLocals>) => {
}));
*/