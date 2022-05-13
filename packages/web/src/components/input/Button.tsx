import React, { CSSProperties, useEffect, useState } from "react"
import { Promisable } from "type-fest";


export const BUTTON_DEFAULT_STYLE: CSSProperties = {
	border: "2px solid white",
	paddingLeft: "8px",
	paddingRight: "8px",
	paddingBottom: "1px"
}


export const Button: React.FC<{
	children: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promisable<void>;
	style?: CSSProperties
}> = ({
	children,
	onClick,
	style: styleOverride
}) => {
	const [style, setStyle] = useState<CSSProperties>(Object.assign({}, BUTTON_DEFAULT_STYLE, styleOverride || {}));

	useEffect(() => {
		setStyle(Object.assign({}, BUTTON_DEFAULT_STYLE, styleOverride || {}));
	}, [styleOverride]);

	return <div onClick={(event) => {
			if(onClick)
				onClick(event);
		}} style={style}>
		{children}
	</div>;
}