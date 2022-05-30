import styled from "styled-components";

export interface NewMenuProps {
	active: boolean;
}

const NewMenuContainer = (styled.div<NewMenuProps>`

`);

export function NewMenu(props: NewMenuProps) {
	const { active } = props;
	return <NewMenuContainer {...props}>
		{active ? "New Menu" : null}
	</NewMenuContainer>;
}