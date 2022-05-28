import { InputLabelProps, TextField, TextFieldProps } from "@mui/material";
import React, { CSSProperties, useEffect, useState } from "react"
import { ValueOf } from "type-fest";
import { Promisable } from "type-fest/source/promisable";
import { COLORS } from "../../common/style";

export const TEXT_INPUT_DEFAULT_STYLE: CSSProperties = {
	// border: "2px solid white",
	// color: "white",
	// background: "rgba(255,255,255,0.1)",
	// paddingLeft: "8px",
	// paddingRight: "8px",
	// paddingBottom: "1px"
}

export interface TextInputProps {
	// Must return the new value of the input field (ex: event.target.value)
	onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => Promisable<void>;
	onValueChange?: (value: string) => Promisable<void>;
	onEnter?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
	style?: CSSProperties;
	value?: string;
	label?: string;
	type?: TextFieldProps['type'];
	shrink?: InputLabelProps['shrink'];
}

export function TextInput({
	onValueChange,
	onChange,
	onEnter,
	style: styleOverride,
	value: initialValue,
	label,
	type,
	shrink
}: TextInputProps) {

	const [value, setValue] = useState(initialValue || "");
	const [style, setStyle] = useState<CSSProperties>(Object.assign(TEXT_INPUT_DEFAULT_STYLE, styleOverride));

	useEffect(() => {
		setStyle(Object.assign(TEXT_INPUT_DEFAULT_STYLE, styleOverride));
	}, [styleOverride]);

	useEffect(() => {
		if(initialValue && initialValue !== value) {
			setValue(initialValue);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialValue, initialValue])

	return <div style={{
		paddingTop: "4px",
		paddingBottom: "2px"
	}}>
		<TextField
			type={type || 'text'}
			label={label}
			value={value}
			onKeyDown={(event) => {
				if(event.key === 'Enter' && onEnter)
					onEnter(event);
			}}
			onChange={(event) => {
				onChange && onChange(event);
			}}
			InputLabelProps={{
				shrink
			}}
		/>
	</div>
}