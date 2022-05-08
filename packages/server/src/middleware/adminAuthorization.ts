import { MiddlewareFunction } from "@internal/schema/dist/wrappers/rest-endpoint";
import { Database } from "@internal/database/dist";
import { UserType } from "@internal/schema/dist";

export const adminAuthorizationMiddleware: MiddlewareFunction = async (req, res, next) => {
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
}