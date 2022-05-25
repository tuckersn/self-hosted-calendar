import styled, { CSSProperties } from "styled-components";

export interface ScrollContainerProps {
	style?: CSSProperties;
	children?: React.ReactNode;
}

const OuterContainer = styled.div<ScrollContainerProps>`
	overflow-y: scroll;
`;

const InnerContainer = styled.div<ScrollContainerProps>`
	position: absolute;
`;

export function ScrollContainer(props: ScrollContainerProps) {

	const { children } = props;

	return <OuterContainer {...props}>
		<InnerContainer>
			{children}
		</InnerContainer>			
	</OuterContainer>
}