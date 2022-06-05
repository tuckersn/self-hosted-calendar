import { ResLocals, RestEndpoint, RestEndpointFunction } from "@internal/schema/dist";
import express from "express";
import { Promisable } from "type-fest";



export function generalErrorHandlingMiddleware(cb: (req: express.Request, res: express.Response<any, ResLocals>) => Promisable<void>) {
	return async (req: express.Request, res: express.Response<any, ResLocals>) => {
		try {
			await cb(req, res);
		} catch (err) {
			console.error(err);
			res.status(500).json({
				error: "Internal server error"
			});
		}
	};
}

export function generalErrorHandlingWithRestEndpoint<ENDPOINT extends RestEndpoint<any, any, any>>(cb: RestEndpointFunction<ENDPOINT>) {
	return async (req: express.Request, res: express.Response<any, ResLocals>) => {
		try {
			await cb(req, res);
		} catch (err) {
			console.error(err);
			res.status(500).json({
				error: "Internal server error"
			});
		}
	};
}