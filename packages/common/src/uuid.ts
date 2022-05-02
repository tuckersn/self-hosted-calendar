import { nanoid, customAlphabet } from "nanoid";
import { Alphabets } from "./alphabets";


export module UUID {
	export function urlSafe(size: number = 16): string {
		return customAlphabet(Alphabets.urlSafe)(size);
	}
	export function alphaNumeric(size: number = 16): string {
		return customAlphabet(Alphabets.alphaNumeric)(size);
	}
}