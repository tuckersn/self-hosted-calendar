import { userTypeToString } from "@internal/schema/dist";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { ArticleLayout } from "../../components/layouts/ArticleLayout";
import { useUser } from "../../common/hooks/useUser";
import { useDebugMode } from "../../common/hooks";
import { Button } from "../../components/inputs/Button";
import { TabbedContainer } from "../../components/style/TabbedContainer";

const Container = (styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
`);

const DetailsContainer = (styled.div`
	display: flex;
	flex: 1;
	padding-top: 8px;
	padding-left: 16px;
	padding-right: 16px;

	* {
		margin-bottom: 4px;
	}
`);

export function AccountInfoPage() {

	const navigate = useNavigate();
	const [user] = useUser();
	const [debugMode, setDebugMode] = useDebugMode();

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
	


	return <ArticleLayout fill pageTitle="Account Info">
		<Container>
			<h1>Hello {user?.displayName}</h1>

			<TabbedContainer containerStyle={css`
				flex: 1;
			`} tabs={{
				"Details": {
					label: "Details",
					content: <DetailsContainer>
						<div style={{
							flex: 1,
							textAlign: "left",
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
							(replace this all with a table eventually)
						</div>
					</DetailsContainer>
		
				},
				"Settings": {
					label: "Settings",
					content: <div>
						<h2>Settings</h2>
					</div>
				}
			}}/>
			
			<div style={{
				flex: 0,
				display: "flex"
			}}>
				<div style={{
					flex: 1,
					display: "flex",
				}}>	
					<Button style={{
						width: "100%",
						margin: "8px"
					}} onClick={() => {
						setDebugMode(!debugMode);
					}}>
						Debug Mode: {debugMode ? "On" : "Off"}
					</Button>
				</div>
				<div style={{
					flex: 1,
					display: "flex",
				}}>
					B
				</div>
			</div>

		</Container>
	</ArticleLayout>;
}