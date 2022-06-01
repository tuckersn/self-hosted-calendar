import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../../common/style";
import { ArticleLayout } from "../../../components/layouts/ArticleLayout";
import { useUser } from "../../../common/hooks/useUser";


const Container = (styled.div`
	
`);

export function HomeLoggedOut() {

	return <ArticleLayout pageTitle="Home">
		<Container>
			<h1>
				Welcome to Calendar!
			</h1>
			<hr/>
			<p>
				You are not logged in, otherwise you'd see your relevant information here.

				You should contact the site administrator to be added as a user
				on this site, <Link to="/login" style={{color: COLORS.highLight}}>if you have an account you can log in here.</Link>
			</p>
		</Container>
	</ArticleLayout>;
};