import React, { CSSProperties, useEffect, useState } from "react"
import styled from "styled-components";
import { Promisable } from "type-fest";
import { COLORS, STYLE_VALUES } from "../../common/style";
import { Button, ButtonProps } from "./Button";

export interface ButtonToggleProps extends ButtonProps {
	children: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promisable<void>;
	style?: CSSProperties;
	small?: boolean;

	active?: boolean;
	setActive?: (active: boolean) => void;
}



export const ButtonToggle: React.FC<ButtonToggleProps> = (props) => {
	const {
		children,
		onClick,
		style
	} = props;

	const [active, setActive] = useState(props.active || false);

	useEffect(() => {
		if(props.setActive !== undefined)
			props.setActive(active);
	}, [active, setActive, props]);

	useEffect(() => {
		if(props.active !== undefined && props.active !== active) {
			setActive(props.active!);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.active])

	return <Button active={active} {...props} onClick={(event) => {
			if(onClick)
				onClick(event);
			setActive(!active);
	}} style={style}>
		{children}
	</Button>;
}