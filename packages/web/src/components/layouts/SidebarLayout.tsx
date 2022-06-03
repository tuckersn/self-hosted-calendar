import React from "react";
import styled, { CSSProperties } from "styled-components";

const Container = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
`;


const SidebarContainer = styled.div`
	background-color: #1f1f1f;
	border-right: 1px solid #ccc;
	width: 200px;
`;
const ChildrenContainer = styled.div`
	padding: 32px;
	width: 100%;
	height: 100%;
`;


export interface SidebarLayoutProps {
	sidebarContent: React.ReactNode;
	children: React.ReactNode;
	style?: CSSProperties;
}

export function SidebarLayout({
	sidebarContent,
	children,
	style
} : SidebarLayoutProps) {

	return <Container style={style}>
		<SidebarContainer>
			{ sidebarContent }
		</SidebarContainer>
		<ChildrenContainer>
			{ children }
		</ChildrenContainer>
	</Container>;

}