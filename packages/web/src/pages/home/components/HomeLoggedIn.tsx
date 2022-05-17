import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../../common/style";
import { ArticleLayout } from "../../../components/layout/ArticleLayout";
import { useUser } from "../../../shared/hooks/useUser";

const Container = (styled.div`
	display: flex;
`);

const HalfOfContainer = (styled.div`
	flex: 50%;
`);

export function HomeLoggedIn() {

	const [_user] = useUser();
	// Assumes that the user is logged in
	const user = _user!;

	return <Container>
		<HalfOfContainer>
			<ArticleLayout title="Home">
				<h1>
					Welcome back {user.displayName}!
				</h1>
				<hr/>
				<p>
					Dashboard here!
				</p>
			</ArticleLayout>
		</HalfOfContainer>
		<HalfOfContainer>
			Today's events
			<br/>
			Today's todos
			<br/>
			Recent changes
		</HalfOfContainer>
	</Container>;
};