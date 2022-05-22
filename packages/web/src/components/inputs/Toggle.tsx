/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styled, { CSSProperties } from "styled-components";
import { COLORS } from "../../common/style";

export interface ToggleProps {
	style?: CSSProperties;

	FalseComponent: React.ComponentType;
	TrueComponent: React.ComponentType;

	closeOnOutsideClick?: boolean;

	value?: boolean;
	onValue?: (value: boolean) => any;
}


const ToggleContainer = (styled.div`
	border: 1px solid ${COLORS.border};
	width: min-content;
`);




export function Toggle({
	FalseComponent,
	TrueComponent,
	closeOnOutsideClick = true,
	style,
	value: initialValue,
	onValue,
} : ToggleProps) {

	const [value, setValue] = useState(initialValue === undefined ? false : initialValue);
	const containerRef = useRef<HTMLDivElement>(null);

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
	
	return <ToggleContainer ref={containerRef} className="noselect" onClick={() => {
		console.log("ON CLICK");
		setValue(!value)
		if(closeOnOutsideClick && !value && containerRef !== null) {
			const click = (event: MouseEvent) => {
				if(event instanceof PointerEvent || event instanceof MouseEvent) {
					const target = event.currentTarget!;
					if(!(target instanceof Node)) {
						setValue(false);
						document.removeEventListener("mousedown", click);
					} else {
						console.log("REF:", containerRef.current)
						if(target.contains(containerRef.current)) {
							console.log("Contained");
						} else {
							setValue(false);
							document.removeEventListener("mousedown", click);
						}
					}				
				}
			};
			document.addEventListener("mousedown", click);
		}
	}} style={style}>
		{ value ? <TrueComponent/> : <FalseComponent/> }
	</ToggleContainer>;
}