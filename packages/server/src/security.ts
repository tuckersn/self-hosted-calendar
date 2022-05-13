import { v4 } from "uuid";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import { UUID } from "@internal/common/dist/uuid";
import { UserApiKeyRecord } from "@internal/schema/dist";


export function generateApiKey() {
	const keyName = UUID.alphaNumeric(8);
	const password = Buffer.from(crypto.randomUUID()).toString('base64');
	const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS_API_KEY!)));
	const key = `cal-${keyName}-` + password;
	return {
		key,
		keyName,
		hash
	}
};

export function hashPassword(password: string) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS_PASSWORD!)));
}


export function verifyHash(secret: string, hash: string) {
	return bcrypt.compareSync(secret, hash);
}