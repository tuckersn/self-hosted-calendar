import { MiddlewareFunction } from "@internal/schema/dist/wrappers/rest-endpoint";
import { Database } from "@internal/database/dist";
import { UserType } from "@internal/schema/dist";

export const adminAuthorizationMiddleware: MiddlewareFunction = async (req, res, next) => {
	try {
		if("authorization" in req.headers && process.env.ADMIN_OVERRIDE_KEY !== undefined) {
			const [ type, token ] = req.headers["authorization"]!.split(" ");
			if(type === "Override" && token === process.env.ADMIN_OVERRIDE_KEY) {
				next();
				return;
			}
		}

		const {locals: { user }} = res;

		if(user === undefined) {
			res.status(403).json({
				error: "Forbidden"
			});
			return;
		}

		// Ensures that the user is an admin
		// Doesn't default in-case invalid input is passed.
		switch(user.userType) {
			default:
				res.status(403).json({
					error: "Forbidden"
				});
				return;
			case UserType.ADMIN:
			case UserType.ADMIN_SERVICE:
			case UserType.READ_ONLY_ADMIN_SERVICE:
				break;
		}
		
		next();
	} catch(e) {
		console.error("ADMIN AUTHORIZATION:", e);
		res.status(500).json({
			error: "Internal Server Error"
		});
	}
}