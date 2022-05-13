import React, { CSSProperties, useEffect, useState } from "react"
import { Promisable } from "type-fest/source/promisable";
import { COLORS } from "../../common/style";

export const TEXT_INPUT_DEFAULT_STYLE: CSSProperties = {
	border: "2px solid white",
	color: "white",
	background: "rgba(255,255,255,0.1)",
	paddingLeft: "8px",
	paddingRight: "8px",
	paddingBottom: "1px"
}

export interface TextInputProps {
	// Must return the new value of the input field (ex: event.target.value)
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => Promisable<string>;
	onValueChange?: (value: string) => Promisable<void>;
	onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	style?: CSSProperties;
	initialValue?: string;
}

export function TextInput({
	onValueChange,
	onChange,
	onEnter,
	style: styleOverride,
	initialValue
}: TextInputProps) {

	const [value, setValue] = useState(initialValue || "");
	const [style, setStyle] = useState<CSSProperties>(Object.assign(TEXT_INPUT_DEFAULT_STYLE, styleOverride));

	useEffect(() => {
		setStyle(Object.assign(TEXT_INPUT_DEFAULT_STYLE, styleOverride));
	}, [styleOverride]);

	useEffect(() => {
		if(onValueChange)
			onValueChange(value);
	}, [value, onValueChange]);

	return <div style={style}>
		<input style={{
			border: "none",
			background: "transparent",
			color: COLORS.primary,
			width: "100%",
			height: "100%",
			padding: "0px",
			margin: "0px"
		}} value={value} onKeyDown={(event) => {
			if(onEnter)
				onEnter(event);
		}} onChange={async (event) => {
			if(onChange !== undefined) {
				setValue(await onChange(event));
			} else {
				setValue(event.target.value);
			}
		}} type="text" />
	</div>;
}