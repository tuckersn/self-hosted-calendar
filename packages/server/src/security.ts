import { v4 } from "uuid";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import { UUID } from "@internal/common/dist/uuid";
import { UserApiKeyRecord } from "@internal/schema/dist";

export const API_KEY_SALT_ROUNDS = 15;

export function generateApiKey(userUUID: string) {
	const keyName = UUID.alphaNumeric(8);
	const password = Buffer.from(crypto.randomUUID()).toString('base64');
	const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(API_KEY_SALT_ROUNDS));
	const key = `cal-${keyName}-` + password;
	return {
		key,
		keyName,
		hash
	}
};

export function verifyApiKeyPass(keyPass: string, apiKeyRecord: UserApiKeyRecord) {
	return bcrypt.compareSync(keyPass, apiKeyRecord.keyHash);
}