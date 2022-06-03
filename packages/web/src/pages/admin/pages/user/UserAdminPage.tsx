import { useState } from "react";
import styled from "styled-components";
import { Header } from "../../../../components/layouts/Header";
import { TabbedContainer } from "../../../../components/style/TabbedContainer";
import { adminPageCrumbs } from "../../AdminPage";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
`;

const HalfOfContainer = styled.div`
	flex: 1;
`;

export function UserAdminPage() {

	const [selectedTab, setSelectedTab] = useState("users");

	return <Container>
		<HalfOfContainer>
			<Header crumbs={adminPageCrumbs}>
				User Panel
			</Header>
			<h1>User Admin Page</h1>
			
			<TabbedContainer tabs={{
				"Details": {
					label: "Details",
					content: <div>
						<h2>Details</h2>
					</div>
				},
				"Settings": {
					label: "Settings",
					content: <div>
						<h2>Settings</h2>
					</div>
				}
			}}/>
		</HalfOfContainer>
		<HalfOfContainer>
			Table of users here
		</HalfOfContainer>
	</Container>;
}