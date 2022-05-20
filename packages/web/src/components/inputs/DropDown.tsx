import React, { CSSProperties, useEffect } from "react";


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
	children,
	onValue,
	value: valueProp
}: DropDownProps) {

	const [value, setValue] = React.useState(valueProp || false);

	useEffect(() => {
		if(onValue) {
			onValue(value);
		}

	}, [value, onValue]);

	return <div style={Object.assign({}, {
		position: "absolute",
		width: 0,
		height: 0,
		left: 0,
		top: 0
	}, style)}>
		{ children }
	</div>	
}