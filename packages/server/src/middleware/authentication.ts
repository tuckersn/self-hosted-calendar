import { MiddlewareFunction } from "@internal/schema/dist/wrappers/rest-endpoint";
import { Database } from "@internal/database/dist";
import { UserType } from "@internal/schema/dist";
import { verifyApiKeyPass } from "../security";

export const authenticationMiddleware: MiddlewareFunction = async (req, res, next) => {

	// // Check if override token is being used
	// if(process.env.ADMIN_OVERRIDE_KEY !== undefined) {
	// 	const authorization = req.headers.authorization || req.headers.Authorization;
	// 	if(authorization !== undefined && typeof authorization === 'string') {
	// 		const [ type, token ] = authorization.split(" ");
	// 		if(type === 'Override' && token === process.env.ADMIN_OVERRIDE_KEY) {
	// 			// Override token is being used
	// 			nextTick
	// 	}
	// }
	try {

		const { body, headers, params } = req;
		let { authorization } = headers;

		if(authorization === undefined) {
			authorization = headers.Authorization as string;
		}

		if (authorization === undefined || typeof authorization !== "string") {
			res.status(401).json({
				error: "Authorization header is missing or invalid"
			});
			return;
		}

		const [authType, authToken] = authorization.split(" ");
		
		if (authType === "Bearer") {
			//TODO: JWT
		} else if (authType === "ApiKey") {

			const [prefix,keyName, keyPass] = authToken.split("-");

			if(prefix !== "cal" || keyName === undefined || keyPass === undefined) {
				res.status(401).json({
					error: "Authorization header is missing or invalid"
				});
				return;
			}

			const apiKeyRecord = await Database.userApiKey.getByKeyName(keyName);
			if(apiKeyRecord === null) {
				res.status(401).json({
					error: "Unauthorized"
				});
				return;
			}

			console.log("API KEY RECORD", apiKeyRecord);

			const valid = verifyApiKeyPass(keyPass, apiKeyRecord);
			if(!valid) {
				res.status(401).json({
					error: "Unauthorized"
				});
				return;
			}

			const userRecord = await Database.user.getById(apiKeyRecord.userId);
			if(userRecord === null) {
				res.status(500).json({
					error: "User not found for this api key. This should never happen."
				});
				return;
			}

			res.locals.apiKey = apiKeyRecord;
			res.locals.user = userRecord;
			return next();
		} else if (authType === "Override") {
			if(process.env.ADMIN_OVERRIDE_KEY === undefined) {
				res.status(401).json({
					error: "Unauthorized"
				});
				return;
			} else {
				if(authToken === process.env.ADMIN_OVERRIDE_KEY) {
					return next();
				} else {
					res.status(401).json({
						error: "Unauthorized"
					});
					return;
				}
					
			}
		} else {
			res.status(401).json({
				error: "Malformed authorization header",
				authType
			});
			return;
		}
	} catch (error) {
		console.error("AUTH ERROR:", error);
		res.status(500).json({
			error: "An error occurred while authenticating"
		});
		return;
	}
}