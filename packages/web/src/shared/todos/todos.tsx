export const TODO_NOTE_COLORS = {
	red: "#ff0000",
	green: "#00ff00",
	blue: "#0000ff",
	yellow: "#ffff00",
	orange: "#ffa500",
	purple: "#800080",
	pink: "#ffc0cb",
	brown: "#a52a2a",
	black: "#000000",
	white: "#ffffff"
}

export const TODO_COLOR_NAMES: (keyof typeof TODO_NOTE_COLORS)[] = Object.keys(TODO_NOTE_COLORS) as any;

/**
 * The font color counterpart of a todo note color.
 */
export const TODO_NOTE_COLOR_FONT_COLORS: {[colorName in keyof typeof TODO_NOTE_COLORS]: string} = {
	red: "#ffffff",
	green: "#ffffff",
	blue: "#ffffff",
	yellow: "#000000",
	orange: "#000000",
	purple: "#ffffff",
	pink: "#ffffff",
	brown: "#ffffff",
	black: "#ffffff",
	white: "#000000"
}