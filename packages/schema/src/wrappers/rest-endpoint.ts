import { Request, Response } from "express";
import { Promisable } from "type-fest";
import { JWT } from "../jwt";
import { UserRecord } from "../user";
import { UserApiKeyRecord } from "../user-api-key";

/**
 * This is information usually provided
 * by middleware that is used by the
 * the rest-endpoints.
 * 
 * If a route doesn't use the middleware
 * then these will be undefined.
 */
export interface ResLocals {
	/**
	 * ***Supplied by authenticationMiddleware in server package***
	 * 
	 * Will be defined if the user is authenticating using an api key.
	 * During use of the web application this will be undefined.
	 */
	apiKey?: UserApiKeyRecord;

	/**
	 * Decoded JWT token of the user.
	 */
	jwtData?: JWT;
	/**
	 * ***Supplied by authenticationMiddleware in server package***
	 * 
	 * This will be defined ONLY when the authentication middleware
	 * is used by a particular endpoint.
	 */
	user?: UserRecord;
}

export type RouteFunction = (req: Request, res: Response<any, ResLocals>) => Promisable<any>;
export type MiddlewareFunction = (req: Request, res: Response<any, ResLocals>, next: () => void) => Promisable<any>;

export type RestEndpoint<REQ_PARAMS extends {[key: string]: string}, REQ_BODY extends Object | undefined, RES_BODY extends Object | undefined, RES_LOCALS extends ResLocals = ResLocals> = {
	Params: REQ_PARAMS,
	RequestBody: REQ_BODY,
	ResponseBody: RES_BODY,
	Request: Request<REQ_PARAMS, REQ_BODY, RES_BODY>;
	Response: Response<RES_BODY, RES_LOCALS>;
	/**
	 * Type for the actual function that will be called when the endpoint is called by express.
	 */
	Function: (req: Request<REQ_PARAMS, REQ_BODY, RES_BODY>, res: Response<RES_BODY>) => Promisable<void>;
}