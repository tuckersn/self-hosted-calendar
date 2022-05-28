import React, { CSSProperties, useEffect } from "react";
import styled from "styled-components";


export interface FloatingContainerProps {
	x?: number,
	y?: number,
	offsetX?: number,
	offsetY?: number,
	children: React.ReactNode,
	style?: CSSProperties,
};

const OuterFloatingContainer = (styled.div<FloatingContainerProps>`
	${props => typeof props.x === 'number' ? "left: " + props.x + "px;" : ''}
	${props => typeof props.y === 'number' ? "top: " + props.y + "px;" : ''}
	position: fixed;
	height: 0;
`);

const InnerFloatingContainer = (styled.div<FloatingContainerProps>`
	${props => typeof props.offsetX === 'number' ? "left: " + props.offsetX + "px;" : ''}
	${props => typeof props.offsetY === 'number' ? "top: " + props.offsetY + "px;" : ''}
	position: relative;
	height: 0;
`);


export function FloatingContainer(props: FloatingContainerProps) {
	return <OuterFloatingContainer {...props} style={props.style}>
		<InnerFloatingContainer {...props}>
			{props.children}
		</InnerFloatingContainer>
	</OuterFloatingContainer>;
}