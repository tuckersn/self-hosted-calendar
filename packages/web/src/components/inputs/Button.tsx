import React, { CSSProperties, useEffect, useState } from "react"
import styled from "styled-components";
import { Promisable } from "type-fest";
import { COLORS, STYLE_VALUES } from "../../common/style";

export interface ButtonProps {
	children: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promisable<void>;
	style?: CSSProperties;
	small?: boolean;
	active?: boolean;
}

const ButtonContainer = (styled.div<ButtonProps>`
	background-color: rgba(0,0,0,0.5);
	border: 2px solid white;
	border-radius: ${STYLE_VALUES.borderRadius}px;
	padding: ${STYLE_VALUES.paddingStandardVertical}px;
	padding-left: ${STYLE_VALUES.paddingStandardHorizontal * 2}px;
	padding-right: ${STYLE_VALUES.paddingStandardHorizontal * 2}px;
	width: min-content;
	user-select: none;
	text-align: center;
	display: flex;
	align-content: center;
	justify-content: center;

	${props => props.small ? `
		padding: 3px;
		font-size: 12px;
	` : ''}

	&:hover {
		background-color: #626a7f52;
		border: 2px solid ${COLORS.hover};
		color: ${COLORS.hover};
	}
	${props => props.active ? `
		background-color: #626a7f52;
		border: 2px solid ${COLORS.hover};
		color: ${COLORS.hover};
		&:hover {
			background-color: #e0e1e476;
			border: 2px solid ${COLORS.hover};
			color: ${COLORS.hover};
		}
	` : ''}
`);


export const Button: React.FC<ButtonProps> = (props) => {
	const {
		children,
		onClick,
		style
	} = props;
	return <ButtonContainer {...props} onClick={(event) => {
			if(onClick)
				onClick(event);
	}}>
		{children}
	</ButtonContainer>;
}