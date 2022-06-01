import styled, { CSSProperties } from "styled-components";
import { NAV_BAR_HEIGHT } from "../../common/style";
import { Header } from "./Header";

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
}

export function ArticleLayout({
	pageTitle,
	children,
	style,
	innerStyle,
	headerStyle,
	fill
} : ArticleLayoutProps) {

	return <Container fill={fill} style={style}>
		<InnerContainer fill={fill} style={innerStyle}>
			<Header>
				{pageTitle}
			</Header>
			{children}
		</InnerContainer>
	</Container>;

}