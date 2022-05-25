import styled from "styled-components";
import { ValueOf } from "type-fest";
import { COLORS, CSS_PRESETS, STYLE_VALUES } from "../../common/style";
import { Button } from "../inputs/Button";

export const DEFAULT_TODO_NOTE_SIZE = 175;

export const TODO_NOTE_COLORS = {
	red: "#af1212",
	green: "#188e18",
	blue: "#2f58cb",
	yellow: "#e3e303",
	orange: "#ffbb3d",
	purple: "#942b94",
	pink: "#ffc0cb",
	brown: "#a52a2a",
	black: "#000000",
	white: "#ffffff"
}

export const TODO_COLOR_NAMES: (keyof typeof TODO_NOTE_COLORS)[] = Object.keys(TODO_NOTE_COLORS) as any;
export type TodoColorNames = keyof typeof TODO_NOTE_COLORS;

/**
 * The font color counterpart of a todo note color.
 */
export const TODO_NOTE_COLOR_FONT_COLORS: {[colorName in TodoColorNames]: string} = {
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

export interface TodoNoteProps {
	style?: React.CSSProperties;
	/**
	 * Width and height of the note.
	 */
	size?: number;
	color: TodoColorNames;

	title: string;
	description: string;
}


const TodoNoteContainer = styled.div<TodoNoteProps>`
	${CSS_PRESETS.boxShadow}

	display: flex;
	height: ${props => props.size || DEFAULT_TODO_NOTE_SIZE}px;
	width: ${props => props.size || DEFAULT_TODO_NOTE_SIZE}px;

	flex-direction: column;
	padding: 8px;
	padding-top: 4px;
	padding-bottom: 4px;

	color: ${props => TODO_NOTE_COLOR_FONT_COLORS[props.color]};
	background-color: ${props => TODO_NOTE_COLORS[props.color]};

	border: 3px solid ${COLORS.backgroundLight};
	border-radius: ${STYLE_VALUES.borderRadius}px;
	
`;


const TodoNoteTitle = styled.div<TodoNoteProps>`
	font-size: 1.25em;
	font-weight: bold;
	text-align: center;
	flex: 0;
`;

const TodoNoteDescription = styled.div<TodoNoteProps>`
	font-size: 0.8em;
	text-align: left;
	flex: 1;
`;

const TodoNoteActions = styled.div<TodoNoteProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex: 0;
	* {
		white-space: nowrap;
	}
	color: white;
`;

export function TodoNote(props: TodoNoteProps) {
	return <TodoNoteContainer {...props}>
		<TodoNoteTitle {...props}>
			{props.title}
		</TodoNoteTitle>
		<TodoNoteDescription {...props}>
			{props.description}
		</TodoNoteDescription>
		<TodoNoteActions {...props}>
			<Button small>
				Due: 3d
			</Button>
			<Button small>
				Done
			</Button>
		</TodoNoteActions>
	</TodoNoteContainer>;
}