import styled from "styled-components";
import { CSS_PRESETS } from "../../common/style";


export interface TodoNoteProps {
	style?: React.CSSProperties;
}

const TodoNoteContainer = styled.div<TodoNoteProps>`
	${CSS_PRESETS.boxShadowDark}
`;


export function TodoNote(props: TodoNoteProps) {
	return <TodoNoteContainer {...props}>
		TodoNote
	</TodoNoteContainer>;
}