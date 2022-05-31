import React from "react";
import styled from "styled-components";
import { COLORS, STYLE_VALUES } from "../../common/style";

export interface NewMenuProps {
	active: boolean;
	setActive?: (active: boolean) => void;
}

const NewMenuContainer = (styled.div<NewMenuProps>`
	height: 300px;
	width: 100px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	border: 2px solid ${COLORS.border};
	border-radius: 0px 0px ${STYLE_VALUES.borderRadiusHeavy}px ${STYLE_VALUES.borderRadiusHeavy}px;
	background-color: ${COLORS.backgroundDark};
`);

const NewMenuItem = (styled.div<NewMenuProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 8px;
`);


export function NewMenu(props: NewMenuProps) {
	const { active } = props;
	return <React.Fragment>
	{
		active ?
			<NewMenuContainer {...props}>
				"New Menu"
				
			</NewMenuContainer>
		: null}
	</React.Fragment>
}