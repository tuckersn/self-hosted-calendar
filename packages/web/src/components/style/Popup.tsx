import React from "react";
import styled from "styled-components";
import { COLORS, CSS_PRESETS, STYLE_VALUES } from "../../common/style";
import { FloatingContainer } from "./FloatingContainer";

export interface PopupProps {
	style?: React.CSSProperties;
	innerStyle?: React.CSSProperties;
	children?: React.ReactNode;
	active: boolean;
	setActive?: (active: boolean) => void;

	closeOnClickOutside?: boolean;
}

const PopupContainer = (styled.div<PopupProps>`
	display: ${props => props.active ? "flex" : "none"};
	visibility: ${props => props.active ? "visible" : "hidden"};
	height: 100vh;
	width: 100vw;
	background-color: rgba(0,0,0,0.5);
	justify-content: center;
	align-items: center;
`);

const PopupInnerContainer = (styled.div<PopupProps>`
	border: 1px solid white;
	display: flex;
	flex-direction: column;
	border-radius: ${STYLE_VALUES.borderRadius}px;
	background-color: ${COLORS.background};
	padding: 12px;
	height: 600px;
	width: 800px;
`);

export function Popup(props: PopupProps) {
	const { children, closeOnClickOutside } = props;
	return <FloatingContainer x={0} y={0} style={{zIndex: 999999}}>
		<PopupContainer {...props} onClick={() => {
			if(closeOnClickOutside) {
				if (props.setActive) {
					props.setActive(false);
				}
			}
		}}>
			<PopupInnerContainer {...props} style={props.innerStyle} onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}>
				{children}
			</PopupInnerContainer>
		</PopupContainer>
	</FloatingContainer>;
}