import React, { CSSProperties, useEffect, useState } from "react"
import { Promisable } from "type-fest";
import { COLORS, STYLE_VALUES } from "../../common/style";

export interface ButtonProps {
	children: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promisable<void>;
	style?: CSSProperties;
	small?: boolean;
}

export const BUTTON_DEFAULT_STYLE: CSSProperties = {
	backgroundColor: "rgba(0,0,0,0.5)",
	border: "2px solid white",
	borderRadius: STYLE_VALUES.borderRadius + "px",
	padding: STYLE_VALUES.paddingStandardVertical + "px",
	paddingLeft: STYLE_VALUES.paddingStandardHorizontal * 2 + "px",
	paddingRight: STYLE_VALUES.paddingStandardHorizontal * 2 + "px",
	width: "min-content",
	userSelect: "none",
	textAlign: "center",
	display: "flex",
	alignContent: "center",
	justifyContent: "center",
}

export const BUTTON_SMALL_STYLE: CSSProperties = {
	...BUTTON_DEFAULT_STYLE,
	padding: "3px",
	fontSize: "12px"
}


export const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	style: styleOverride,
	small
}) => {
	const [style, setStyle] = useState<CSSProperties>(Object.assign({}, small ? BUTTON_SMALL_STYLE : BUTTON_DEFAULT_STYLE, styleOverride || {}));

	useEffect(() => {
		setStyle(Object.assign({}, small ? BUTTON_SMALL_STYLE : BUTTON_DEFAULT_STYLE, styleOverride || {}));
	}, [styleOverride, small]);

	return <div onClick={(event) => {
			if(onClick)
				onClick(event);
	}} style={style} onMouseEnter={() => {
		setStyle(Object.assign({}, style, {
			background: "rgba(255,255,255,0.2)",
			border: `2px solid ${COLORS.hover}`,
			color: COLORS.hover
		}));
	}} onMouseLeave={() => {
		setStyle(Object.assign({}, style, {
			background: "transparent",
			border: BUTTON_DEFAULT_STYLE.border,
			color: COLORS.primary
		}));
	}}>
		{children}
	</div>;
}