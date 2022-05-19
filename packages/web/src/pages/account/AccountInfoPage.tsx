import { userTypeToString } from "@internal/schema/dist";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArticleLayout } from "../../components/layouts/ArticleLayout";
import { useUser } from "../../shared/hooks/useUser";

const Container = (styled.div`
	* {
		margin-bottom: 4px;
	}
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
			<div style={{
				display: "flex",
			}}>
				<div style={{
					flex: 1,
					textAlign: "left"
				}}>
					<h3>Username: {user?.username}</h3>
					<h3>Account Type: {userTypeToString(user!.userType)}</h3>
					<h3>User Id: {user?.userId}</h3>
				</div>
				<div style={{
					flex: 1,
					textAlign: "right"
				}}>
					<h3>Last Login: {(new Date()).toLocaleString()}</h3>
					<h3>Display Name: {user?.displayName}</h3>
					<h3>Email: {user?.email}</h3>
				</div>
			</div>

		</Container>
	</ArticleLayout>;
}