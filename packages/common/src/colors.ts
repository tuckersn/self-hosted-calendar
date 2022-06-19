export const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/im;

/**
 * Returns true if the string is a valid hex color.
 * Example: #000 to #FFF and #000000 to #FFFFFF
 */
export function verifyColorIsHex(colorString: string): boolean {
    return HEX_REGEX.test(colorString);
}
