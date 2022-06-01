import styled, { CSSProperties } from "styled-components";

export interface HeaderProps {
	children?: React.ReactNode;
	style?: CSSProperties;
}

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex: 0;
	margin: 0;
	padding: 0;
	height: min-content;
`;


export function Header({ children, style } : HeaderProps) {
	return <HeaderContainer style={style}>
		<p style={{color: "grey"}}>BreadCrumbsHere/</p>
		{children}
	</HeaderContainer>;
}