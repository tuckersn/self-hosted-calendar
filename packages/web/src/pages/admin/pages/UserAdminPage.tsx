import { useState } from "react";
import { Header } from "../../../components/layouts/Header";
import { adminPageCrumbs } from "../AdminPage";

export function UserAdminPage() {

	return <div>
		
		<Header crumbs={adminPageCrumbs}>
			User Panel
		</Header>
		<h1>User Admin Page</h1>
		<p>
			This is where you can reset users passwords and force create API keys and such.
		</p>
	</div>;
}