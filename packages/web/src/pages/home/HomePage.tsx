import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../common/style";
import { ArticleLayout } from "../../components/layout/ArticleLayout";
import { useUser } from "../../shared/hooks/useUser";



export function HomePage() {

	const [user] = useUser();

	return <ArticleLayout title="Home">
		<h1>
			Welcome {user === null ? "to Calendar!" : user.displayName}
		</h1>
		<h1>
			{JSON.stringify(user)}
		</h1>
		<hr/>
		<p>
			You are not logged in, otherwise you'd see your relevant information here.

			You should contact the site administrator to be added as a user
			on this site, <Link to="/login" style={{color: COLORS.highLight}}>if you have an account you can log in here.</Link>
		</p>
	</ArticleLayout>;
}