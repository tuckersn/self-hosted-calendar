import { Request, Response } from "express";
import { Promisable } from "type-fest";

export type RestEndpoint<ReqParams extends {[key: string]: string}, ReqBody extends Object | undefined, ResBody extends Object | undefined> = {
	Params: ReqParams,
	RequestBody: ReqBody,
	ResponseBody: ResBody,
	Request: Request<ReqParams, ReqBody, ResBody>;
	Response: Response<ResBody>;
	/**
	 * Type for the actual function that will be called when the endpoint is called by express.
	 */
	Function: (req: Request<ReqParams, ReqBody, ResBody>, res: Response<ResBody>) => Promisable<void>;
}