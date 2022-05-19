import React, { CSSProperties } from "react";

export interface DropDownProps {
	style?: CSSProperties;
	className?: string;
	children: React.ReactNode;

	

	onValue?: (value: boolean) => any;
	value?: boolean;
}

export function DropDown({
	style,
	className,
	children
}: DropDownProps) {
	return <div style={Object.assign({}, style, {
		position: "absolute",
		width: 0,
		height: 0,
		left: 0,
		top: 0
	})}>
		<div></div>
		{ children }
	</div>	
}