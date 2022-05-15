import express, { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";

import { ResLocals, UserErrors, UserType } from "@internal/schema/dist";
import { Database } from "@internal/database/dist";

import { authenticationMiddleware } from "../middleware";
import { generalErrorHandlingMiddleware } from "../middleware/exceptionWrappers";
import { hashPassword, verifyHash } from "../security";


import jwt from "jsonwebtoken";

export const loginRouter: Router = Router();

loginRouter.use(express.json());

loginRouter.post("/", generalErrorHandlingMiddleware(async (req: Request<any, any, {
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
			error: `"username" and "password" are required`
		});
		return;
	}

	if(
		username.length < parseInt(process.env.MINIMUM_USERNAME_LENGTH!) ||
		password.length < parseInt(process.env.MINIMUM_PASSWORD_LENGTH!)
	) {
		res.status(400).json({
			error: `Invalid input`
		});
		return;
	}

	const user = await Database.user.getByUsername(username);
	if(user === null) {
		res.status(401).json({
			error: `User with that username does not exist`
		});
		return;
	}

	if(user.passwordHash === null) {
		res.status(401).json({
			error: `Password is not set for this user`
		});
		return;
	}


	if(verifyHash(password, user.passwordHash)) {
		jwt.sign({
			username: user.username,
			userType: user.userType
		}, process.env.JWT_SECRET!, {
			expiresIn: "1d"
		}, (err, token) => {
			if(err) {
				res.status(500).json({
					error: `Internal server error`
				});
				return;
			}
			res.status(200).json({
				token: token!
			});
		});
	} else {
		res.status(401).json({
			error: `Invalid password`
		});
		return;
	}
	
	
	
	res.status(200).json({
		token: "TEST"
	});
}));

// Checks if sign up is enabled
loginRouter.get("/register", generalErrorHandlingMiddleware(async (req, res) => {
	res.status(200).json(process.env.REGISTRATION_ENABLED === "true");
}));


//TODO: captcha 
// Signs up a user
loginRouter.post("/register", generalErrorHandlingMiddleware(async (req: Request<any, any, {
	displayName: string,
	username: string,
	password: string,
	email: string
}>, res: Response<any, ResLocals>) => {


	if (process.env.REGISTRATION_ENABLED !== "true") {
		res.status(400).json({
			error: "Registration is not enabled"
		});
		return;
	}

	const { body } = req;

	console.log("BODY:", body);

	if(typeof body !== 'object') {
		res.status(400).json({
			error: "Invalid input"
		});
		return;
	}

	const {
		displayName,
		username,
		password,
		email
	} = body;

	if (username === undefined || password === undefined || email === undefined || displayName === undefined) {
		res.status(400).json({
			error: `"username", "password", "displayName", and "email" are required.`
		});
		return;
	}

	if (username.length < parseInt(process.env.USERNAME_MINIMUM_LENGTH!)) {
		res.status(400).json({
			error: `Username must be at least ${process.env.USERNAME_MINIMUM_LENGTH} characters long`
		});
		return;
	}

	if (password.length < parseInt(process.env.PASSWORD_MINIMUM_LENGTH!)) {
		res.status(400).json({
			error: `Password must be at least ${process.env.PASSWORD_MINIMUM_LENGTH} characters long`
		});
		return;
	}

	if (displayName.length < parseInt(process.env.USERNAME_MINIMUM_LENGTH!)) {
		res.status(400).json({
			error: `Display name must be at least ${process.env.USERNAME_MINIMUM_LENGTH} characters long`
		});
		return;
	}

	//TODO: captcha verify here

	try {
		const passwordHash = hashPassword(password);

		try {
			const user = await Database.user.insert({
				displayName,
				username,
				passwordHash,
				email,
				userType: UserType.USER
			});

			//TODO: verify email / approve user
			res.status(200).json({
				uuid: user.uuid,
				username: user.username,
				displayName: user.displayName
			});
		} catch (e: any) {
			if('key' in e) {
				if(e.key === UserErrors.KEY) {
					const error: UserErrors.All = e;
					if(error.name === "USERNAME_TAKEN") {
						res.status(400).json({
							error: error.message
						});
						return;
					} else if(error.name === "EMAIL_TAKEN") {
						res.status(400).json({
							error: error.message
						});
						return;
					}

				}
			} 
			throw e;
		}
	} catch(e: any) {
		console.error(`Error while registering user || ${e.message} ||`, e);
		res.status(400).json({
			error: "Failed to create account."
		});
	}


}));

/*
loginRouter.post("/passwordReset/:id", generalErrorHandlingMiddleware(async (req: Request<any, any, {
	newPassword: string
}>, res: Response<{} | {
	error: string;
}, ResLocals>) => {
}));
*/