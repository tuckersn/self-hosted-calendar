import styled from "styled-components";

const Container = styled.div`
	height: 100%;
	width: 100%;

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
}

export function ArticleLayout({
	title,
	children
} : ArticleLayoutProps) {

	return <Container>
		<InnerContainer>
			<Header>
				<p style={{color: "grey"}}>BreadCrumbsHere/</p>
				<p>{title}</p>
			</Header>
			{children}
		</InnerContainer>
	</Container>;

}