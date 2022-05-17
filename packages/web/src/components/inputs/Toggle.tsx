/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled, { CSSProperties } from "styled-components";
import { COLORS } from "../../common/style";

export interface ToggleProps {
	style?: CSSProperties;
	falseComponent: React.ReactNode;
	trueComponent: React.ReactNode;

	value?: boolean;
	onValue?: (value: boolean) => any;
}


const ToggleContainer = (styled.div`
	border: 1px solid ${COLORS.border};
	width: min-content;
	padding: 4px;
	padding-top: 0px;
	padding-bottom: 0px;
`);


export function Toggle({
	falseComponent,
	trueComponent,
	style,
	value: initialValue,
	onValue,
} : ToggleProps) {

	const [value, setValue] = useState(initialValue === undefined ? false : initialValue);
	
	useEffect(() => {
		if(onValue) {
			onValue(value);
		}
	}, [value]);

	useEffect(() => {
		if(initialValue !== undefined) {
			if(initialValue !== value) {
				setValue(initialValue);
			}
		}
	}, [initialValue]);
	
	return <ToggleContainer className="noselect" onClick={() => setValue(!value)} style={style}>
		{ value ? trueComponent : falseComponent }
	</ToggleContainer>;
}