import styled, { CSSProperties } from "styled-components";

const Container = styled.div`
	display: flex;

	flex-direction: column;
	align-items: center;
`;

const InnerContainer = styled.div`
	width: 100%;
	max-width: 600px;
	padding-top: 32px;
`;

const Header = styled.div`
	display: flex;
	flex-direction: row;
	flex: 0;
	margin: 0;
	padding: 0;
	height: min-content;
`;

export interface ArticleLayoutProps {
	title: string;
	children: React.ReactNode;
	style?: CSSProperties;
	innerStyle?: CSSProperties;
	headerStyle?: CSSProperties;
}

export function ArticleLayout({
	title,
	children,
	style,
	innerStyle,
	headerStyle
} : ArticleLayoutProps) {

	return <Container style={style}>
		<InnerContainer style={innerStyle}>
			<Header style={headerStyle}>
				<p style={{color: "grey"}}>BreadCrumbsHere/</p>
				<p>{title}</p>
			</Header>
			{children}
		</InnerContainer>
	</Container>;

}