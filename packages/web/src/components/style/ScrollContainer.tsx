import styled, { CSSProperties } from "styled-components";

export interface ScrollContainerProps {
	style?: CSSProperties;
	children?: React.ReactNode;
}

const OuterContainer = styled.div<ScrollContainerProps>`

`;

const InnerContainer = styled.div<ScrollContainerProps>`
	
`;

export function ScrollContainer(props: ScrollContainerProps) {

	const { children } = props;

	return <OuterContainer {...props}>
		<InnerContainer>
			{children}
		</InnerContainer>			
	</OuterContainer>
}