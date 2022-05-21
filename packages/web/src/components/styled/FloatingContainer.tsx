import React, { CSSProperties, useEffect } from "react";
import styled from "styled-components";


export const FloatingContainer = (styled.div<{
	x?: number,
	y?: number
}>`
	top: ${props => props.y || 0}px;
	left: ${props => props.x || 0}px;
	position: absolute;
`);