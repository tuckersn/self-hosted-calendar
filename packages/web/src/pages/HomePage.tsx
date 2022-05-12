import styled from "styled-components";

const Container = styled.div`
	padding: 32px;
`;

export function HomePage() {
	return <Container>
		<h1>
			Homepage
		</h1>
		<hr/>
		<p>
			Welcome to the calendar app.
		</p>
	</Container>;
}