import React, { CSSProperties, useEffect } from "react";
import styled from "styled-components";


export interface FloatingContainerProps {
	x?: number,
	y?: number,
	offsetX?: number,
	offsetY?: number,
	children: React.ReactNode
};

const OuterFloatingContainer = (styled.div<FloatingContainerProps>`
	${props => props.x ? "left: " + props.x + "px;" : ''}
	${props => props.y ? "top: " + props.y + "px;" : ''}
	position: absolute;
`);

const InnerFloatingContainer = (styled.div<FloatingContainerProps>`
	${props => props.offsetX ? "left: " + props.offsetX + "px;" : ''}
	${props => props.offsetY ? "top: " + props.offsetY + "px;" : ''}
	position: relative;
`);


export function FloatingContainer(props: FloatingContainerProps) {
	return <OuterFloatingContainer {...props}>
		<InnerFloatingContainer {...props}>
			{props.children}
		</InnerFloatingContainer>
	</OuterFloatingContainer>;
}