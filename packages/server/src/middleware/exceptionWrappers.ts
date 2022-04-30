import express from "express";
import { Promisable } from "type-fest";

export function generalErrorHandling(cb: (req: express.Request, res: express.Response) => Promisable<void>) {
	return async (req: express.Request, res: express.Response) => {
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