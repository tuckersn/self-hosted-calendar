import { Link } from "react-router-dom";
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
`;

export function HomePage() {
	return <Container>
		<InnerContainer>
			<h1>
				Welcome to Calendar!
			</h1>
			<hr/>
			<p>
				You are not logged in, otherwise you'd see your relevant information here.

				You should contact the site administrator to be added as a user
				on this site, <Link to="/login">if you have an account you can log in here.</Link>
			</p>
		</InnerContainer>
	</Container>;
}