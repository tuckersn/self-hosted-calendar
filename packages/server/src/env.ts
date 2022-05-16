export const REQUIRED_ENVS = [
	"BACKEND_PORT",
	"DATABASE",
	"REGISTRATION_ENABLED",
	"USERNAME_MINIMUM_LENGTH",
	"PASSWORD_MINIMUM_LENGTH",
	"JWT_SECRET",
	"SALT_ROUNDS_API_KEY",
	"SALT_ROUNDS_PASSWORD"
]



export function verifyRequiredEnvsAreDefined() {
	for (const env of REQUIRED_ENVS) {
		if (process.env[env] === undefined) {
			throw new Error(`${env} env is not defined in the environment variables.`);
		}
	}
}