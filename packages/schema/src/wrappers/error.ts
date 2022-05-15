
export interface IError<KEY extends string, NAME extends string, MESSAGE extends string> extends Error {
	key: KEY;
	name: NAME;
	message: MESSAGE;
}

export function IError<KEY extends string, NAME extends string, MESSAGE extends string>(key: KEY, name: NAME, message: MESSAGE): IError<KEY, NAME, MESSAGE> {
	return Object.assign(new Error(message), { name, key }) as any;
}