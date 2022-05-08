import { Router } from "express";
import { RouteFunction } from "@internal/schema/dist";
import { adminAuthorizationMiddleware, authenticationMiddleware } from "../middleware";

//
// User Router
// /api/user
//
export const userRouter: Router = Router();
userRouter.use(authenticationMiddleware);

userRouter.get("/", (async (req, res) => {
	if(res.locals.user === undefined) {
		res.status(500).json({
			error: "User not found"
		});
		return;
	}

	const user = res.locals.user;
	res.status(200).json({
		uuid: user.uuid,
		displayName: user.displayName,
		username: user.username,
		//TODO: make a setting to disable email or just remove
		email: user.email,
		userType: user.userType,
		created: user.created
	});
}) as RouteFunction);

//
// Admin APIs
// /api/user/admin
//
const adminUserRouter = Router();
adminUserRouter.use(adminAuthorizationMiddleware);

// Get user by id
adminUserRouter.get("/:id", (req, res) => {
	const { id } = req.params;

	res.status(200).send();
});

// Create a new user
adminUserRouter.post("/", (req, res) => {
	const { body } = req;

	res.status(200).send();
});

// Delete an user by id
adminUserRouter.delete("/:id", (req, res) => {
	const { id } = req.params;

	res.status(200).send();
});

userRouter.use("/admin", adminUserRouter);

