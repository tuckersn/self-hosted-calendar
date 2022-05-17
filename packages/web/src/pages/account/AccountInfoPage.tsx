import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArticleLayout } from "../../components/layouts/ArticleLayout";
import { useUser } from "../../shared/hooks/useUser";

const Container = (styled.div`
	
`);

export function AccountInfoPage() {

	const navigate = useNavigate();
	const [user] = useUser();

	useEffect(() => {
		if(user === null) {
			navigate("/error", {
				state: {
					errorCode: 403,
					errorMessage: "You need to be logged in to see this."
				}
			});
		}
	});
	

	return <ArticleLayout title="Account Info">
		<Container>
			<h1>Hello {user?.displayName}</h1>


		</Container>
	</ArticleLayout>;
}