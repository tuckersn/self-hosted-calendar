export const HEX_REGEX = /#[A-F][A-F][A-F]([A-F][A-F][A-F]|)$/im;

/**
 * Returns true if the string is a valid hex color.
 * EX: #FFF or #FFFFFF
 */
export function verifyColorIsHex(colorString: string): boolean {
	if(!(colorString.length === 7 || colorString.length === 4)) {
		return false;
	}

	return HEX_REGEX.test(colorString);
}