import styled, { CSSProperties } from "styled-components";
import { NAV_BAR_HEIGHT } from "../../common/style";
import { Header, HeaderProps } from "./Header";

interface ContainerProps {
	fill?: boolean;
}

const Container = styled.div<ContainerProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	${props => props.fill ? "height: calc(100% - " + (NAV_BAR_HEIGHT/2) +  "px);" : ""}
`;

const InnerContainer = styled.div<ContainerProps>`
	${props => props.fill ? "height: 100%;" : ""}
	width: 100%;
	max-width: 600px;
	padding-top: 32px;
`;



export interface ArticleLayoutProps {
	pageTitle: string;
	children: React.ReactNode;
	style?: CSSProperties;
	innerStyle?: CSSProperties;
	headerStyle?: CSSProperties;
	fill?: boolean;
	crumbs?: HeaderProps["crumbs"];
}

export function ArticleLayout({
	pageTitle,
	children,
	style,
	innerStyle,
	headerStyle,
	crumbs,
	fill
} : ArticleLayoutProps) {

	return <Container fill={fill} style={style}>
		<InnerContainer fill={fill} style={innerStyle}>
			<Header crumbs={crumbs || []}>
				{pageTitle}
			</Header>
			{children}
		</InnerContainer>
	</Container>

}